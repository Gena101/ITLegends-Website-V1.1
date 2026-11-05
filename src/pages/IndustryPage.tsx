// src/pages/IndustryPage.tsx
// Data-driven template for the industry pages (/industries/:slug).
// Content: src/data/industries.ts (slug, name) + src/data/industry-pages.ts (page content).
import { Link, useParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { ServiceIcon } from '../components/icons';
import { Layout } from '../components/layout';
import { ContactSection, FaqList, ProcessSteps } from '../components/sections';
import { breadcrumbSchema, faqSchema, SeoHead, serviceSchema } from '../components/seo';
import { Badge, Breadcrumbs, Button, Card, Container, Reveal, Section, SectionHeading, cn } from '../components/ui';
import { branches, company } from '../data/company';
import { getIndustry, industryPath, type Industry } from '../data/industries';
import { industryPages } from '../data/industry-pages';
import { managedOnboarding } from '../data/onboarding';
import { formatRand, onboarding, startingPrice, VAT_NOTE } from '../data/pricing';
import { getService, servicePath, type Service } from '../data/services';
import { joinList } from '../lib/text';
import NotFound from './NotFound';

const managedIt = getService('managed-it-support');
if (!managedIt) throw new Error('IndustryPage needs the managed-it-support service in services.ts');
const defaultService = managedIt.name;

/** Hero fact card: every value comes from src/data */
const glance = [
  { label: 'Managed IT plans', value: `From ${formatRand(startingPrice)} per device per month, ${VAT_NOTE}` },
  { label: 'Critical issues', value: `Acknowledged ${company.support.criticalResponse}` },
  { label: 'IT assessment', value: `Free within ${onboarding.freeAssessmentRadiusKm} km of either branch` },
  { label: 'Branches', value: joinList(branches.map((b) => b.address.locality)) },
];

export default function IndustryPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const industry = getIndustry(slug);
  // Unknown slug → real 404 page (and the same markup as dist/404.html, so hydration matches)
  if (!industry) return <NotFound />;
  return <IndustryView industry={industry} />;
}

function IndustryView({ industry }: { industry: Industry }) {
  const content = industryPages[industry.slug];
  const path = industryPath(industry.slug);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: `${industry.name} IT support`, path },
  ];

  const services = content.services.map((s) => getService(s)).filter((s): s is Service => Boolean(s));

  return (
    <Layout>
      <SeoHead
        title={content.metaTitle}
        description={content.metaDescription}
        path={path}
        schema={[
          serviceSchema({
            name: content.headline,
            serviceType: 'Managed IT services',
            audience: content.audience,
            description: content.intro,
            path,
          }),
          faqSchema(content.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section
        aria-labelledby="industry-title"
        className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header"
      >
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge tone="blue">{industry.name}</Badge>
              <h1 id="industry-title" className="mt-5 text-h1">
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
              <h2 className="text-sm font-semibold uppercase tracking-wider text-fg-subtle">At a glance</h2>
              <dl className="mt-5 space-y-4">
                {glance.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-semibold text-white">{item.label}</dt>
                    <dd className="mt-1 text-sm text-fg-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </Container>
      </section>

      <Section backdrop="grid" divider labelledBy="problems-title">
        <Reveal>
          <SectionHeading id="problems-title" title={`Where IT goes wrong for ${content.audience}`} />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.problems.map((problem) => {
              const service = getService(problem.service);
              return (
                <Card key={problem.title} as="li" className="flex h-full flex-col">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-itblue/10 text-itblue-soft"
                  >
                    <ServiceIcon slug={problem.service} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">{problem.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-fg-muted">{problem.text}</p>
                  {service && (
                    <Link
                      to={servicePath(service.slug)}
                      className="mt-5 text-sm font-semibold text-itblue-soft transition-colors hover:text-white"
                    >
                      {service.name}
                    </Link>
                  )}
                </Card>
              );
            })}
          </ul>
        </Reveal>
        {content.note && <p className="mt-8 text-sm text-fg-muted">{content.note}</p>}
      </Section>

      <Section tone="raised" divider labelledBy="software-title">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card variant="solid" className="h-full">
              <h2 id="software-title" className="text-h3">
                {content.softwareTitle}
              </h2>
              <p className="mt-4 text-fg-muted">{content.software}</p>
            </Card>
          </Reveal>
          <Reveal>
            <Card variant="solid" className="h-full">
              <h2 className="text-h3">{content.complianceTitle}</h2>
              {content.compliance.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section divider labelledBy="services-title">
        <Reveal>
          <SectionHeading id="services-title" title={`Services for ${content.audience}`} />
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
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

      <ProcessSteps id="get-started" title="How to get started" steps={managedOnboarding} tone="raised" />

      <Section divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title={`IT for ${content.audience}: common questions`} />
          </Reveal>
          <FaqList items={content.faqs} className="lg:col-span-8" />
        </div>
      </Section>

      <ContactSection
        title={`Talk to us about IT for your ${industry.name.toLowerCase()} business`}
        defaultService={defaultService}
        tone="base"
      />
    </Layout>
  );
}