// src/pages/ServicesHub.tsx
// /services: all 10 services by pillar, linking to the ServicePage template.
import { Phone } from 'lucide-react';
import { Layout } from '../components/layout';
import { ContactSection, ServiceGrid } from '../components/sections';
import { breadcrumbSchema, itemListSchema, SeoHead } from '../components/seo';
import { Breadcrumbs, Button, Container, Reveal } from '../components/ui';
import { company } from '../data/company';
import { formatRand, startingPrice, VAT_NOTE } from '../data/pricing';
import { pillars, servicePath, services } from '../data/services';
import { countWord, joinList } from '../lib/text';

const path = '/services';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path },
];

const intro =
  `IT Legends offers ${services.length} services across ${countWord(pillars.length)} areas: ${joinList(pillars.map((p) => p.name))}. ` +
  'One local team supports your staff and devices, builds and connects your office, and develops your website and business software. ' +
  `Managed IT plans start at ${formatRand(startingPrice)} per device per month (${VAT_NOTE}), and installation and development projects are quoted upfront.`;

export default function ServicesHub() {
  return (
    <Layout>
      <SeoHead
        title="IT Services for Gauteng Businesses | IT Legends"
        description="Managed IT, cybersecurity, backups, servers, hardware, cabling, business internet, websites and custom software for Gauteng businesses, from one local team."
        path={path}
        schema={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            'IT Legends services',
            services.map((s) => ({ name: s.name, path: servicePath(s.slug) })),
          ),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="services-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="services-title" className="text-h1">
              IT services for Gauteng businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#contact" size="lg">
                Ask which service fits
              </Button>
              <Button href={company.phone.href} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="h-5 w-5" />
                {company.phone.display}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Reveal>
        <ServiceGrid
          id="all-services"
          title="All services"
          intro="Choose a service to see what's included, how it works and answers to common questions."
        />
      </Reveal>

      <ContactSection
        title="Not sure which service you need?"
        intro={`Tell us what's going on and we'll point you to the right service. We respond ${company.support.standardResponse}.`}
      />
    </Layout>
  );
}