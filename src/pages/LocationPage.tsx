// src/pages/LocationPage.tsx
// Data-driven template for the location pages (/it-support-johannesburg, /it-support-sandton, …).
// The URLs have no :slug segment (/it-support-:slug isn't a valid router pattern), so each location
// is its own route entry pointing at this page, and the page reads its location from the pathname.
// Content: src/data/locations.ts (area, branch, parent) + src/data/location-pages.ts (copy, FAQs).
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { Layout } from '../components/layout';
import { ContactSection, FaqList, ProcessSteps, ServiceGrid } from '../components/sections';
import { breadcrumbSchema, faqSchema, normalizePath, schemaIds, SeoHead, serviceSchema } from '../components/seo';
import { Badge, Breadcrumbs, Button, Card, Container, Reveal, Section, SectionHeading } from '../components/ui';
import { company, formatAddress, formatHours, getBranch, mapsUrl, openingHours } from '../data/company';
import { industries, industryPath } from '../data/industries';
import { coverageText, locationPages } from '../data/location-pages';
import { childLocations, getLocation, locationPath, locations, type ServiceLocation } from '../data/locations';
import { managedOnboarding } from '../data/onboarding';
import { getService } from '../data/services';
import NotFound from './NotFound';

const managedIt = getService('managed-it-support');
if (!managedIt) throw new Error('LocationPage needs the managed-it-support service in services.ts');
const defaultService = managedIt.name;

export default function LocationPage() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
  const location = locations.find((l) => locationPath(l.slug) === path);
  // Unknown path → real 404 page (and the same markup as dist/404.html, so hydration matches)
  if (!location) return <NotFound />;
  return <LocationView location={location} />;
}

function LocationView({ location }: { location: ServiceLocation }) {
  const content = locationPages[location.slug];
  const path = locationPath(location.slug);
  const branch = getBranch(location.nearestBranch);
  const parent = location.parent ? getLocation(location.parent) : undefined;

  const crumbs = [
    { name: 'Home', path: '/' },
    ...(parent ? [{ name: `IT support in ${parent.name}`, path: locationPath(parent.slug) }] : []),
    { name: content.headline, path },
  ];

  // Metro page → its areas; area page → its metro page and the other areas under it
  const nearby = parent
    ? [parent, ...childLocations(parent.slug).filter((l) => l.slug !== location.slug)]
    : childLocations(location.slug);

  const supportCards = [
    {
      title: 'Remote help',
      text: `Phone, email and WhatsApp during business hours. Standard requests are acknowledged ${company.support.standardResponse}.`,
    },
    {
      title: 'Critical issues',
      text: `Acknowledged ${company.support.criticalResponse}, including a suspected security breach. ${company.support.criticalAfterHours}`,
    },
    { title: 'On-site visits', text: coverageText },
  ];

  return (
    <Layout>
      <SeoHead
        title={content.metaTitle}
        description={content.metaDescription}
        path={path}
        schema={[
          serviceSchema({
            name: `IT support in ${location.name}`,
            serviceType: 'Managed IT services',
            description: content.intro,
            path,
            areaServed: [location.name],
            areaType: 'City',
            providerId: schemaIds.branch(branch.id),
          }),
          faqSchema(content.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section
        aria-labelledby="location-title"
        className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header"
      >
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge tone="blue">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                {location.name}
              </Badge>
              <h1 id="location-title" className="mt-5 text-h1">
                {content.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-fg-muted">{content.intro}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="#contact" size="lg">
                  Book an IT assessment
                </Button>
                <Button href={company.phone.href} variant="secondary" size="lg">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  {company.phone.display}
                </Button>
              </div>
              <p className="mt-6 text-sm">
                <Link to="/pricing" className="font-semibold text-itblue-soft transition-colors hover:text-white">
                  Compare managed IT plans and pricing
                </Link>
              </p>
            </div>

            <Card className="lg:col-span-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-fg-subtle">Nearest branch</h2>
              <p className="mt-4 text-base font-semibold text-white">{branch.name}</p>
              <address className="mt-2 text-sm not-italic text-fg-muted">{formatAddress(branch.address)}</address>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                {openingHours.map((h) => (
                  <div key={h.label} className="contents">
                    <dt className="text-fg-subtle">{h.label}</dt>
                    <dd className="tabular-nums text-fg-muted">{formatHours(h)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5">
                <a
                  href={mapsUrl(branch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-itblue-soft transition-colors hover:text-white"
                >
                  Get directions to {branch.name}
                </a>
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Section tone="raised" divider labelledBy="support-title">
        <Reveal>
          <SectionHeading id="support-title" title={`How support works in ${location.name}`} />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {supportCards.map((card) => (
              <Card key={card.title} as="li" variant="solid" className="h-full">
                <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-gradient-to-r from-itblue to-itred" />
                <h3 className="mt-5 text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{card.text}</p>
              </Card>
            ))}
          </ul>
        </Reveal>
        <p className="mt-8 text-sm text-fg-subtle">
          Response times are times to acknowledge a request, not to resolve it. Automated monitoring runs around the clock.
        </p>
      </Section>

      <ServiceGrid id="services" title={`IT services in ${location.name}`} />

      <Section tone="raised" divider labelledBy="areas-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 id="areas-title" className="text-h3">
              {parent ? `More areas near ${location.name}` : `Areas we serve in and around ${location.name}`}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {nearby.map((l) => (
                <li key={l.slug}>
                  <Link
                    to={locationPath(l.slug)}
                    className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-fg transition-colors hover:border-itblue-soft hover:text-white"
                  >
                    IT support in {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="text-h3">Industries we support</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    to={industryPath(i.slug)}
                    className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-fg transition-colors hover:border-itblue-soft hover:text-white"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <ProcessSteps id="get-started" title="How to get started" steps={managedOnboarding} />

      <Section tone="raised" divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title={`IT support in ${location.name}: common questions`} />
          </Reveal>
          <FaqList items={content.faqs} className="lg:col-span-8" />
        </div>
      </Section>

      <ContactSection
        title={`Talk to us about IT support in ${location.name}`}
        defaultService={defaultService}
        tone="base"
      />
    </Layout>
  );
}