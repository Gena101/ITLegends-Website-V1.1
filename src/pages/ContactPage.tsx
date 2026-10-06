// src/pages/ContactPage.tsx
// /contact - 08 §7 CONTACT. The NAP anchor and the main conversion page.
// Reinstated after being removed in favour of the /#contact anchor (02 §8).
//
// No <main> here: Layout owns it. Content is wrapped in <article>, sections
// are <Section> with aria-labelledby (D11, D36).
//
// Every fact comes from company.ts. The booking slot (08 §6) is NOT rendered
// - Calendly is chosen but not connected, and dead markup for a tool that
// does not exist is worse than adding it later.
// DEVIATION from 08 §7's "CtaBand at the end of every page": omitted here.
// The whole page is the CTA, and a band repeating the phone number and a
// second form below the first one is a noise, not conversion.
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';
import Breadcrumbs from '../components/seo/Breadcrumbs';
import LastUpdated from '../components/seo/LastUpdated';
import Section from '../components/ui/Section';
import AnswerBlock from '../components/sections/AnswerBlock';
import BranchCard from '../components/sections/BranchCard';
import ContactForm from '../components/sections/ContactForm';
import AreasList from '../components/sections/AreasList';
import FaqList, { faqSchemaFor } from '../components/sections/FaqList';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { branches, company, hours } from '../data/company';
import { contactFaqs } from '../data/faqs';
import { trackEvent } from '../analytics';

const PATH = '/contact';

const ANSWER =
  'IT Legends supports small and medium businesses across Gauteng from branches in Roodepoort ' +
  'and Wierdapark, Centurion. Call or WhatsApp +27 84 634 8144 Monday to Friday between 07:30 ' +
  'and 17:00, or Saturday between 08:00 and 13:00. Send the form on this page and we reply ' +
  'within one business day.';

export default function ContactPage() {
  return (
    <>
      <SeoHead
        title="Contact IT Legends | IT Support in Johannesburg & Pretoria"
        description="Contact IT Legends for managed IT support in Gauteng. Call or WhatsApp +27 84 634 8144, or send a message. Branches in Roodepoort and Centurion."
        url={PATH}
        nodes={[faqSchemaFor(contactFaqs)]}
      />

      <article>
        <Section id="contact-intro">
          <Breadcrumbs />

          <h1 id="contact-intro-heading" className="mt-5 text-h1 font-bold lg:text-h1-lg">
            Contact IT Legends
          </h1>

          <AnswerBlock text={ANSWER} label={PATH} />

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <li>
              <a
                href={company.phone.tel}
                onClick={() => trackEvent('click_tel', { location: 'contact_page' })}
                className="btn-primary w-full sm:w-auto"
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
                {company.phone.display}
              </a>
            </li>
            <li>
              <a
                href={company.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { location: 'contact_page' })}
                className="btn-secondary w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="btn-secondary w-full sm:w-auto">
                <Mail aria-hidden="true" className="h-5 w-5" />
                {company.email}
              </a>
            </li>
          </ul>

          <p className="mt-5 max-w-[65ch] text-body text-muted">
            {hours.schedule.map((s) => s.display).join('. ')}. {hours.closedDisplay}.{' '}
            {hours.publicHolidaysDisplay}. Not sure what you need yet? The{' '}
            <Link
              to="/services/managed-it-support"
              className="text-link underline underline-offset-2 hover:no-underline"
            >
              managed IT support
            </Link>{' '}
            page explains how we work, and the{' '}
            <Link to="/faq" className="text-link underline underline-offset-2 hover:no-underline">
              frequently asked questions
            </Link>{' '}
            cover most of the rest.
          </p>

          <LastUpdated className="mt-8" />
        </Section>

        <Section id="contact-form" tone="alt">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="contact-form-heading" className="text-h2 font-bold lg:text-h2-lg">
                Send us a message
              </h2>
              <p className="mt-4 max-w-[65ch] text-body-lg">
                Tell us what is going wrong, or what you are trying to put right. We reply within
                one business day.
              </p>
              <ContactForm variant="full" source="contact_page" className="mt-8" />
            </div>

            <div>
              <h3 className="text-h3 font-bold lg:text-h3-lg">Our branches</h3>
              <p className="mt-3 max-w-[60ch] text-body">
                Most support is delivered remotely. Both branches are open to visitors during
                business hours.
              </p>
              <div className="mt-6 space-y-5">
                {branches.map((branch) => (
                  <BranchCard
                    key={branch.id}
                    branch={branch}
                    as="h3"
                    showContact={false}
                    trackLocation="contact_page_branch"
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact-areas">
          <AreasList
            headingId="contact-areas-heading"
            heading="Where we work"
            intro="We support businesses across Gauteng, with on-site attendance where a problem needs someone in the room."
          />
        </Section>

        <Section id="contact-faq" tone="alt">
          <FaqList faqs={contactFaqs} headingId="contact-faq-heading" />
        </Section>
      </article>
    </>
  );
}