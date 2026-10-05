// src/components/sections/PricingTable.tsx
// The three-tier comparison - 08 §7 (HOME item 4, PRICING).
//
// A REAL <table> with <th scope>, not a card grid. AEO §2.5: a model
// extracting "what does IT support cost in South Africa" takes a
// table or a list verbatim and ignores styled divs. Zero <table> elements
// exist on the site today (D12).
//
// Every figure comes from company.ts, which mirrors 02 §2 exactly. Prices
// EXCLUDE VAT and must always render with vatNote (D09).
//
// TIER INCLUSIONS ARE NOT HERE. They are not yet in 02 §2, so this table
// carries price, unit and critical response only. The inclusions <ul> is a
// separate component added when Eugene supplies them.
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import {
  pricingTerms,
  responseGuarantee,
  tiers,
  vatNote,
  type TierId,
} from '../../data/company';

type PricingTableProps = {
  /** "compact" for the homepage preview, "full" for /pricing. */
  variant?: 'compact' | 'full';
  /** Caption for screen readers and for a crawler reading the table alone. */
  caption?: string;
  className?: string;
};

function criticalFor(id: TierId): string {
  return responseGuarantee.critical.find((c) => c.tier === id)?.display ?? '';
}

export default function PricingTable({
  variant = 'full',
  caption = 'IT Legends managed IT support plans, per device per month, excluding VAT',
  className = '',
}: PricingTableProps) {
  const full = variant === 'full';

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className='w-full min-w-[34rem] border-collapse text-left'>
        <caption className="sr-only">{caption}</caption>

        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-3 pr-4 text-small font-bold text-muted">
              Plan
            </th>
            {tiers.map((tier) => (
              <th key={tier.id} scope="col" className="py-3 pr-4 align-bottom">
                <span className="block text-h3 font-bold text-itdark">{tier.name}</span>
                {tier.mostPopular && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-btn bg-itred px-2 py-0.5 text-small font-bold text-white">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    Most popular
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-border">
            <th scope="row" className="py-4 pr-4 align-top text-body font-bold text-itdark">
              Price
            </th>
            {tiers.map((tier) => (
              <td key={tier.id} className="py-4 pr-4 align-top">
                <span className="block text-h2 font-bold text-itdark">{tier.display}</span>
                <span className="block text-small text-muted">
                  {tier.unit}, {vatNote}
                </span>
              </td>
            ))}
          </tr>

          <tr className="border-b border-border">
            <th scope="row" className="py-4 pr-4 align-top text-body font-bold text-itdark">
              Critical response
            </th>
            {tiers.map((tier) => (
              <td key={tier.id} className="py-4 pr-4 align-top text-body text-itdark">
                {criticalFor(tier.id)}
              </td>
            ))}
          </tr>

          <tr className="border-b border-border">
            <th scope="row" className="py-4 pr-4 align-top text-body font-bold text-itdark">
              Standard response
            </th>
            {tiers.map((tier) => (
              <td key={tier.id} className="py-4 pr-4 align-top text-body text-itdark">
                {responseGuarantee.standard}
              </td>
            ))}
          </tr>

          {full && (
            <tr className="border-b border-border">
              <th scope="row" className="py-4 pr-4 align-top text-body font-bold text-itdark">
                Server add-on
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="py-4 pr-4 align-top text-body text-itdark">
                  {pricingTerms.serverAddOn.display} {pricingTerms.serverAddOn.unit}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>

      <ul className="mt-5 space-y-1.5 text-small text-muted">
        <li>
          Minimum monthly fee {pricingTerms.minimumMonthlyFee.display} {vatNote} (
          {pricingTerms.minimumMonthlyFee.note}).
        </li>
        <li>
          Sign an annual SLA for {pricingTerms.annualSlaDiscount.display} off, with your rate
          locked for {pricingTerms.priceLock.display}.
        </li>
        <li>
          Critical means a server down, the office offline or a suspected breach. Response times
          apply during business hours.
        </li>
      </ul>

      {!full && (
        <p className="mt-5">
          <Link to="/pricing" className="text-link underline underline-offset-2 hover:no-underline">
            See what each plan includes, call-out rates and travel
          </Link>
        </p>
      )}
    </div>
  );
}