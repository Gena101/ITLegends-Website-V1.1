// src/pages/FAQ.tsx
// /faq: every common question, grouped by topic, each topic linking to the page with the full detail.
// Visible FAQs and the FAQPage schema come from the same array (faq-page.ts).
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { CtaBand, FaqList } from '../components/sections';
import { breadcrumbSchema, faqSchema, SeoHead } from '../components/seo';
import { Breadcrumbs, Container, Reveal, Section, SectionHeading } from '../components/ui';
import { company } from '../data/company';
import { allFaqs, faqCategories } from '../data/faq-page';
import { VAT_NOTE } from '../data/pricing';

const path = '/faq';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path },
];

const title = 'IT Support FAQs: Plans, Pricing and Support | IT Legends';
const description =
  'Answers about IT Legends managed IT plans and pricing, response times, cybersecurity, backup, cabling, business internet, websites and custom software.';

const intro =
  'Answers to the questions businesses ask IT Legends most: what our managed IT plans include and cost, how quickly we respond, ' +
  'cybersecurity, backup, hardware, cabling, business internet, websites and custom software. ' +
  `All prices are ${VAT_NOTE}. Can't find your answer? Call or WhatsApp ${company.phone.display}.`;

const topicLinkClass =
  'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-fg ' +
  'transition-colors hover:border-itblue-soft/50 hover:text-white';

const detailLinkClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-itblue-soft transition-colors hover:text-white';

export default function FAQ() {
  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={path}
        schema={[breadcrumbSchema(crumbs), faqSchema(allFaqs)]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="faq-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="faq-title" className="text-h1">
              Frequently asked questions
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
          </div>
          <nav aria-label="FAQ topics" className="mt-10">
            <ul className="flex flex-wrap gap-3">
              {faqCategories.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className={topicLinkClass}>
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* One section per topic; ids match the topic links above */}
      {faqCategories.map((category, index) => {
        const headingId = `${category.id}-title`;
        return (
          <Section
            key={category.id}
            id={category.id}
            labelledBy={headingId}
            tone={index % 2 === 0 ? 'raised' : 'base'}
            divider
          >
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <SectionHeading id={headingId} title={category.title} />
                <ul className="mt-6 space-y-3">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className={detailLinkClass}>
                        {link.label}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <FaqList items={category.items} className="lg:col-span-8" />
            </div>
          </Section>
        );
      })}

      <CtaBand
        title="Still have a question?"
        text="Ask us directly. We'll tell you what fits your business, including when something isn't a fit."
      />
    </Layout>
  );
}