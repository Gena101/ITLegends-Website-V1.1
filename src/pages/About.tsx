// src/pages/About.tsx
// /about: company story, timeline, how we work, services, industries, qualifications, branches, FAQ.
// No founder photo or bio (brief). Only facts from src/data/about.ts.
import { BadgeCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ContactSection, FaqList, ServiceGrid } from '../components/sections';
import { aboutPageSchema, breadcrumbSchema, faqSchema, SeoHead } from '../components/seo';
import { Breadcrumbs, Card, Container, Reveal, Section, SectionHeading } from '../components/ui';
import { aboutFaqs, aboutIntro, bbbee, factStrip, principles, qualifications, story, timeline } from '../data/about';
import { branches, company, formatAddress, mapsUrl } from '../data/company';
import { industries, industryPath } from '../data/industries';
import { services } from '../data/services';

const path = '/about';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path },
];

const title = `About IT Legends: Gauteng IT Company Since ${company.foundingYear}`;
const description =
  `Founded in ${company.foundingYear} in Roodepoort, IT Legends gives Gauteng businesses managed IT, networks, connectivity, ` +
  `websites and software from one local team. B-BBEE Level ${bbbee.level}.`;

const linkClass = 'text-sm font-semibold text-itblue-soft transition-colors hover:text-white';

export default function About() {
  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={path}
        schema={[aboutPageSchema({ path, name: title, description }), breadcrumbSchema(crumbs), faqSchema(aboutFaqs)]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="about-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="about-title" className="text-h1">
              About IT Legends
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{aboutIntro}</p>
          </div>
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {factStrip.map((f) => (
              <div key={f.label} className="border-l-2 border-itblue/60 pl-4">
                <dt className="text-sm text-fg-subtle">{f.label}</dt>
                <dd className="order-first font-display text-3xl font-semibold text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Story + timeline */}
      <Section backdrop="grid" divider labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="story-title" title="Why we started" intro={story} />
          </Reveal>
          <Reveal className="lg:col-span-7">
            <ol className="relative space-y-10 border-l border-white/10 pl-8">
              {timeline.map((t) => (
                <li key={t.date} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-itblue to-itred ring-4 ring-ink-950"
                  />
                  <p className="text-sm font-semibold text-itblue-soft">{t.date}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* How we work */}
      <Section tone="raised" divider labelledBy="principles-title">
        <Reveal>
          <SectionHeading id="principles-title" title="How we work" />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <Card key={p.title} as="li" className="flex h-full flex-col">
                <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-gradient-to-r from-itblue to-itred" />
                <h3 className="mt-5 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{p.text}</p>
                {p.href && (
                  <Link to={p.href} className={`mt-auto pt-4 ${linkClass}`}>
                    See our pricing
                  </Link>
                )}
              </Card>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Reveal>
        <ServiceGrid
          id="what-we-do"
          title="What we do"
          intro={`${services.length} services across managed IT, infrastructure and digital.`}
        />
      </Reveal>

      {/* Industries + qualifications */}
      <Section tone="raised" divider labelledBy="credentials-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-h2">Industries we serve</h2>
            <p className="mt-4 text-fg-muted">Small and medium businesses across Gauteng, including:</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    to={industryPath(i.slug)}
                    className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-fg transition-colors hover:border-itblue/50 hover:text-white"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 id="credentials-title" className="text-h2">
              Team qualifications
            </h2>
            <ul className="mt-6 space-y-4">
              {qualifications.map((q) => (
                <li key={q.name} className="flex gap-3">
                  <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-itblue-soft" />
                  <div>
                    <p className="font-semibold text-white">{q.name}</p>
                    <p className="text-sm text-fg-muted">
                      {q.issuer}, {q.year}
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-itred-soft" />
                <div>
                  <p className="font-semibold text-white">B-BBEE Level {bbbee.level} contributor</p>
                  <p className="text-sm text-fg-muted">{company.legalName}</p>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Branches */}
      <Section divider labelledBy="branches-title">
        <Reveal>
          <SectionHeading id="branches-title" title="Our branches" />
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {branches.map((b) => (
              <Card key={b.id} as="li" variant="outline">
                <h3 className="text-base font-semibold text-white">{b.name}</h3>
                <p className="mt-2 text-sm text-fg-muted">{formatAddress(b.address)}</p>
                <a
                  href={mapsUrl(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-1.5 ${linkClass}`}
                >
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  Get directions
                </a>
              </Card>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link to="/contact" className={linkClass}>
              Hours, phone and contact form
            </Link>
          </p>
        </Reveal>
      </Section>

      <Section tone="raised" divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title="About IT Legends: common questions" />
          </Reveal>
          <FaqList items={aboutFaqs} className="lg:col-span-8" />
        </div>
      </Section>

      <ContactSection title="Talk to us" tone="base" />
    </Layout>
  );
}