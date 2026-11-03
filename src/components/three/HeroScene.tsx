// src/components/three/HeroScene.tsx
// WebGL particle network (three + R3F). Loaded ONLY through React.lazy in HeroBackdrop:
// never import this file statically, or three.js lands in the main bundle.
// Client-only: rendered after mount, so window access during render is safe.
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NETWORK_COLORS, createNetwork, hexToRgb, type Network } from './network';

const NODE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aScale;
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + aPhase);
    float near = (1.0 - smoothstep(0.0, 2.8, distance(world.xy, uPointer))) * uPointerStrength;

    vColor = aColor;
    vGlow = 0.55 + 0.35 * pulse + 0.9 * near;
    gl_PointSize = uSize * aScale * (0.85 + 0.25 * pulse + 0.6 * near) * uPixelRatio * (10.0 / -mv.z);
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.06, 0.14, d);
    float halo = (1.0 - smoothstep(0.0, 0.5, d)) * 0.35;
    float alpha = (core + halo) * vGlow;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.35), alpha);
  }
`;

const LINK_VERTEX = /* glsl */ `
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  attribute float aT;
  attribute float aPhase;
  attribute float aHot;
  varying float vT;
  varying float vPhase;
  varying float vHot;
  varying float vFade;
  varying float vNear;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    vT = aT;
    vPhase = aPhase;
    vHot = aHot;
    vFade = 1.0 - 0.55 * clamp((-mv.z - 8.5) / 4.5, 0.0, 1.0);
    vNear = (1.0 - smoothstep(0.0, 3.2, distance(world.xy, uPointer))) * uPointerStrength;
  }
`;

const LINK_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uPacket;
  uniform vec3 uHot;
  varying float vT;
  varying float vPhase;
  varying float vHot;
  varying float vFade;
  varying float vNear;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    // A packet travels each link every ~6s; roughly 45% of links carry one per cycle
    float progress = uTime * 0.16 + vPhase;
    float head = fract(progress);
    float gate = step(0.55, hash(floor(progress) + vPhase * 97.0));
    float packet = exp(-pow((vT - head) * 10.0, 2.0)) * gate;

    vec3 color = mix(uBase, mix(uPacket, uHot, vHot), packet);
    float alpha = (0.09 + 0.18 * vNear + 0.8 * packet) * vFade;
    gl_FragColor = vec4(color, alpha);
  }
`;

function buildGeometries({ nodes, links }: Network) {
  const blue = hexToRgb(NETWORK_COLORS.blueSoft);
  const red = hexToRgb(NETWORK_COLORS.redSoft);

  const positions = new Float32Array(nodes.length * 3);
  const colors = new Float32Array(nodes.length * 3);
  const phases = new Float32Array(nodes.length);
  const scales = new Float32Array(nodes.length);

  nodes.forEach((n, i) => {
    positions.set([n.x, n.y, n.z], i * 3);
    colors.set(n.hot ? red : blue, i * 3);
    phases[i] = n.phase;
    scales[i] = n.scale;
  });

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  nodeGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  nodeGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  nodeGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

  const linkPositions = new Float32Array(links.length * 6);
  const linkT = new Float32Array(links.length * 2);
  const linkPhases = new Float32Array(links.length * 2);
  const linkHot = new Float32Array(links.length * 2);

  links.forEach((l, i) => {
    const a = nodes[l.a];
    const b = nodes[l.b];
    linkPositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    linkT.set([0, 1], i * 2);
    linkPhases.set([l.phase, l.phase], i * 2);
    linkHot.set(l.hot ? [1, 1] : [0, 0], i * 2);
  });

  const linkGeometry = new THREE.BufferGeometry();
  linkGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
  linkGeometry.setAttribute('aT', new THREE.BufferAttribute(linkT, 1));
  linkGeometry.setAttribute('aPhase', new THREE.BufferAttribute(linkPhases, 1));
  linkGeometry.setAttribute('aHot', new THREE.BufferAttribute(linkHot, 1));

  return { nodeGeometry, linkGeometry };
}

function createMaterials() {
  // Shared uniform objects: updating one updates both materials
  const shared = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uPointerStrength: { value: 0 },
  };

  const common = {
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  };

  const nodeMaterial = new THREE.ShaderMaterial({
    ...common,
    vertexShader: NODE_VERTEX,
    fragmentShader: NODE_FRAGMENT,
    uniforms: { ...shared, uSize: { value: 16 }, uPixelRatio: { value: 1 } },
  });

  const linkMaterial = new THREE.ShaderMaterial({
    ...common,
    vertexShader: LINK_VERTEX,
    fragmentShader: LINK_FRAGMENT,
    uniforms: {
      ...shared,
      uBase: { value: new THREE.Vector3(...hexToRgb(NETWORK_COLORS.blue)) },
      uPacket: { value: new THREE.Vector3(...hexToRgb(NETWORK_COLORS.blueSoft)) },
      uHot: { value: new THREE.Vector3(...hexToRgb(NETWORK_COLORS.redSoft)) },
    },
  });

  return { shared, nodeMaterial, linkMaterial };
}

function NetworkGraph({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ clientX: 0, clientY: 0, moved: false });

  const { nodeGeometry, linkGeometry } = useMemo(() => buildGeometries(createNetwork(count)), [count]);
  const { shared, nodeMaterial, linkMaterial } = useMemo(createMaterials, []);
  const pointerTarget = useMemo(() => new THREE.Vector2(), []);

  useEffect(
    () => () => {
      nodeGeometry.dispose();
      linkGeometry.dispose();
    },
    [nodeGeometry, linkGeometry],
  );

  useEffect(
    () => () => {
      nodeMaterial.dispose();
      linkMaterial.dispose();
    },
    [nodeMaterial, linkMaterial],
  );

  // Track the mouse on the window: hero text sits above the canvas
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current.clientX = e.clientX;
      pointer.current.clientY = e.clientY;
      pointer.current.moved = true;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const rect = state.gl.domElement.getBoundingClientRect();
    const nx = rect.width ? ((p.clientX - rect.left) / rect.width) * 2 - 1 : 0;
    const ny = rect.height ? ((p.clientY - rect.top) / rect.height) * 2 - 1 : 0;

    shared.uTime.value = t;
    nodeMaterial.uniforms.uPixelRatio.value = state.viewport.dpr;

    pointerTarget.set((nx * state.viewport.width) / 2, (-ny * state.viewport.height) / 2);
    shared.uPointer.value.lerp(pointerTarget, 1 - Math.exp(-6 * delta));
    shared.uPointerStrength.value = THREE.MathUtils.damp(shared.uPointerStrength.value, p.moved ? 1 : 0, 3, delta);

    const g = group.current;
    if (g) {
      const tiltX = p.moved ? ny : 0;
      const tiltY = p.moved ? nx : 0;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tiltY * 0.12 + Math.sin(t * 0.05) * 0.08, 2, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tiltX * 0.08, 2, delta);
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={linkGeometry} material={linkMaterial} />
      <points geometry={nodeGeometry} material={nodeMaterial} />
    </group>
  );
}

interface HeroSceneProps {
  /** false = hero off-screen: stop rendering entirely */
  active: boolean;
  onReady: () => void;
}

export default function HeroScene({ active, onReady }: HeroSceneProps) {
  const count = useMemo(() => (window.innerWidth >= 1280 ? 90 : 64), []);

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power', stencil: false, depth: false }}
      onCreated={onReady}
      style={{ pointerEvents: 'none' }}
    >
      <NetworkGraph count={count} />
    </Canvas>
  );
}