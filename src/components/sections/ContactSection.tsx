// src/components/sections/ContactSection.tsx
// Contact details, opening hours and the shared ContactForm. Used on Home and service pages.
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { branches, company, formatHours, openingHours } from '../../data/company';
import { joinList } from '../../lib/text';
import { Section, SectionHeading } from '../ui';
import { ContactForm } from './ContactForm';

const linkClass = 'inline-flex items-center gap-3 text-fg transition-colors hover:text-white';
const branchTowns = joinList(branches.map((b) => b.address.locality));
const defaultIntro = `Send a message and we'll respond ${company.support.standardResponse}. Prefer to talk? Call or WhatsApp us.`;

interface ContactSectionProps {
  id?: string;
  title: string;
  intro?: string;
  /** Service name to pre-select in the form */
  defaultService?: string;
  tone?: 'base' | 'raised';
}

export function ContactSection({
  id = 'contact',
  title,
  intro = defaultIntro,
  defaultService,
  tone = 'raised',
}: ContactSectionProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} tone={tone} divider labelledBy={headingId}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id={headingId} title={title} intro={intro} />
          <ul className="mt-8 space-y-4">
            <li>
              <a href={company.phone.href} className={linkClass}>
                <Phone aria-hidden="true" className="h-5 w-5 text-itblue-soft" />
                {company.phone.display}
              </a>
            </li>
            <li>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MessageCircle aria-hidden="true" className="h-5 w-5 text-itblue-soft" />
                WhatsApp {company.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className={linkClass}>
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
        <ContactForm defaultService={defaultService} className="lg:col-span-7" />
      </div>
    </Section>
  );
}