// src/components/sections/ServiceGrid.tsx
// Services grouped by pillar: pillar intro on the left, its service cards on the right.
import { Link } from 'react-router-dom';
import { pillars, servicePath, servicesByPillar } from '../../data/services';
import { ServiceIcon } from '../icons';
import { Card, Section, SectionHeading, cn } from '../ui';

interface ServiceGridProps {
  id?: string;
  title: string;
  intro?: string;
  className?: string;
}

export function ServiceGrid({ id = 'services', title, intro, className }: ServiceGridProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} backdrop="grid" divider className={className}>
      <SectionHeading id={headingId} title={title} intro={intro} />

      <div className="mt-14 space-y-14 lg:space-y-20">
        {pillars.map((pillar) => {
          const digital = pillar.id === 'digital';
          return (
            <div key={pillar.id} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h3 className="text-h3">{pillar.name}</h3>
                <p className="mt-3 max-w-sm text-fg-muted">{pillar.summary}</p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {servicesByPillar(pillar.id).map((service) => (
                  <Card key={service.slug} as="li" interactive className="group">
                    <span
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-control',
                        digital ? 'bg-itred/10 text-itred-soft' : 'bg-itblue/10 text-itblue-soft',
                      )}
                    >
                      <ServiceIcon slug={service.slug} className="h-6 w-6" />
                    </span>
                    <h4 className="mt-5 text-base font-semibold text-white">
                      {/* Stretched link: whole card is clickable, link text stays the service name */}
                      <Link
                        to={servicePath(service.slug)}
                        className="after:absolute after:inset-0 after:rounded-card after:content-['']"
                      >
                        {service.name}
                      </Link>
                    </h4>
                    <p className="mt-2 text-sm text-fg-muted">{service.summary}</p>
                  </Card>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}