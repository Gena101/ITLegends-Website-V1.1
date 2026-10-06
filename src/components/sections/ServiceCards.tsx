// src/components/sections/ServiceCards.tsx
// The six services cards - 08 §7 HOME item 3, and "related services" on each
// service page in Phase 4.
//
// Every card is a <Link> with the service name as the anchor text. Six
// descriptive internal links from the homepage, which currently has almost
// none (D40, D49). Never "Learn more" as the link text - the anchor is the
// keyword.
//
// Rendered as a <ul>. AEO §2.5: the homepage has no list elements at all
// today (D12), and a model extracting "what does IT Legends do" takes a list
// and ignores a grid of divs.
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services, type Service } from '../../data/services';

type ServiceCardsProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  /** Intro paragraph above the grid. */
  intro?: string;
  /** Hide one service - used for "related services" on that service's page. */
  exclude?: Service['id'];
  className?: string;
};

export default function ServiceCards({
  as: Heading = 'h2',
  heading = 'What we do',
  headingId = 'services-heading',
  intro,
  exclude,
  className = '',
}: ServiceCardsProps) {
  const shown = exclude ? services.filter((s) => s.id !== exclude) : services;

  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold  text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.path}>
              <Link
                to={service.path}
                className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-itblue focus-visible:border-itblue lg:p-6"
              >
                <Icon aria-hidden="true" className="h-6 w-6 text-itblue" />

                <span className="mt-4 block text-h3 font-bold text-itdark">{service.name}</span>

                <span className="mt-2 block flex-1 text-body text-muted">{service.summary}</span>

                <span className="mt-4 inline-flex items-center gap-1.5 text-small font-bold text-link group-hover:underline">
                  {service.name}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}