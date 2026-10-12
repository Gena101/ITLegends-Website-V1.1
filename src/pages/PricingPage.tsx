// src/pages/PricingPage.tsx
// /pricing - 08 §7 PRICING. Primary keyword: IT support pricing South Africa.
//
// This page closes D09. Zero prices have ever appeared on this site, and no
// Gauteng competitor publishes a rate card - so this is the strongest single
// AEO-citation lever available (02 §2, AEO §2.2).
//
// Every figure renders from company.ts. The Offer schema is built from the
// same tiers the table shows, so nothing is marked up that is not visible.
import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import Breadcrumbs from '../components/seo/Breadcrumbs';
import LastUpdated from '../components/seo/LastUpdated';
import Section from '../components/ui/Section';
import AnswerBlock from '../components/sections/AnswerBlock';
import PricingTable from '../components/sections/PricingTable';
import ResponseLadder from '../components/sections/ResponseLadder';
import TierInclusions from '../components/sections/TierInclusions';
import CallOutRates from '../components/sections/CallOutRates';
import FaqList, { faqSchemaFor } from '../components/sections/FaqList';
import CtaBand from '../components/sections/CtaBand';
import { managedItOffers } from '../lib/schema/page';
import { pricingFaqs } from '../data/faqs';

const PATH = '/pricing';

const ANSWER =
  'IT Legends managed IT support starts at R449 per device per month excluding VAT, with ' +
  'Managed Care at R699 and Complete Care at R949. A minimum monthly fee of R2,245 applies, ' +
  'equivalent to five devices. Every plan carries a written response time, from 24 business ' +
  'hours down to 2 hours on critical issues.';

export default function PricingPage() {
  return (
    <>
      <SeoHead
        title="IT Support Pricing South Africa | Plans from R449 a Month"
        description="IT Legends publishes its managed IT support pricing: R449, R699 and R949 per device per month excl. VAT, with response times, call-out and travel rates."
        url={PATH}
        nodes={[managedItOffers(PATH), faqSchemaFor(pricingFaqs)]}
      />

      <article>
        <Section id="pricing-intro">
          <Breadcrumbs />

          <h1 id="pricing-intro-heading" className="mt-5 text-h1 font-bold lg:text-h1-lg">
            IT support pricing in South Africa
          </h1>

          <AnswerBlock text={ANSWER} label={PATH} />

          <p className="mt-5 max-w-[65ch] text-body text-muted">
            Our rates are on this page because you should not have to sit through a sales call to
            find out what IT support costs. If something here does not fit your situation,{' '}
            <Link to="/contact" className="text-link underline underline-offset-2 hover:no-underline">
              tell us what you need
            </Link>{' '}
            and we will quote it properly. The{' '}
            <Link
              to="/services/managed-it-support"
              className="text-link underline underline-offset-2 hover:no-underline"
            >
              managed IT support
            </Link>{' '}
            page explains how the service works day to day.
          </p>

          <LastUpdated className="mt-8" />
        </Section>

        <Section id="pricing-plans" tone="alt">
          <h2 id="pricing-plans-heading" className="text-h2 font-bold lg:text-h2-lg">
            Managed IT support plans
          </h2>
          <p className="mt-4 max-w-[65ch] text-body-lg">
            Billed per device per month, excluding VAT. A device is a workstation or laptop;
            servers are a separate add-on.
          </p>
          <PricingTable variant="full" className="mt-8" />
        </Section>

        <Section id="pricing-response">
          <ResponseLadder headingId="pricing-response-heaading" />
        </Section>

        <Section id="pricing-inclusions" tone="alt">
          <TierInclusions headingId="pricing-inclusions-heading" />
        </Section>

        <Section id="pricing-callouts">
          <CallOutRates heading="pricing-callouts-heading" />
        </Section>

        <Section id="pricing-faq" tone="alt">
          <FaqList faqs={pricingFaqs} headingId="pricing-faq-heading" />
        </Section>
      </article>

      <CtaBand
        heading="Want a number for your business?"
        intro="Tell us how many devices you run and we will come back with a figure from this page, not a mystery quote. The IT assessment is free within 20km of either branch."
        source="pricing_cta"
      />
    </>
  );
}