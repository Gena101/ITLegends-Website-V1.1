// src/pages/ServicePage.tsx
// Data-driven template for all 10 service pages (/services/:slug).
// Content: src/data/services.ts (name, pillar, summary) + src/data/service-pages.ts (page content).
import { Link, useParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { ServiceArt } from '../components/art/ServiceArt';
import { ServiceIcon } from '../components/icons';
import { Layout } from '../components/layout';
import { ContactSection, FaqList, ProcessSteps } from '../components/sections';
import { breadcrumbSchema, faqSchema, SeoHead, serviceSchema } from '../components/seo';
import { Badge, Breadcrumbs, Button, Card, Container, Reveal, Section, SectionHeading, cn } from '../components/ui';
import { company } from '../data/company';
import { getServicePage } from '../data/service-pages';
import { getService, pillars, servicePath, type PillarId, type Service } from '../data/services';
import NotFound from './NotFound';

const heroCta: Record<PillarId, string> = {
  'managed-it': 'Book an IT assessment',
  infrastructure: 'Book a site visit',
  digital: 'Request a quote',
};

export default function ServicePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const service = getService(slug);
  // Unknown slug → real 404 page (and the same markup as dist/404.html, so hydration matches)
  if (!service) return <NotFound />;
  return <ServiceView service={service} />;
}

function ServiceView({ service }: { service: Service }) {
  const content = getServicePage(service.slug);
  const pillar = pillars.find((p) => p.id === service.pillar);
  const path = servicePath(service.slug);
  const digital = service.pillar === 'digital';

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ];

  const related = content.related
    .map((s) => getService(s))
    .filter((s): s is Service => Boolean(s));

  return (
    <Layout>
      <SeoHead
        title={content.metaTitle}
        description={content.metaDescription}
        path={path}
        schema={[
          serviceSchema({ name: service.name, description: content.intro, path, areaServed: content.areaServed }),
          faqSchema(content.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section
        aria-labelledby="service-title"
        className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header"
      >
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              {pillar && <Badge tone={digital ? 'red' : 'blue'}>{pillar.name}</Badge>}
              <h1 id="service-title" className="mt-5 text-h1">
                {content.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-fg-muted">{content.intro}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="#contact" size="lg">
                  {heroCta[service.pillar]}
                </Button>
                <Button href={company.phone.href} variant="secondary" size="lg">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                  {company.phone.display}
                </Button>
              </div>
            </div>

            {/* Decorative animated art (desktop only) */}
            <div aria-hidden="true" className="hidden lg:col-span-4 lg:flex lg:justify-end">
              <ServiceArt slug={service.slug} digital={digital} />
            </div>
          </div>
        </Container>
      </section>

      <Section backdrop="grid" divider labelledBy="included-title">
        <Reveal>
          <SectionHeading id="included-title" title={`What ${service.name} includes`} />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.included.map((item) => (
              <Card key={item.title} as="li" className="h-full">
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-1 w-8 rounded-full bg-gradient-to-r',
                    digital ? 'from-itred to-itblue' : 'from-itblue to-itred',
                  )}
                />
                <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{item.text}</p>
              </Card>
            ))}
          </ul>
        </Reveal>
      </Section>

      <ProcessSteps id="process" title="How it works" steps={content.process} tone="raised" />

      <Section divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title={`${service.name}: common questions`} />
          </Reveal>
          <FaqList items={content.faqs} className="lg:col-span-8" />
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="raised" divider labelledBy="related-title">
          <Reveal>
            <SectionHeading id="related-title" title="Related services" />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Card key={s.slug} as="li" interactive>
                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-control',
                    s.pillar === 'digital' ? 'bg-itred/10 text-itred-soft' : 'bg-itblue/10 text-itblue-soft',
                  )}
                >
                  <ServiceIcon slug={s.slug} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {/* Stretched link: whole card is clickable, link text stays the service name */}
                  <Link
                    to={servicePath(s.slug)}
                    className="after:absolute after:inset-0 after:rounded-card after:content-['']"
                  >
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{s.summary}</p>
              </Card>
            ))}
          </ul>
        </Section>
      )}

      <ContactSection title={`Talk to us about ${service.name}`} defaultService={service.name} tone="base" />
    </Layout>
  );
}