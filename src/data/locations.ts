// src/data/locations.ts
// Location landing pages. nearestBranch drives each LocalBusiness areaServed in schema.
// Phase 4 adds page content for the data-driven location template.

import type { BranchId } from './company';

export type LocationSlug = 'johannesburg' | 'pretoria' | 'roodepoort' | 'centurion' | 'sandton' | 'midrand';

export interface ServiceLocation {
  slug: LocationSlug;
  name: string;
  nearestBranch: BranchId;
}

export const locations: ServiceLocation[] = [
  { slug: 'johannesburg', name: 'Johannesburg', nearestBranch: 'johannesburg' },
  { slug: 'pretoria', name: 'Pretoria', nearestBranch: 'pretoria' },
  { slug: 'roodepoort', name: 'Roodepoort', nearestBranch: 'johannesburg' },
  { slug: 'centurion', name: 'Centurion', nearestBranch: 'pretoria' },
  { slug: 'sandton', name: 'Sandton', nearestBranch: 'johannesburg' },
  { slug: 'midrand', name: 'Midrand', nearestBranch: 'pretoria' },
];

/** Keeps the existing indexed URL pattern: /it-support-roodepoort */
export function locationPath(slug: LocationSlug): string {
  return `/it-support-${slug}`;
}

export function locationsForBranch(branch: BranchId): ServiceLocation[] {
  return locations.filter((l) => l.nearestBranch === branch);
}