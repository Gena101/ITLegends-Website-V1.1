// src/components/art/ServiceArt.tsx
// Decorative hero art for every service page: one shared style, drawn once on load with CSS.
//   s = static scaffold, f = scaffold that fades in, l = gradient line drawn in, n = node that lights up
// Animation: .art-draw / .art-fade / .art-node in index.css (no JS, starts before hydration).
// Rendered inside the hero's `hidden lg:flex` column, so phones never paint or animate it.
import type { ServiceSlug } from '../../data/services';
import { cn } from '../ui';

type ArtElement =
  | { t: 's'; d: string }
  | { t: 'f'; d: string; at: number }
  | { t: 'l'; d: string; at: number; dur: number; w: number }
  | { t: 'n'; cx: number; cy: number; r: number; at: number };

// ---------- Element builders (at/dur in seconds) ----------
const s = (d: string): ArtElement => ({ t: 's', d });
const f = (d: string, at: number): ArtElement => ({ t: 'f', d, at });
const l = (d: string, at: number, dur = 2.4, w = 3): ArtElement => ({ t: 'l', d, at, dur, w });
const n = (cx: number, cy: number, at: number, r = 3): ArtElement => ({ t: 'n', cx, cy, r, at });

// ---------- Path helpers (240 × 240 canvas) ----------
const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
  `H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}A${r} ${r} 0 1 1 ${cx + r} ${cy}A${r} ${r} 0 1 1 ${cx - r} ${cy}Z`;
const round = (v: number) => Math.round(v * 10) / 10;
const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => [
  round(cx + r * Math.cos((deg * Math.PI) / 180)),
  round(cy + r * Math.sin((deg * Math.PI) / 180)),
];
const arc = (cx: number, cy: number, r: number, side: 'l' | 'r') => {
  const [x1, y1] = polar(cx, cy, r, side === 'r' ? -40 : 220);
  const [x2, y2] = polar(cx, cy, r, side === 'r' ? 40 : 140);
  return `M${x1} ${y1}A${r} ${r} 0 0 ${side === 'r' ? 1 : 0} ${x2} ${y2}`;
};

// ---------- Scenes ----------

/** Managed IT: a monitored hub linked to every device */
const managed: ArtElement[] = [
  s(rr(90, 90, 60, 60, 14)),
  l('M100 120h10l6-12 9 24 6-12h9', 0.2, 1.6),
  ...[-90, -30, 30, 90, 150, 210].flatMap((deg, i) => {
    const [x, y] = polar(120, 120, 86, deg);
    const [ax, ay] = polar(120, 120, 38, deg);
    const [bx, by] = polar(120, 120, 72, deg);
    return [s(rr(x - 14, y - 11, 28, 22, 6)), l(`M${ax} ${ay}L${bx} ${by}`, 0.8 + i * 0.15, 1), n(x, y, 1.7 + i * 0.15)];
  }),
];

/** Helpdesk: a request, a reply, resolved */
const helpdesk: ArtElement[] = [
  f(rr(24, 36, 124, 44, 14) + 'M44 80l-6 14 18-14', 0.2),
  l('M42 52H124', 0.5, 0.9),
  l('M42 64H100', 0.7, 0.9),
  f(rr(92, 104, 124, 44, 14) + 'M196 148l6 14-18-14', 1.5),
  l('M110 120H198', 1.8, 0.9),
  l('M110 132H170', 2.0, 0.9),
  l(circle(64, 184, 22), 2.6, 1.2),
  l('M54 184l7 7 13-14', 3.3, 0.6),
];

/** Cybersecurity: a shield, with attacks stopped at its edge */
const shield = 'M120 32L184 58V112C184 154 158 190 120 208C82 190 56 154 56 112V58Z';
const cybersecurity: ArtElement[] = [
  s(shield),
  l(shield, 0.2),
  l('M14 70L52 90', 1.0, 0.8),
  l('M226 96L188 108', 1.3, 0.8),
  l('M20 170L66 150', 1.6, 0.8),
  n(120, 112, 2.4, 9),
  l('M120 122V146', 2.6, 0.6, 5),
];

