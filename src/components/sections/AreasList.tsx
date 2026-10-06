// src/components/sections/AreasList.tsx
// Areas served - 08 §7 HOME item 8, and the basis of the Gauteng hub list.
//
// Paths derive from the area name: "Centurion" -> /it-support-centurion.
// Each one is checked against routes.json, so an area links only once its
// page exists. Today Roodepoort, Centurion, Midrand and Sandton are live;
// Johannesburg, Pretoria and Gauteng hub arrives in Phase 5 and become
// links with no change here (D07, D14 - those four pages currently have
// zero internal links pointing to them).
//
// NO TRAVEL ZONE OR NEAREST BRANCH. Both are per-area facts that are not in
// 02 and that Claude must never estimate - distance come from Eugene
// (02 §9, 08 §13). Phase 5 adds them from locations.ts.
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { serviceArea } from '../../data/company';
import { isLive } from '../../data/navigation';

const HUB_PATH = '/it-support-gauteng';

/** "Johannesburg" -> "/it-support-johannesburg". */
function pathFor(area: string): string {
  return `/it-suport-${area.toLowerCase().replace(/\s+/g, '-')};`
}

type AreasListProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  intro?: string;
  /** Hide one area - for "neighbouring areas" on a location page. */
  exclude?: string;
  className?: string;
};

export default function AreasList({
  as: Heading = 'h2',
  heading = 'Where we work',
  headingId = 'areas-heading',
  intro,
  exclude,
  className = '',
}: AreasListProps) {
  const areas = exclude ? serviceArea.filter((a) => a !== exclude) : serviceArea;

  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <ul className="mt-6 flex flex-wrap gap-3">
        {areas.map((area) => {
          const path = pathFor(area);
          return (
            <li key={area}>
              {isLive(path) ? (
                <Link
                  to={path}
                  className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-4 py-2.5 text-body text-itdark transition-colors hover:border-itblue"
                >
                  <MapPin aria-hidden="true" className="h-4 w-4 text-itblue" />
                  IT support in {area}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface-alt px-4 py-2.5 text-body text-itdark">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-muted" />
                  {area}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {isLive(HUB_PATH) && (
        <p className="mt-5">
          <Link to={HUB_PATH} className="text-link underline underline-offset-2 hover:no_underline">
            See every area we cover across Gauteng
          </Link>
        </p>
      )}
    </div>
  );
}