// src/pages/Work.tsx
// /work: portfolio, the proof for the website and custom software services. Content: src/data/work.ts.
import { Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceIcon } from '../components/icons';
import { Layout } from '../components/layout';
import { CtaBand } from '../components/sections';
import { breadcrumbSchema, portfolioSchema, SeoHead } from '../components/seo';
import { Badge, Breadcrumbs, Card, Container, Reveal, Section, cn } from '../components/ui';
import { getService, servicePath } from '../data/services';
import { projects } from '../data/work';

const path = '/work';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Our work', path },
];

const title = 'Our Work: Websites and Custom Software | IT Legends';
const description =
  'Websites and custom software built by IT Legends, including SiteNexus, the field and asset management app our technicians use every day.';

const intro =
  'Proof of what we build: software we use every day, a product in development and websites for real businesses. ' +
  'IT Legends designs and builds websites and custom software at a fixed price agreed upfront, for clients in South Africa and abroad.';

const linkClass = 'inline-flex items-center gap-1.5 text-sm font-medium text-itblue-soft transition-colors hover:text-white';

export default function Work() {
  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={path}
        schema={[
          portfolioSchema({
            path,
            name: title,
            description,
            items: projects.map((p) => ({ name: p.name, description: p.summary, kind: p.kind, url: p.url })),
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="work-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="work-title" className="text-h1">
              Our work
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
          </div>
          <nav aria-label="Projects" className="mt-10">
            <ul className="flex flex-wrap gap-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-itblue-soft/50 hover:text-white"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {projects.map((project, index) => {
        const headingId = `${project.id}-title`;
        const service = getService(project.service);
        const digitalTone = project.kind === 'Website';
        return (
          <Section
            key={project.id}
            id={project.id}
            labelledBy={headingId}
            tone={index % 2 === 0 ? 'raised' : 'base'}
            divider
          >
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span
                  className={cn(
                    'inline-flex h-12 w-12 items-center justify-center rounded-control',
                    digitalTone ? 'bg-itred/10 text-itred-soft' : 'bg-itblue/10 text-itblue-soft',
                  )}
                >
                  <ServiceIcon slug={project.service} className="h-6 w-6" />
                </span>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge tone={digitalTone ? 'red' : 'blue'}>{project.kind}</Badge>
                  <Badge>{project.status}</Badge>
                  {project.launched && <Badge>Since {project.launched}</Badge>}
                </div>
                <h2 id={headingId} className="mt-5 text-h2">
                  {project.name}
                </h2>
                <p className="mt-4 text-lead text-fg-muted">{project.summary}</p>
                <div className="mt-8 flex flex-col items-start gap-3">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Visit {project.url.replace(/^https?:\/\//, '')}
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                  {service && (
                    <Link to={servicePath(service.slug)} className={linkClass}>
                      {service.name}
                    </Link>
                  )}
                </div>
              </div>

              <Reveal className="lg:col-span-7">
                <Card padding="lg">
                  {project.description.map((text) => (
                    <p key={text} className="mt-4 leading-relaxed text-fg-muted first:mt-0">
                      {text}
                    </p>
                  ))}
                  <ul className="mt-8 space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-fg">
                        <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-itblue-soft" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {project.results && project.results.length > 0 && (
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {project.results.map((r) => (
                        <li key={r} className="rounded-control border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white">
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.stack && (
                    <p className="mt-8 text-sm text-fg-subtle">Built with {project.stack.join(', ')}</p>
                  )}
                </Card>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <CtaBand
        title="Have a website or system in mind?"
        text="Tell us what you need. We scope it with you and quote a fixed price before any work starts."
      />
    </Layout>
  );
}