/** Cloud & backup: devices sending copies up to the cloud */
const cloudPath = 'M76 108H164A24 24 0 0 0 166 60.1A34 34 0 0 0 100 56A26 26 0 0 0 76 108Z';
const cloudBackup: ArtElement[] = [
  s(cloudPath),
  l(cloudPath, 0.2, 2.2),
  s(rr(28, 172, 52, 34, 6) + 'M20 212H88'),
  s(rr(96, 164, 48, 46, 6) + 'M106 180H134M106 194H134'),
  s(rr(164, 164, 40, 46, 8)),
  l('M54 170C54 140 92 136 104 110', 1.2, 1.2),
  l('M120 162V112', 1.4, 1.2),
  l('M184 162C184 140 150 132 140 110', 1.6, 1.2),
  n(120, 84, 2.8, 5),
];

/** Servers: a rack coming online, unit by unit, with a heartbeat */
const serverMaintenance: ArtElement[] = [
  s(rr(60, 20, 120, 180, 14)),
  ...[34, 86, 138].flatMap((y, i) => [
    s(rr(74, y, 92, 44, 8)),
    n(92, y + 22, 0.3 + i * 0.4, 4),
    l(`M108 ${y + 16}H150`, 0.5 + i * 0.4, 1),
    l(`M108 ${y + 28}H134`, 0.7 + i * 0.4, 1),
  ]),
  l('M24 220H70l8-12 10 22 8-10H216', 1.8, 1.6, 2),
];

/** Hardware & network: a switch wired to the office's devices */
const hardwareNetwork: ArtElement[] = [
  s(rr(56, 28, 128, 40, 10)),
  s(rr(28, 168, 60, 38, 6) + 'M20 212H96'),
  s(rr(92, 156, 56, 42, 6) + 'M120 198V210M108 210H132'),
  s(rr(156, 166, 56, 40, 8) + 'M168 166V154H200V166'),
  l('M80 68C80 118 58 118 58 166', 0.4, 1.4),
  l('M120 68V154', 0.6, 1.4),
  l('M160 68C160 118 184 118 184 164', 0.8, 1.4),
  n(80, 48, 0.2),
  n(120, 48, 0.35),
  n(160, 48, 0.5),
  n(58, 187, 1.8),
  n(120, 177, 2.0),
  n(184, 186, 2.2),
];

/** Structured cabling: a patch panel cabled in a tidy fan to four endpoints */
const ports = [60, 100, 140, 180];
const ends = [50, 100, 150, 200];
const structuredCabling: ArtElement[] = [
  s(rr(24, 36, 60, 168, 10)),
  ...ports.map((y) => s(rr(40, y - 6, 28, 12, 3))),
  ...ports.map((y, i) => l(`M68 ${y}C132 ${y} 132 ${ends[i]} 192 ${ends[i]}`, 0.2 + i * 0.2)),
  ...ends.flatMap((y, i) => [s(rr(192, y - 10, 26, 20, 5)), n(205, y, 2.4 + i * 0.2, 2.5)]),
];

/** Connectivity: a mast transmitting to the office, fibre underneath */
const businessConnectivity: ArtElement[] = [
  s('M76 100L60 204M76 100L92 204M64 176H88M68 150H84'),
  l('M16 214H224', 0.2, 2, 2),
  ...[18, 32, 46].flatMap((r, i) => [l(arc(76, 96, r, 'l'), 0.5 + i * 0.35, 0.8), l(arc(76, 96, r, 'r'), 0.5 + i * 0.35, 0.8)]),
  n(76, 96, 0.3, 5),
  s(rr(150, 110, 66, 96, 8) + 'M164 128H176M190 128H202M164 148H176M190 148H202M164 168H176M190 168H202'),
  l('M128 96C150 90 172 92 183 108', 1.8, 1),
  n(183, 190, 2.7, 4),
];

