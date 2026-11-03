// src/components/three/network.ts
// Deterministic network layout shared by the WebGL scene and the static SVG fallback.
// Seeded RNG = same picture every visit, and identical server/client SVG (no hydration mismatch).

export interface NetworkNode {
  x: number;
  y: number;
  z: number;
  /** Highlighted node (brand red) */
  hot: boolean;
  phase: number;
  scale: number;
}

export interface NetworkLink {
  a: number;
  b: number;
  phase: number;
  hot: boolean;
}

export interface Network {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export const NETWORK_COLORS = {
  blue: '#007BFF',
  blueSoft: '#4DA3FF',
  red: '#C70039',
  redSoft: '#FF4D7D',
} as const;

const BOUNDS = { x: 11, y: 5, zMin: -3, zMax: 1.5 };
const MAX_LINKS_PER_NODE = 3;
const MAX_LINK_DISTANCE = 3.6;
const HOT_SHARE = 0.16;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createNetwork(count: number, seed = 2020): Network {
  const rand = mulberry32(seed);

  const nodes: NetworkNode[] = Array.from({ length: count }, () => {
    const hot = rand() < HOT_SHARE;
    return {
      hot,
      x: (rand() * 2 - 1) * BOUNDS.x,
      y: (rand() * 2 - 1) * BOUNDS.y,
      z: BOUNDS.zMin + rand() * (BOUNDS.zMax - BOUNDS.zMin),
      phase: rand() * Math.PI * 2,
      scale: hot ? 1.25 + rand() * 0.4 : 0.7 + rand() * 0.6,
    };
  });

  const seen = new Set<string>();
  const links: NetworkLink[] = [];

  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z) }))
      .filter(({ j, d }) => j !== i && d <= MAX_LINK_DISTANCE)
      .sort((p, q) => p.d - q.d)
      .slice(0, MAX_LINKS_PER_NODE);

    for (const { j } of nearest) {
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ a, b, phase: rand(), hot: (nodes[a].hot || nodes[b].hot) && rand() < 0.7 });
    }
  });

  return { nodes, links };
}

/** "#007BFF" → [0, 0.482, 1] as raw sRGB components (no colour-management conversion) */
export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}