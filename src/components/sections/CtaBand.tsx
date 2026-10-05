// src/components/sections/CtaBand.tsx
// The conversion block at the end of every page - 08 §6, §7.
//
// Three routes out, because people choose differently: call now, WhatsApp
// now, or leave details. itdark band per 08 §8 - itsilver text, link-dark
// links, itred as a button FILL only and never as text on dark.
//
// The compact ContactForm posts to the same webhook as /contact, with
// `source` set per page so enquiries can be told apart by origin.
import { Phone } from 'lucide-react';
import { company } from '../../data/company';
import { trackEvent } from '../../analytics';
import ContactForm from './ContactForm';
import Container from '../ui/Container';
import WhatsAppIcon from '../ui/WhatsAppIcon';

type CtaBandProps = {
  /** H2 for this page's CTA. Make it specific - never "Get in touch". */
  heading: string;
  /** One or two sentences under the heading. */
  intro: string;
  /** GA4 and Make `source` value, e.g. "home_cta", "pricing_cta". */
  source: string;
  /** Hide the form where the page already carries the full one (/contact). */
  showForm?: boolean;
};

export default function CtaBand({ heading, intro, source, showForm = true }: CtaBandProps) {
  const headingId = `${source}-heading`;

  return (
    <section aria-labelledby={headingId} className="bg-itdark text-itsilver">
      <Container className="py-12 lg:py-20">
        <div className={showForm ? 'grid gap-10 lg:grid-cols-2 lg:gap-16' : ''}>
          <div>
            <h2 id={headingId} className="text-h2 font-bold lg:text-h2-lg">
              {heading}
            </h2>
            <p className="mt-4 max-w-[60ch] text-body-lg">{intro}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={company.phone.tel}
                onClick={() => trackEvent('click_tel', { location: source })}
                className="btn-primary"
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
                {company.phone.display}
              </a>

              <a
                href={company.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { location: source })}
                className="btn-secondary border-itsilver text-itsilver hover:bg-itgray"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp us
              </a>
            </div>

            <p className="mt-5 text-small">
              Monday to Firday 07:30 to 17:00, Saturday 08:00 to 13:00. Email{' '}
              <a
                href={`mailto:${company.email}`}
                className="text-link-dark underline underline-offset-2 hover:no-underline"
              >
                {company.email}
              </a>
              .
            </p>
          </div>

          {showForm && (
            <div className="rounded-card bg-surface p-5 lg:p-6">
              <p className="text-h3 font-bold text-itdark">Or send us a message</p>
              <p className="mt-1.5 text-small text-muted">
                We reply within one business day.
              </p>
              <ContactForm variant="compact" source={source} className="mt-5" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}