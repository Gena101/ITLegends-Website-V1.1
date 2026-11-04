// src/pages/Contact.tsx
// /contact: direct contact options, the shared ContactForm, both branches and contact FAQs.
import { Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ContactForm, FaqList } from '../components/sections';
import { breadcrumbSchema, contactPageSchema, faqSchema, SeoHead } from '../components/seo';
import { Breadcrumbs, Card, Container, Reveal, Section, SectionHeading } from '../components/ui';
import { branches, company, formatHours, mapsUrl, openingHours, reviewUrl } from '../data/company';
import { branchTowns, contactFaqs, openHoursText } from '../data/contact-page';
import { locationPath, locationsForBranch } from '../data/locations';

const path = '/contact';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path },
];

const { standardResponse, criticalResponse } = company.support;

const title = 'Contact IT Legends: Johannesburg and Pretoria Branches';
const description =
  `Call or WhatsApp ${company.phone.display}, email ${company.email}, or visit our ${branchTowns} branches. ` +
  `Open ${openHoursText}.`;

const intro =
  `Call or WhatsApp IT Legends on ${company.phone.display}, email ${company.email}, or send a message using the form below. ` +
  `Our ${branchTowns} branches are open ${openHoursText}. ` +
  `We respond to standard requests ${standardResponse} and to critical issues ${criticalResponse}.`;

const channels: { label: string; value: string; href: string; external?: boolean; icon: ReactNode }[] = [
  {
    label: 'Call us',
    value: company.phone.display,
    href: company.phone.href,
    icon: <Phone aria-hidden="true" className="h-5 w-5" />,
  },
  {
    label: 'WhatsApp',
    value: company.phone.display,
    href: company.whatsapp,
    external: true,
    icon: <MessageCircle aria-hidden="true" className="h-5 w-5" />,
  },
  {
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
    icon: <Mail aria-hidden="true" className="h-5 w-5" />,
  },
];

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-itblue-soft transition-colors hover:text-white';

export default function Contact() {
  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={path}
        schema={[
          contactPageSchema({ path, name: title, description }),
          breadcrumbSchema(crumbs),
          faqSchema(contactFaqs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="contact-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="contact-title" className="text-h1">
              Contact IT Legends
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {channels.map((c) => (
              <Card key={c.label} as="li" interactive>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-itblue/10 text-itblue-soft">
                  {c.icon}
                </span>
                <p className="mt-4 text-sm text-fg-subtle">{c.label}</p>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="mt-1 block break-words font-semibold text-white after:absolute after:inset-0 after:rounded-card"
                >
                  {c.value}
                </a>
              </Card>
            ))}
          </ul>
        </Container>
      </section>

      {/* Form */}
      <Section id="message" tone="raised" divider labelledBy="message-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="message-title"
              title="Send us a message"
              intro={`Tell us what you need and we'll respond ${standardResponse}. Prefer to talk? Call or WhatsApp us.`}
            />
            <div className="mt-8 rounded-card border border-itred/30 bg-itred/5 p-6">
              <h3 className="text-base font-semibold text-white">Critical issue?</h3>
              <p className="mt-2 text-sm text-fg-muted">
                If a system is down or you suspect a security breach, call or WhatsApp us on{' '}
                <a href={company.phone.href} className="font-semibold text-white hover:text-itred-soft">
                  {company.phone.display}
                </a>{' '}
                instead of using the form. We acknowledge critical issues {criticalResponse}.
              </p>
            </div>
          </div>
          <ContactForm className="lg:col-span-7" />
        </div>
      </Section>

      {/* Branches */}
      <Section divider backdrop="grid" labelledBy="branches-title">
        <Reveal>
          <SectionHeading
            id="branches-title"
            title="Our branches"
            intro={`Two branches, in ${branchTowns}, serving businesses across Gauteng.`}
          />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {branches.map((branch) => {
              const a = branch.address;
              const review = reviewUrl(branch);
              const served = locationsForBranch(branch.id);
              return (
                <Card key={branch.id} as="li" padding="lg" className="flex h-full flex-col">
                  <h3 className="text-h3">{branch.name}</h3>
                  <address className="mt-4 not-italic leading-relaxed text-fg-muted">
                    {a.streetAddress}, {a.suburb}
                    <br />
                    {a.locality}, {a.postalCode}
                    <br />
                    {a.region}, {a.country}
                  </address>
                  <dl className="mt-6 grid max-w-xs grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 text-sm">
                    {openingHours.map((h) => (
                      <div key={h.label} className="contents">
                        <dt className="text-fg-subtle">{h.label}</dt>
                        <dd className="tabular-nums text-fg-muted">{formatHours(h)}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-sm text-fg-muted">
                    Serving{' '}
                    {served.map((l, i) => (
                      <span key={l.slug}>
                        {i > 0 && (i === served.length - 1 ? ' and ' : ', ')}
                        <Link to={locationPath(l.slug)} className="text-fg underline-offset-4 hover:text-white hover:underline">
                          {l.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8">
                    <a href={mapsUrl(branch)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      Get directions
                    </a>
                    {review && (
                      <a href={review} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <Star aria-hidden="true" className="h-4 w-4" />
                        Write a review
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="raised" divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title="Contact questions" />
          </Reveal>
          <FaqList items={contactFaqs} className="lg:col-span-8" />
        </div>
      </Section>
    </Layout>
  );
}