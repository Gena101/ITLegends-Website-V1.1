// src/components/sections/ProofStrip.tsx
// The proof band under the hero - 08 §7 HOME item 2.
//
// Three claims, every one checkable in a click: the Google rating per
// branch, the trading date, and the fastest critical response.
//
// NO REVIEW COUNT. Decided Phase 1 (02 §9): the rating is linked to the
// live listing so a reader can verify it. The count is a weakness today
// (D-REV, 3 per branch against a 20+ target) and showing it invites the
// comparison we lose. The rating itself is real and stays.
//
// NEVER add AggregateRating or Review schema here or anywhere (02 §9).
// This is visible content only; the start live on Google.
import { Star } from 'lucide-react';
import { branches, company, responseGuarantee, tiers } from '../../data/company';
import Container from '../ui/Container';

const RATING = '5.0';

/** The fastest critical response on offer, read from the data not typed. */
function fastestCritical() {
  const complete = responseGuarantee.critical.find((c) => c.tier === 'complete');
  const tier = tiers.find((t) => t.id === 'complete');
  return { display: complete?.display ?? '', tierName: tier?.name ?? '' };
}

export default function ProofStrip() {
  const critical = fastestCritical();

  return (
    <section aria-labelledby="proof-heading" className="bg-itdark text-itsilver">
      <Container className="py-8 lg:py-10">
        <h2 id="proof-heading" className="sr-only">
          Why businesses trust IT Legends
        </h2>

        <ul className="grid gap-6 sm:grid-cols-3 lg:gap-10">
          {branches.map((branch) => (
            <li key={branch.id}>
              <p className="flex items-center gap-1.5 text-h3 font-bold lg:text-h3-lg">
                <Star aria-hidden="true" className="h-5 w-5 fill-current" />
                {RATING} on Google
              </p>
              <a
                href={branch.gbpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-small text-link-dark underline underline-offset-2 hover:no-underline"
              >
                {branch.gbpName}
                <span className="sr-only"> on Goolge Maps (opens in a new tab)</span>
              </a>
            </li>
          ))}

          <li>
            <p className="text-h3 font-bold lg:text-h3-lg">{critical.display}</p>
            <p className="mt-1 text-small">
              Critical response on {critical.tierName}. Trading since {company.foundedDisplay}.
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}