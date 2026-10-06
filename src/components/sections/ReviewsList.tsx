// src/components/sections/ReviewsList.tsx
// Real Google reviews as VISIBLE CONTENT - 08 §7 HOME item 7.
//
// NEVER AggregateRating or Review schema about IT Legends, on any page, ever
// (02 §9, 03 §5). Google treats a business showing reviews about itself as
// self-serving and the page is ineligible for review stars either way. The
// starts live on Google; this is plain text plus a link to the listing.
//
// Returns NULL while reviews is empty. The section does not render, so there
// is no placeholder and nothing provisional is ever crawled. Paste the real
// six into reviews.ts and this appears with no change here.
import { Star } from 'lucide-react';
import { branches } from '../../data/company';
import { reviews, reviewLinks } from '../../data/reviews';
import { formatDate } from '../../lib/dates';

type ReviewsListProps = {
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  intro?: string;
  className?: string;
};

function branchName(id: string): string {
  return branches.find((b) => b.id === id)?.gbpName ?? '';
}

export default function ReviewsList({
  as: Heading = 'h2',
  heading = 'What our clients say',
  headingId = 'reviews-heading',
  intro,
  className = '',
}: ReviewsListProps) {
  if (reviews.length === 0) return null;

  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols;3">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="flex h-full flex-col rounded-card border border-border bg-surface p-5 lg:p-6"
          >
            <p className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current text-itdark" />
              ))}
            </p>

            <blockquote className="mt-3 flex-1">
              <p className="text-body text-itdark">{review.text}</p>
            </blockquote>

            <footer className="mt-4 text-small text-muted">
              <span className="block font-bold text-itdark">{review.author}</span>
              <span className="block">
                {branchName(review.branch)} · <time dateTime={review.date}>{formatDate(review.date)}</time>
              </span>
            </footer>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-card border border-border bg-surface-alt p-5">
        <p className="text-body font-body text-itdark">
          Read every review, or leave one of your own
        </p>
        <ul className="mt-3 space-y-2">
          {reviewLinks.map((link) => (
            <li key={link.branchId}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-link underline underline-offset-2 hover:no-underline"
              >
                {link.gbpName} on Google
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}