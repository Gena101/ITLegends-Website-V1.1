// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Code2, Mail, MapPin, MessageCircle, Phone, Wallet } from 'lucide-react';
import { Layout } from '../components/layout';
import { faqSchema, SeoHead } from '../components/seo';
import { ContactForm, FaqList, ServiceGrid } from '../components/sections';
import { HeroBackdrop } from '../components/three';
import { Button, Container, Reveal, Section, SectionHeading } from '../components/ui';
import { branches, company, formatHours, openingHours } from '../data/company';
import { homeFaqs } from '../data/faqs';
import { industries, industryPath } from '../data/industries';
import { primaryCta } from '../data/navigation';
import { formatRand, startingPrice, VAT_NOTE } from '../data/pricing';
import { services } from '../data/services';

/** ["a","b","c"] → "a, b and c" */
function joinList(items: string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const branchTowns = joinList(branches.map((b) => b.address.locality));
const fromPrice = formatRand(startingPrice);
const industryNames = joinList(industries.map((i) => i.name.toLowerCase()));

const heroIntro =
  `IT Legends is a managed IT services provider with branches in ${branchTowns}. ` +
  'We support small and medium businesses across Johannesburg and Pretoria with helpdesk support, cybersecurity, ' +
  'backups, networks and cabling, business internet, and custom websites and software, ' +
  `on monthly plans from ${fromPrice} per device (${VAT_NOTE}).`;

const heroFacts = [
  { Icon: CalendarDays, text: `Trading since ${company.foundingYear}` },
  { Icon: MapPin, text: `Branches in ${branchTowns}` },
  { Icon: Clock, text: `Requests acknowledged ${company.support.standardResponse}` },
];

const reasons = [
  {
    Icon: Wallet,
    title: 'Predictable monthly pricing',
    text: `Three managed IT plans from ${fromPrice} per device per month (${VAT_NOTE}), so you know what IT costs before something breaks.`,
  },
  {
    Icon: Clock,
    title: 'Clear response times',
    text: `Requests are acknowledged ${company.support.standardResponse}, and critical issues ${company.support.criticalResponse}.`,
  },
  {
    Icon: MapPin,
    title: 'Local, on-site when needed',
    text: `With branches in ${branchTowns}, a technician can come to you across Gauteng when remote support isn't enough.`,
  },
  {
    Icon: Code2,
    title: 'IT and software from one team',
    text: 'The team that runs your IT can also build your website or custom software, quoted at a fixed project price.',
  },
];

const steps = [
  {
    title: 'Talk to us',
    text: 'Call, WhatsApp or send a message. Tell us how many people and devices you have and what is getting in the way.',
  },
  {
    title: 'We review your setup',
    text: 'We look at your devices, network, backups and security to find the risks and gaps.',
  },
  {
    title: 'You get a clear proposal',
    text: 'A recommended plan with a monthly price per device, and any once-off work quoted upfront.',
  },
  {
    title: 'Onboarding and support',
    text: 'We document your environment, set up protection and monitoring, and give your team one place to log support requests.',
  },
];

const contactLinkClass = 'inline-flex items-center gap-3 text-fg transition-colors hover:text-white';

export default function Home() {
  return (
    <Layout>
      <SeoHead
        title="Managed IT Support Johannesburg & Pretoria | IT Legends"
        description="Managed IT support, cybersecurity, backups, networking and custom software for Gauteng businesses. Branches in Roodepoort and Centurion. Plans from R449/device."
        path="/"
        schema={faqSchema(homeFaqs)}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-ink-950 pt-header">
        <HeroBackdrop />
        <Container className="relative flex min-h-[88svh] items-center py-20 sm:py-24">
          <div className="max-w-3xl">
            <h1 id="home-title" className="text-display">
              Managed IT support that keeps Gauteng businesses running
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{heroIntro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#contact" size="lg">
                {primaryCta.label}
              </Button>
              <Button href={company.phone.href} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="h-5 w-5" />
                {company.phone.display}
              </Button>
            </div>
            <ul className="mt-12 flex flex-col gap-3 text-sm text-fg-muted sm:flex-row sm:flex-wrap sm:gap-x-8">
              {heroFacts.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-4 w-4 text-itblue-soft" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Reveal>
        <ServiceGrid
          title="IT, infrastructure and software from one team"
          intro={`${services.length} services across three areas, so one partner looks after your support, your network and the systems your business runs on.`}
        />
      </Reveal>

      <Section tone="raised" divider labelledBy="why-title">
        <Reveal>
          <SectionHeading id="why-title" title="Why businesses work with IT Legends" />
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {reasons.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="border-t border-white/10 pt-6">
              <Icon aria-hidden="true" className="h-6 w-6 text-itblue-soft" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12">
          <Link to="/pricing" className="text-sm font-semibold text-itblue-soft transition-colors hover:text-white">
            Compare managed IT plans
          </Link>
        </p>
      </Section>

      <Section backdrop="grid" divider labelledBy="process-title">
        <Reveal>
          <SectionHeading
            id="process-title"
            title="How getting started works"
            intro="Four steps from the first conversation to your team being supported."
          />
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6 md:before:absolute md:before:inset-x-0 md:before:top-5 md:before:h-px md:before:bg-gradient-to-r md:before:from-itblue/60 md:before:via-itblue/30 md:before:to-itred/50">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 0.1}>
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-itblue/50 bg-ink-950 font-display text-sm font-semibold tabular-nums text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised" divider labelledBy="industries-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              id="industries-title"
              title="IT support built around your industry"
              intro={`${industryNames.charAt(0).toUpperCase()}${industryNames.slice(1)} businesses each run specialised software and must protect client information under POPIA. We set up support, security and backups around how your industry works.`}
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <ul className="flex flex-wrap gap-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={industryPath(industry.slug)}
                    className="inline-flex h-11 items-center rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-fg transition-colors hover:border-itblue/50 hover:text-white"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="faq-title"
              title="Questions businesses ask us"
              actions={
                <Button href="/faq" variant="secondary">
                  More answers
                </Button>
              }
            />
          </Reveal>
          <FaqList items={homeFaqs} className="lg:col-span-8" />
        </div>
      </Section>

      <Section id="contact" tone="raised" divider labelledBy="contact-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-title"
              title="Tell us what's going on with your IT"
              intro={`Send a message and we'll respond ${company.support.standardResponse}. Prefer to talk? Call or WhatsApp us.`}
            />
            <ul className="mt-8 space-y-4">
              <li>
                <a href={company.phone.href} className={contactLinkClass}>
                  <Phone aria-hidden="true" className="h-5 w-5 text-itblue-soft" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                  <MessageCircle aria-hidden="true" className="h-5 w-5 text-itblue-soft" />
                  WhatsApp {company.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={contactLinkClass}>
                  <Mail aria-hidden="true" className="h-5 w-5 text-itblue-soft" />
                  {company.email}
                </a>
              </li>
            </ul>
            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-base font-semibold">Opening hours</h3>
              <dl className="mt-4 grid max-w-xs grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 text-sm">
                {openingHours.map((h) => (
                  <div key={h.label} className="contents">
                    <dt className="text-fg-subtle">{h.label}</dt>
                    <dd className="tabular-nums text-fg-muted">{formatHours(h)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-fg-muted">Branches in {branchTowns}.</p>
            </div>
          </div>
          <ContactForm className="lg:col-span-7" />
        </div>
      </Section>
    </Layout>
  );
}