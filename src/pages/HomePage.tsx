// src/pages/HomePage.tsx
// / - 08 §7 HOME. Primary keyword: managed IT services Gauteng.
//
// Replaces pages/legacy/LegacyHome.tsx, the old inlined one-page site. The
// homepage is now a hub: every section hands off to a page that answers in
// depth (D40 - Seobility link structure 0%, homepage read as an entry page
// with almost no internal links).
//
// No breadcrumbs on the homepage (08 §7). No Offer schema either: the
// pricing preview omits the server add-on, and managedItOffers() may only be
// emitted where every tier AND the add-on are visible, which is /pricing.
//
// ReviewsList returns null on an empty array, so the reviews section is
// self-managing - it appears only while there are real reviews to show.
import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import LastUpdated from '../components/seo/LastUpdated';
import Section from '../components/ui/Section';
import AnswerBlock from '../components/sections/AnswerBlock';
import BranchCard from '../components/sections/BranchCard';
import ProofStrip from '../components/sections/ProofStrip';
import ServiceCards from '../components/sections/ServiceCards';
import PricingTable from '../components/sections/PricingTable';
import ProcessSteps from '../components/sections/ProcessSteps';
import IndustryCards from '../components/sections/IndustryCards';
import ReviewsList from '../components/sections/ReviewsList';
import AreasList from '../components/sections/AreasList';
import FaqList, { faqSchemaFor } from '../components/sections/FaqList';
import CtaBand from '../components/sections/CtaBand';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { branches, company } from '../data/company';
import { homeFaqs } from '../data/faqs';
import { trackEvent } from '../analytics';

const PATH = '/';

const ANSWER =
  'IT Legends provides managed IT support to small and medium businesses across Johannesburg, ' +
  'Pretoria, Centurion, Midrand, Sandton and Roodepoort, from branches in Grobler Park and ' +
  'Wierdapark. Plans start at R449 per device per month excluding VAT, with response times from ' +
  '24 business hours down to 2 hours on critical issues.';

// Signed off 2026-10-06. Three steps, ending on the signature rather than
// trailing off into "ongoing support", which is what they bought, not a step.
const ONBOARDING = [
  {
    title: 'Free IT assessment',
    description:
      'We walk your site, list every device and show you what is exposed. The assessment report is yours either way. Free within 20km of either branch; further out in Gauteng it is R650 excluding VAT, credited against your first invoice if you sign.',
  },
  {
    title: 'Quote and signed SLA',
    description:
      'Device count, plan, monthly cost and response times in writing. Work starts once the SLA is signed.',
  },
  {
    title: 'Onboarding in 2 to 4 business days',
    description:
      'Monitoring agents deployed, backups verified, documentation built. Support runs from day one.',
  },
];

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Managed IT Services Gauteng | IT Support from R449 a Month"
        description="IT Legends provides managed IT support to small businesses across Gauteng from Roodepoort and Centurion. Plans from R449 per device a month, excl. VAT."
        url={PATH}
        nodes={[faqSchemaFor(homeFaqs)]}
      />

      <article>
        <Section id="home-hero">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h1 id="home-hero-heading" className="text-h1 font-bold lg:text-h1-lg">
                Managed IT services in Gauteng
              </h1>

              <AnswerBlock text={ANSWER} label={PATH} />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  Contact us
                </Link>
                <a
                  href={company.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_whatsapp', { location: 'home_hero' })}
                  className="btn-secondary"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp us
                </a>  
              </div>

              <p className="mt-5 text-body text-muted">
                Or call{' '}
                <a
                  href={company.phone.tel}
                  onClick={() => trackEvent('click_tel', { location: 'home-hero' })}
                  className="text-link underline underline-offset-2 hover:no-underline"
                >
                  {company.phone.display}
                </a>{' '}
                during business hours.
              </p>
            </div>

            <div className="space-y-5">
              {branches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  as="h2"
                  showContact={false}
                  trackLocation="home-branch"
                />
              ))}
            </div>
          </div>
        </Section>
      </article>

      <ProofStrip />

      <article>
        <Section id="home-services" tone="alt">
          <ServiceCards
            headingId="home-services-heading"
            heading="What we do"
            intro="Six services, all delivered on one monthly agreement. Most work is done remotely, with on-site attendance where a problem needs someone in the room."
          />
        </Section>

        <Section id="home-pricing">
          <h2 id="home-pricing-heading" className="text-h2 font-bold lg:text-h2-lg">
            What it costs
          </h2>
          <p className="mt-4 max-w-[65ch] text-body-lg">
            Three plans, billed per device per month. Our rates are published because you should
            not have to sit through a sales call to find out what IT support costs.
          </p>
          <PricingTable variant="compact" className="mt-8" />
        </Section>

        <Section id="home-process" tone="alt">
          <ProcessSteps
            steps={ONBOARDING}
            headingId="home-process-heading"
            heading="How to get started"
            intro="Three steps from first call to live support, with no obligation until you sign."
          />
        </Section>

        <Section id="home-industries">
          <IndustryCards
            headingId="home-industries-heading"
            heading="Who we work with"
            intro="Small and medium businesses in Gauteng that cannot afford to lose a working day to IT."
          />
        </Section>

        <Section id="home-reviews" tone="alt">
          <ReviewsList
            headingId="home-reviews-heading"
            heading="What our clients say"
            intro="Every review below is on our Google Business Profile, where you can read all of them."
          />
        </Section>

        <Section id="home-areas">
          <AreasList
            headingId="home-areas-heading"
            heading="Where we work"
            intro="We support businesses across Gauteng from two branches, in Grobler Park, Roodepoort and Wierdapark, Centurion."
          />
        </Section>

        <Section id="home-faq" tone="alt">
          <FaqList faqs={homeFaqs} headingId="home-faq-heading" />
          <p className="mt-8">
            <Link to="/faq" className="text-link underline underline-offset-2 hover:no-underline">
              More questions about IT support
            </Link>
          </p>
        </Section>

        <Section id="home-updated">
          <LastUpdated />
        </Section>
      </article>

      <CtaBand
        heading="Tired of IT being someone else's problem until it is yours?"
        intro="Tell us how many devices you run and we will come back with a figure from our pricing page. The IT assessment is free within 20km of either branch."
        source="home_cta"
      />
    </>
  );
}