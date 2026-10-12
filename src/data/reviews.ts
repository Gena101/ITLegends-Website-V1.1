// src/data/reviews.ts
// Real Google reviews, shown as VISIBLE CONTENT only.
//
// NEVER add AggregateRating or Review schema about IT Legends, on any page
// (02 §9, 03 §5). Google treats reviews a business shows about itself as
// self-serving, so LocalBusiness and Organization pages are ineligible for
// review stars - directly or through an ambedded Google or Facebook widget.
// Stars come from Google Business Profile in Maps and the local pack. These
// render as plain text with a link to each listing.
//
// TEXT IS VERBATIM, TYPOS INCLUDED. "Exelent", "hight recommend", "what our
// issues was", "Eugene give" are the customer's words. Never correct, tidy
// or shorten a review - editing it misrepresents what the person wrote, and
// the imperfections are what make it read as real.
//
// `date` is optional and omitted here: Google shows five of the six as
// relative times ("37 weeks ago"), and a converted date would be an estimate
// next to a named person. No schema depends on it.
//
// Transcribed from the live listings 12 Oct 2026. Re-check against GBP
// before go-live (Phase 7) in case any has been edited or removed.
import { branches, type Branch } from './company';

export type Review = {
  id: string;
  /** Reviewer name exactly as it appears on Google. Never initials or edits. */
  author: string;
  /** The review text verbatim. Never shortened or rewritten. */
  text: string;
  /** Star rating as given, 1-5. Displayed as text, never as schema. */
  rating: number;
  /** ISO date, where a real one is known. Omitted for relative timestamps. */
  date?: string;
  /** Which branch listing it sits on. */
  branch: Branch['id'];
};

export const reviews: readonly Review[] = [
  {
    id: 'jhb-jeandre-oosthuizen',
    author: 'Jeandre Oosthuizen',
    rating: 5,
    branch: 'johannesburg',
    text: 'Great service and Good prices. Fixed my PC in less than a day!',
  },
  {
    id: 'jhb-shaun',
    author: 'Shaun',
    rating: 5,
    branch: 'johannesburg',
    text: 'Very professional, I gighly recommend IT.Legends!',
  },
  {
    id: 'jhb-west-hendriks',
    author: 'West Hendriks',
    rating: 5,
    branch: 'johannesburg',
    text: 'Eugene give great products and service!',
  },
  {
    id: 'pta-bibi-grundling',
    author: 'Bibi Grundling',
    rating: 5,
    branch: 'pretoria',
    text: 'Hoping to share some feedback from the experience we have had with the PTA team ! - what a blessing it was to come across your team ! We have used your services multiple times and we have been more than satisfied with the service, hight recommend and excited to work with you in the future! - The everything.insure team',
  },
  {
    id: 'pta-dirk-muller',
    author: 'Dirk Muller',
    rating: 5,
    branch: 'pretoria',
    text: 'Exelent and rapid service. Will support this business again',
  },
  {
    id: 'pta-acd-centurion',
    author: 'ACD Centurion',
    rating: 5,
    branch: 'pretoria',
    text: 'Quick and fast service. Technician was on time and very professional towards us. Listened to what our issues was and resolved our issues in a quick manner.',
  },
];

/** "Leave a review" and "read our reviews" targets - one per branch. */
export const reviewLinks = branches.map((b) => ({
  branchId: b.id,
  gbpName: b.gbpName,
  url: b.gbpUrl,
}));

export const hasReviews = reviews.length > 0;