// src/data/reviews.ts
// Real Google reviews, shown as VISIBLE CONTENT only.
//
// NEVER add AggregateRating or Review schema about IT Legends, on any page
// (02 §9 NEVER, 03 §5). Google treats reviews a business shows about itself
// as self-serving, so LocalBusiness and Organisation pages are ineligible for
// review stars - directly or through an ambedded Google or Facebook widget.
// Stars come from Google Business Profile in Maps and the local pack. These
// render as plain text with a link to each listing.
//
// EVERY field must be copied verbatim from the live GBP listing: the text as
// written, the reviewer name exactly as Google displays it, the real date.
// Never paraphrase, tidy, shorten or compose a review. Permission to display
// is required before any entry is added (02 §9, 08 §13).
//
// The array is EMPTY until those six are supplied. ReviewList returns null
// while it is empty, so the homepage section does not render at all - there
// is no placeholder state and nothing provisional ever reaches a crawler.
import { branches, type Branch } from './company';

export type Review = {
  id: string;
  /** Reviewer name exactly as it appears on Google. Never initials or edits. */
  author: string;
  /** The review text verbatim. Never shortened or rewritten. */
  text: string;
  /** Star rating as given, 1-5. Displayed as text, never as schema. */
  rating: number;
  /** ISO date of the review. */
  date: string;
  /** Which branch listing it sits on. */
  branch: Branch['id'];
};

export const reviews: readonly Review[] = [];

/** "Leave a review" and "read our reviews" targets - one per branch. */
export const reviewLinks = branches.map((b) => ({
  branchId: b.id,
  gbpName: b.gbpName,
  url: b.gbpUrl,
}));

export const hasReviews = reviews.length > 0;