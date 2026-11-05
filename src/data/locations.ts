// src/data/locations.ts
// Location landing pages. Lean on purpose: imported by the Footer, Contact, About and the schema graph.
// nearestBranch drives each LocalBusiness areaServed in schema. Page content lives in location-pages.ts.

import type { BranchId } from './company';

export type LocationSlug = 'johannesburg' | 'pretoria' | 'roodepoort' | 'centurion' | 'sandton' | 'midrand';

export interface ServiceLocation {
  slug: LocationSlug;
  name: string;
  nearestBranch: BranchId;
  /** Metro page this area belongs to (Johannesburg / Pretoria); metro pages have none */
  parent?: LocationSlug;
}

export const locations: ServiceLocation[] = [
  { slug: 'johannesburg', name: 'Johannesburg', nearestBranch: 'johannesburg' },
  { slug: 'pretoria', name: 'Pretoria', nearestBranch: 'pretoria' },
  { slug: 'roodepoort', name: 'Roodepoort', nearestBranch: 'johannesburg', parent: 'johannesburg' },
  { slug: 'centurion', name: 'Centurion', nearestBranch: 'pretoria', parent: 'pretoria' },
  { slug: 'sandton', name: 'Sandton', nearestBranch: 'johannesburg', parent: 'johannesburg' },
  { slug: 'midrand', name: 'Midrand', nearestBranch: 'pretoria', parent: 'pretoria' },
];

/** Keeps the existing indexed URL pattern: /it-support-roodepoort */
export function locationPath(slug: LocationSlug): string {
  return `/it-support-${slug}`;
}

export function locationsForBranch(branch: BranchId): ServiceLocation[] {
  return locations.filter((l) => l.nearestBranch === branch);
}

export function getLocation(slug: string): ServiceLocation | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Areas listed under a metro page (Johannesburg → Roodepoort, Sandton) */
export function childLocations(slug: LocationSlug): ServiceLocation[] {
  return locations.filter((l) => l.parent === slug);
}