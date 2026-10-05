// src/components/sections/BranchCard.tsx
// One branch's NAP, hours and GBP link - 08 §7 (HOME, CONTACT, ABOUT).
//
// Every value is read from company.ts, which mirrors 02 §1. Never type a
// branch name, address or phone number into a page: GBP is the authority and
// an inconsistent NAP is the most common reason a modal fails to resolve a
// small business to one activity (AEO §7, D20).
//
// The heading level is a prop because this card appears under an H1 on
// /contact and under a H2 elsewhere - no skipped levels (§6 checklist).
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { company, formatAddress, hours, type Branch } from '../../data/company';
import { trackEvent } from '../../analytics';

type BranchCardProps = {
  branch: Branch;
  /** Heading level for the branch name. Pick to suit the page outline. */
  as?: 'h2' | 'h3';
  /** Opening hours block. Off for compact placements. */
  showHours?: boolean;
  /** Phone and email rows. Off where the page already carries them. */
  showContact?: boolean;
  /** GA4 click_tel location, so tel clicks can be told apart by placement. */
  trackLocation?: string;
  className?: string;
};

export default function BranchCard({
  branch,
  as: Heading = 'h3',
  showHours = true,
  showContact = true,
  trackLocation = 'branch_card',
  className = '',
}: BranchCardProps) {
  return (
    <div className={`rounded-card border border-border bg-surface p-5 lg:p-6 ${className}`}>
      <Heading className="text-h3 font-bold text-itdark lg:text-h3-lg">{branch.gbpName}</Heading>

      <address className="mt-4 space-y-2.5 not-italic">
        <p className="flex items-start gap-2.5 text-body">
          <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
          <span>{formatAddress(branch)}</span>
        </p>

        {showContact && (
          <p className="flex items-start gap-2.5 text-body">
            <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
            <a
              href={company.phone.tel}
              onClick={() => trackEvent('click_tel', { location: trackLocation })}
              className="text-link underline underline-offset-2 hover:no-underline"
            >
              {company.phone.display}
            </a>
          </p>
        )}

        {showContact && (
          <p className="flex items-start gap-2.5 text-body">
            <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
            <a
              href={`mailto:${company.email}`}
              className="text-link underline underline-offset-2 hover:no-underline"
            >
              {company.email}
            </a>
          </p>
        )}
      </address>

      {showHours && (
        <div className="mt-4 border-t border-border pt-4 text-small text-itdark">
          {hours.schedule.map((s) => (
            <p key={s.display}>{s.display}</p>
          ))}
          <p>{hours.closedDisplay}</p>
          <p>{hours.publicHolidaysDisplay}</p>
        </div>
      )}

      <a
        href={branch.gbpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-small text-link underline underline-offset-2 hover:no-underline"
      >
        View on Google Maps
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}