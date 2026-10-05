// src/components/sections/ResponseLadder.tsx
// The response ladder - 08 §8, used on /pricing and the Managed IT page.
//
// A real <ol>, not a card grid. The rungs are ordered by speed, and an
// ordered list is what an answer engine extracts verbatim when asked how
// fast an MSP responds (AEO §2.5). Zero <ol> elements exist on the site
// today (D12).
//
// Every figure comes from company.ts, which mirrors 02 §2. Never type a
// response time into a page - if the SLA changes in 02 this follows.
import { responseGuarantee, tiers, type TierId } from '../../data/company';

type ResponseLadderProps = {
  /** Heading level, to suit the page outline. */
  as?: 'h2' | 'h3';
  /** Heading text. */
  heading?: string;
  /** id for the section's aria-labelledby. */
  headingId?: string;
  className?: string;
};

function criticalFor(id: TierId): string {
  return responseGuarantee.critical.find((c) => c.tier === id)?.display ?? '';
}

export default function ResponseLadder({
  as: Heading = 'h2',
  heading = 'How fast we respond',
  headingId = 'response-ladder-heading',
  className = '',
}: ResponseLadderProps) {
  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">
        Every plan carries a response time in writing. Standard requests are answered within{' '}
        {responseGuarantee.standard}. Critical issues move faster, and how much faster depends on
        your plan.
      </p>

      <p className="mt-4 max-w-[65ch] text-body text-muted">
        Critical means {responseGuarantee.criticalDefinition}. Response times apply during
        business hours.
      </p>

      <ol className="mt-6 space-y-3">
        {tiers.map((tier, index) => (
          <li
            key={tier.id}
            className="flex items-baseline gap-4 rounded-card border border-border bg-surface-alt p-4 lg:p-5"
          >
            <span
              aria-hidden="true"
              className="shrink-0 text-h3 font-bold text-muted lg:text-h3-lg"
            >
              {index + 1}
            </span>
            <span className="flex-1">
              <span className="block text-h3 font-bold text-itdark">{tier.name}</span>
              <span className="block text-small text-muted">
                {tier.display} {tier.unit}
              </span>
            </span>
            <span className="shrink-0 text-right text-body-lg font-bold text-itdark">
              {criticalFor(tier.id)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}