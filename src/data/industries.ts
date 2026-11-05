// src/data/industries.ts
// Lean on purpose: imported by the Navbar, Footer, Home and About (main bundle).
// Page content lives in industry-pages.ts (industry page chunk only).
// Only industries IT Legends currently serves. Legal and medical were removed in Nov 2026;
// add them back (here AND in industry-pages.ts) when there are clients in those industries.

export type IndustrySlug = 'accounting' | 'insurance' | 'automotive';

export interface Industry {
  slug: IndustrySlug;
  name: string;
}

export const industries: Industry[] = [
  { slug: 'accounting', name: 'Accounting' },
  { slug: 'insurance', name: 'Insurance' },
  { slug: 'automotive', name: 'Automotive' },
];

export function industryPath(slug: IndustrySlug): string {
  return `/industries/${slug}`;
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}