/** Website: a page laying itself out */
const browser = [s(rr(24, 36, 192, 168, 12) + 'M24 64H216'), n(40, 50, 0.2), n(52, 50, 0.3), n(64, 50, 0.4)];
const websiteDesign: ArtElement[] = [
  ...browser,
  l('M44 82H196', 0.5, 1),
  f(rr(44, 98, 84, 46, 8), 1.0),
  l('M142 106H196', 1.2, 0.8),
  l('M142 120H184', 1.35, 0.8),
  l('M142 134H172', 1.5, 0.8),
  f(rr(44, 158, 44, 32, 6), 2.0),
  f(rr(98, 158, 44, 32, 6), 2.2),
  f(rr(152, 158, 44, 32, 6), 2.4),
];

/** Custom software: code being written, line by line */
const codeLines: [number, number][] = [[44, 120], [60, 150], [76, 110], [76, 168], [60, 128], [44, 96], [44, 140]];
const customSoftware: ArtElement[] = [
  ...browser,
  ...codeLines.map(([x, len], i) => l(`M${x} ${82 + i * 17}H${x + len - 44}`, 0.5 + i * 0.3, 0.7)),
  n(148, 184, 2.8),
];

/** Record: a new service without art fails the typecheck */
const scenes: Record<ServiceSlug, ArtElement[]> = {
  'managed-it-support': managed,
  helpdesk,
  cybersecurity,
  'cloud-backup': cloudBackup,
  'server-maintenance': serverMaintenance,
  'hardware-network': hardwareNetwork,
  'structured-cabling': structuredCabling,
  'business-connectivity': businessConnectivity,
  'website-design': websiteDesign,
  'custom-software': customSoftware,
};

interface ServiceArtProps {
  slug: ServiceSlug;
  /** Digital pillar: red accents */
  digital?: boolean;
}

export function ServiceArt({ slug, digital = false }: ServiceArtProps) {
  const nodeFill = digital ? 'fill-itred-soft' : 'fill-itblue-soft';

  return (
    <div className="glass relative h-64 w-64 rounded-panel p-3">
      <div
        className={cn(
          'absolute inset-0 rounded-panel bg-gradient-to-br to-transparent',
          digital ? 'from-itred/15' : 'from-itblue/15',
        )}
      />
      <svg viewBox="0 0 240 240" fill="none" className="relative h-full w-full">
        <defs>
          <linearGradient id="service-art-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="240" y2="0">
            <stop offset="0" stopColor="currentColor" className="text-itblue-soft" />
            <stop offset="1" stopColor="currentColor" className="text-itred-soft" />
          </linearGradient>
        </defs>
        {scenes[slug].map((el, i) => {
          switch (el.t) {
            case 's':
              return <path key={i} d={el.d} strokeWidth={1.5} className="fill-ink-900 stroke-white/20" />;
            case 'f':
              return (
                <path
                  key={i}
                  d={el.d}
                  strokeWidth={1.5}
                  className="art-fade fill-ink-800 stroke-white/30"
                  style={{ animationDelay: `${el.at}s` }}
                />
              );
            case 'l':
              return (
                <path
                  key={i}
                  d={el.d}
                  pathLength={1}
                  stroke="url(#service-art-gradient)"
                  strokeWidth={el.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="art-draw"
                  style={{ animationDelay: `${el.at}s`, animationDuration: `${el.dur}s` }}
                />
              );
            case 'n':
              return (
                <circle
                  key={i}
                  cx={el.cx}
                  cy={el.cy}
                  r={el.r}
                  className={cn('art-node', nodeFill)}
                  style={{ animationDelay: `${el.at}s` }}
                />
              );
          }
        })}
      </svg>
    </div>
  );
}