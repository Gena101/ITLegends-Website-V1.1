// src/components/three/NetworkFallback.tsx
// Static SVG version of the network: in the prerendered HTML, shown instantly,
// and the permanent hero on mobile / low-power / reduced-motion devices.
import { cn } from '../ui';
import { NETWORK_COLORS, createNetwork } from './network';

const CAMERA_DISTANCE = 10;
const fmt = (n: number) => n.toFixed(2);

const network = createNetwork(56);

// Simple perspective so nearer nodes spread out, like the 3D scene
const nodes = network.nodes.map((node, i) => {
  const s = CAMERA_DISTANCE / (CAMERA_DISTANCE - node.z);
  return { ...node, i, px: fmt(node.x * s), py: fmt(-node.y * s) };
});

interface NetworkFallbackProps {
  className?: string;
}

export function NetworkFallback({ className }: NetworkFallbackProps) {
  return (
    <svg
      viewBox="-8 -4.5 16 9"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn('absolute inset-0 h-full w-full', className)}
    >
      <defs>
        <radialGradient id="hero-glow-blue">
          <stop offset="0" stopColor={NETWORK_COLORS.blueSoft} stopOpacity="0.55" />
          <stop offset="1" stopColor={NETWORK_COLORS.blue} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-red">
          <stop offset="0" stopColor={NETWORK_COLORS.redSoft} stopOpacity="0.6" />
          <stop offset="1" stopColor={NETWORK_COLORS.red} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke={NETWORK_COLORS.blueSoft} strokeOpacity="0.16" strokeWidth="1">
        {network.links.map((link) => {
          const a = nodes[link.a];
          const b = nodes[link.b];
          return (
            <line
              key={`${link.a}-${link.b}`}
              x1={a.px}
              y1={a.py}
              x2={b.px}
              y2={b.py}
              vectorEffect="non-scaling-stroke"
              stroke={link.hot ? NETWORK_COLORS.redSoft : undefined}
              strokeOpacity={link.hot ? 0.3 : undefined}
            />
          );
        })}
      </g>

      {/* Deliberately static: this layer is for mobile / low-power / reduced-motion devices,
          and animated SVG repaints on the main thread (battery + Lighthouse Speed Index). */}
      {nodes.map((node) => (
        <g key={node.i}>
          <circle
            cx={node.px}
            cy={node.py}
            r={fmt(0.3 * node.scale)}
            fill={`url(#hero-glow-${node.hot ? 'red' : 'blue'})`}
          />
          <circle
            cx={node.px}
            cy={node.py}
            r={fmt(0.045 * node.scale)}
            fill={node.hot ? NETWORK_COLORS.redSoft : NETWORK_COLORS.blueSoft}
          />
        </g>
      ))}
    </svg>
  );
}