// src/components/sections/ServiceGrid.tsx
// Services grouped by pillar: pillar intro on the left, its service cards on the right.
// TODO Phase 2: replace lucide placeholders with the custom per-service SVG icon set.
import { Link } from 'react-router-dom';
import {
  Cable,
  Cloud,
  Code2,
  Globe,
  Headphones,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { pillars, servicePath, servicesByPillar, type ServiceSlug } from '../../data/services';
import { Card, Section, SectionHeading, cn } from '../ui';

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  'managed-it-support': Monitor,
  helpdesk: Headphones,
  cybersecurity: ShieldCheck,
  'cloud-backup': Cloud,
  'server-maintenance': Server,
  'hardware-network': Network,
  'structured-cabling': Cable,
  'business-connectivity': Wifi,
  'website-design': Globe,
  'custom-software': Code2,
};

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
                {servicesByPillar(pillar.id).map((service) => {
                  const Icon = serviceIcons[service.slug];
                  return (
                    <Card key={service.slug} as="li" interactive className="group">
                      <span
                        className={cn(
                          'inline-flex h-11 w-11 items-center justify-center rounded-control',
                          digital ? 'bg-itred/10 text-itred-soft' : 'bg-itblue/10 text-itblue-soft',
                        )}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
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
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}