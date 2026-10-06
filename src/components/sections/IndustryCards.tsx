// src/components/sections/IndustryCards.tsx
// The five client verticals - 08 §7 HOME item 6, and the Phase 5 industry
// pages.
//
// A card becomes a LINK only once that industry has a path in industries.ts.
// Until Phase 5 builds those pages every path is null, so these render as
// plain cards: no dead links, and no commitment to the automotive slug while
// it is still being decided (08 §4).
//
// Rendered as a <ul> either way - a model extracting "who does IT Legends
// // work with" takes a list (AEO §2.5, D12).
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { industries, type Industry } from '../../data/industries';

type IndustryCardsProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  intro?: string;
  /** Hide one vertical - for "other industries" on an industry page. */
  exclude?: Industry['id'];
  className?: string;
};

function CardBody({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <>
      <Icon aria-hidden="true" className="h-6 w-6 text-itblue" />
      <span className="mt-4 block text-h3 font-bold text-itdark">{industry.name}</span>
      <span className="mt-2 block flex-1 text-body text-muted">{industry.summary}</span>
    </>
  );
}

export default function IndustryCards({
  as: Heading = 'h2',
  heading = 'Wo we work with',
  headingId = 'industries-heading',
  intro,
  exclude,
  className = '',
}: IndustryCardsProps) {
  const shown = exclude ? industries.filter((i) => i.id !== exclude) : industries;

  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((industry) => (
          <li key={industry.id}>
            {industry.path ? (
              <Link
                to={industry.path}
                className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-itblue focus-visible:border-itblue lg:p-6"
              >
                <CardBody industry={industry} />
                <span className="mt-4 inline-flex items-center gap-1.5 text-small font-bold text-link group-hover:underline">
                  IT support for {industry.name.toLowerCase()}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div className="flex h-full flex-col rounded-card border border-border gb-surface p-5 lg:p-6">
                <CardBody industry={industry} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}