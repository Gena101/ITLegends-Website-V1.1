// src/components/sections/CallOutRates.tsx
// On-site call-out, travel, labour and the free assessment - 08 §7 PRICING.
//
// RENAMED from the brief's TravelPolicyTable: since the 1 Oct 2026 revision
// this carries labour and the assessment as well as travel, so the old name
// described a third of it. Recorded as a deviation in 08.
//
// Every figure from company.ts, which mirrors 02 §2. The point of this block
// is that no reader can cofuse travel with labour - the old policy said
// travel within 20km was free and was silent on labour, which invited exactly
// that reading.
import { onSite, assessment, vatNote } from '../../data/company';

type CallOutRatesProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  /** Show the free-assessment block. Off where the page covers it already. */
  showAssessment?: boolean;
  className?: string;
};

export default function CallOutRates({
  as: Heading = 'h2',
  heading = 'On-site call-outs and labour',
  headingId = 'call-out-rates-heading',
  showAssessment = true,
  className = '',
}: CallOutRatesProps) {
  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">
        Most problems are fixed remotely. When someone does need to come out, these are the rates,
        and the call-out and the labour are charged separately so there is nothing to argue about
        on the invoice.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-left">
          <caption className="sr-only">
            IT Legends on-site call-out, travel and labour rates, excluding VAT
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="py-3 pr-4 text-small font-bold text-muted">
                Charge
              </th>
              <th scope="col" className="py-3 text-right text-small font-bold text-muted">
                Rate, {vatNote}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <th scope="row" className="py-4 pr-4 align-top font-normal">
                <span className="block text-body font-bold text-itdark">
                  {onSite.callOut.label}
                </span>
                <span className="block text-small text-muted">{onSite.callOut.note}</span>
              </th>
              <td className="py-4 text-right align-top text-h3 font-bold text-itdark">
                {onSite.callOut.display}
              </td>
            </tr>

            <tr className="border-b border-border">
              <th scope="row" className="py-4 pr-4 align-top font-normal">
                <span className="block text-body font-bold text-itdark">
                  {onSite.extraTravel.label}
                </span>
                <span className="block text-small text-muted">{onSite.extraTravel.note}</span>
              </th>
              <td className="py-4 text-right align-top text-h3 font-bold text-itdark">
                {onSite.extraTravel.display}
              </td>
            </tr>

            <tr className="border-b border-border">
              <th scope="row" className="py-4 pr-4 align-top font-normal">
                <span className="block text-body font-bold text-itdark">
                  {onSite.labour.label}
                </span>
                <span className="block text-small text-muted">{onSite.labour.note}</span>
              </th>
              <td className="py-4 text-right align-top text-h3 font-bold text-itdark">
                {onSite.labour.display}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-card border border-border bg-surface-alt p-5">
        <p className="text-body font-bold text-itdark">On a support plan?</p>
        <p className="mt-2 max-w-[65ch] text-body text-itdark">{onSite.sla.included}</p>
        <p className="mt-2 max-w-[65ch] text-body text-itdark">{onSite.sla.beyondAllowance}</p>
      </div>

      {showAssessment && (
        <div className="mt-6 rounded-card border border-border bg-surface-alt p-5">
          <p className="text-body font-bold text-itdark">The IT assessment is free</p>
          <ul className="mt-3 space-y-2 text-body text-itdark">
            <li>
              <strong>{assessment.withinRadius.label}:</strong> {assessment.withinRadius.display}.
            </li>
            <li>
              <strong>{assessment.beyondRadiusGauteng.label}:</strong>{' '}
              {assessment.beyondRadiusGauteng.display} {vatNote}.{' '}
              {assessment.beyondRadiusGauteng.note}
            </li>
            <li>
              <strong>{assessment.outsideGauteng.label}:</strong>{' '}
              {assessment.outsideGauteng.display}.
            </li>
          </ul>
          <p className="mt-3 max-w-[65ch] text-body text-itdark">{assessment.credit}</p>
        </div>
      )}

      <p className="mt-6 max-w-[65ch] text-small text-muted">
        Example: a two-hour visit to a site 35km from the nearest branch is R650 for the call-out
        including the first hour, R450 for the second hour, and R67.50 for the 15km beyond 20km -
        R1,167.50 {vatNote}.
      </p>
    </div>
  );
}