// src/components/art/CablingArt.tsx
// Decorative hero art for Structured Cabling: a patch panel cabled to four endpoints.
// Cables are drawn once on load with CSS (stroke-dashoffset, see .cable-draw in index.css): no JS.
// Rendered inside the hero's `hidden lg:flex` column, so phones never paint or animate it.

const PORTS = [60, 100, 140, 180];
const ENDS = [50, 100, 150, 200];
/** Seconds between cables */
const STAGGER = 0.2;
const START = 0.2;
/** Endpoint lights up as its cable arrives (just before the 2.4s draw ends) */
const NODE_OFFSET = 2.2;

export function CablingArt() {
  return (
    <div className="glass relative h-64 w-64 rounded-panel p-3">
      <svg viewBox="0 0 240 240" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="cabling-art-gradient" gradientUnits="userSpaceOnUse" x1="68" y1="0" x2="192" y2="0">
            <stop offset="0" stopColor="currentColor" className="text-itblue-soft" />
            <stop offset="1" stopColor="currentColor" className="text-itred-soft" />
          </linearGradient>
        </defs>

        {/* Patch panel */}
        <rect x="24" y="36" width="60" height="168" rx="10" className="fill-ink-900 stroke-white/15" />
        {PORTS.map((y) => (
          <rect key={y} x="40" y={y - 6} width="28" height="12" rx="3" className="fill-ink-950 stroke-white/20" />
        ))}

        {/* Cables: pathLength=1 lets one dash value fit every curve */}
        {PORTS.map((y, i) => (
          <path
            key={y}
            d={`M68 ${y} C 132 ${y}, 132 ${ENDS[i]}, 192 ${ENDS[i]}`}
            pathLength={1}
            stroke="url(#cabling-art-gradient)"
            strokeWidth={3}
            strokeLinecap="round"
            className="cable-draw"
            style={{ animationDelay: `${START + i * STAGGER}s` }}
          />
        ))}

        {/* Endpoints (desks, access points, devices) */}
        {ENDS.map((y, i) => (
          <g key={y}>
            <rect x="192" y={y - 10} width="26" height="20" rx="5" className="fill-ink-800 stroke-white/25" />
            <circle
              cx="205"
              cy={y}
              r="2.5"
              className="cable-node fill-itblue-soft"
              style={{ animationDelay: `${START + i * STAGGER + NODE_OFFSET}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}