// src/components/sections/TierInclusions.tsx
// What each plan includes - 08 §7 PRICING.
//
// Three <ul> elements, one per tier, reading from company.ts. Each tier
// lists only what it ADDS, and says in text that it carries everything in
// the plan below - a model lifting the Complete Care list on its own would
// otherwise report four inclusions for a R949 plan (AEO §1 extractable).
//
// Plus the add-ons available on every tier, and extended retention.
// Every figure from 02 §2. Never type a price here.
import { Check, Plus } from 'lucide-react';
import {
  addOns,
  extendedRetention,
  tierInclusions,
  tiers,
  vatNote,
} from '../../data/company';

type TierInclusionsProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  /** Show the add-ons and extended-retention blocks. */
  showAddOns?: boolean;
  className?: string;
};

export default function TierInclusions({
  as: Heading = 'h2',
  heading = 'What each plan includes',
  headingId = 'inclusions-heading',
  showAddOns = true,
  className = '',
}: TierInclusionsProps) {
  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">
        Every plan is billed per device per month, {vatNote}, with a minimum of five devices.
        Each plan carries everything in the plan below it.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className="flex h-full flex-col rounded-card border border-border bg-surface p-5 lg:p-6"
          >
            <h3 className="text-h3 font-bold text-itdark lg:text-h3-lg">{tier.name}</h3>

            <p className="mt-1.5">
              <span className="text-h2 font-bold text-itdark">{tier.display}</span>{' '}
              <span className="text-small text-muted">
                {tier.unit}, {vatNote}
              </span>
            </p>

            {index > 0 && (
              <p className="mt-4 text-small font-bold text-itdark">
                Everything in {tiers[index - 1].name}, plus:
              </p>
            )}

            <ul className={`space-y-2.5 ${index > 0 ? 'mt-3' : 'mt-4'}`}>
              {tierInclusions[tier.id].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-body text-itdark">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-itblue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showAddOns && (
        <>
          <h3 className="mt-12 text-h3 font-bold text-itdark lg:text-h3-lg">
            Add-ons, available on any plan
          </h3>

          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {Object.values(addOns).map((addOn) => (
              <li
                key={addOn.name}
                className="flex h-full flex-col rounded-card border border-boder bg-surface-alt p-5"
              >
                <p className="flex items-start gap-2.5">
                  <Plus aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-itblue" />
                  <span>
                    <span className="block text-body font-bold text-itdark">{addOn.name}</span>
                    <span className="block text-h3 font-bold text-itdark">
                      {addOn.display}{' '}
                      <span className="text-small font-normal text-muted">
                        {addOn.unit}, {vatNote}
                      </span>
                    </span>
                  </span>
                </p>
                <p className="mt-3 text-body text-itdark">{addOn.note}</p>
                {'overage' in addOn && (
                  <p className="mt-2 text-small text-muted">
                    {addOn.overage.note} {addOn.overage.display} {addOn.overage.unit}, {vatNote}.
                  </p>
                )}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-h3 font-bold text-itdark lg:text-h3-lg">
            Keeping backups for longer
          </h3>

          <p className="mt-3 max-w-[65ch] text-body text-itdark">
            Cloud backup includes {extendedRetention.defaultDisplay} of retention. Longer windows
            are priced per site:
          </p>

          <div className="mt-5 max-w-2xl overflow-x-auto">
            <table className="w-full min-w-[22rem] border-collapse text-left">
              <caption className="sr-only">
                IT Legends extended backup retention pricing per site per month, excluding VAT
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 text-small font-bold text-muted">
                    Retention
                  </th>
                  <th scope="col" className="py-3 text-right text-small font-bold text-muted">
                    Per site per month, {vatNote}
                  </th>
                </tr>
              </thead>
              <tbody>
                {extendedRetention.options.map((option) => (
                  <tr key={option.period} className="border-b border-border">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-body font-bold text-itdark"
                    >
                      {option.period}
                    </th>
                    <td className="py-3 text-right text-body text-itdark">{option.display}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[65ch] text-small text-muted">{extendedRetention.note}</p>
          <p className="mt-2 max-w-[65ch] text-small text-muted">{extendedRetention.warning}</p>
        </>
      )}
    </div>
  );
}