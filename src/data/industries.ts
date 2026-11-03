// src/data/industries.ts
// Minimal now (nav/footer). Phase 4 adds page content, FAQs and schema data.

export type IndustrySlug = 'accounting' | 'legal' | 'medical' | 'insurance' | 'automotive';

export interface Industry {
  slug: IndustrySlug;
  name: string;
}

export const industries: Industry[] = [
  { slug: 'accounting', name: 'Accounting' },
  { slug: 'legal', name: 'Legal' },
  { slug: 'medical', name: 'Medical' },
  { slug: 'insurance', name: 'Insurance' },
  { slug: 'automotive', name: 'Automotive' },
];

export function industryPath(slug: IndustrySlug): string {
  return `/industries/${slug}`;
}