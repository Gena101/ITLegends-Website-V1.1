// src/data/industries.ts
// The five client verticals (02 §1 CLIENT VERTICALS). Phase 5 builds a page
// for each; 08 §4 holds the slugs.
//
// `path` is null until that page exists. IndustryCards renders a card with
// no link while it is null, so nothing ever points at a 404 and nothing
// commits to a slug before it is decided. Fill in the path in the phase
// that builds the page - no component change needed.
//
// `summary` is claim-free: it names the pressure that vertical feels, never
// what IT Legends guarentees. Sector compliance detail and primary-source
// links belong on the page (08 §7 INDUSTRY), not here.
import {
  Calculator,
  Car,
  Scale,
  Stethoscope,
  Umbrella,
  type LucideIcon,
} from 'lucide-react';

export type IndustryId =
  | 'accountants'
  | 'law-firms'
  | 'medical-practices'
  | 'insurance-brokers'
  | 'automotive';

export type Industry = {
  id: IndustryId;
  /** Null until the Phase 5 page exists. Must match routes.json once set. */
  path: string | null;
  /** Card heading and nav label. */
  name: string;
  /** Homepage card line. */
  summary: string;
  icon: LucideIcon;
};

export const industries: readonly Industry[] = [
  {
    id: 'accountants',
    path: null, // Phase 5: /it-support-for-accountants
    name: 'Accounting firms',
    summary:
      'Practices that cannot lose a day to downtime in February, and hold client financial records under POPIA.',
    icon: Calculator,
  },
  {
    id: 'law-firms',
    path: null, // Phase 5: /it-support-for-law-firms
    name: 'Law firms',
    summary:
      'Firms where matter files are confidential, deadlines are court-imposed, and email fraud targets trust accounts.',
    icon: Scale,
  },
  {
    id: 'medical-practices',
    path: null, // Phase 5: /it-support-for-medical-practices
    name: 'Medical practices',
    summary:
      'Practices running billing and patient records, where an outage stops consultations and the data is health data.',
    icon: Stethoscope,
  },
  {
    id: 'insurance-brokers',
    path: null, // Phase 5: /it-support-for-insurance-brokers
    name: 'Insurance brokers',
    summary:
      'Brokerages tied to insurer portals and client policy data, where being offline means claims stop moving.',
    icon: Umbrella,
  },
  {
    id: 'automotive',
    path: null, // Phase 5: slug held until the client type is chosen (08 §4)
    name: 'Automotive',
    summary:
      'Workshops and dealerships that depend on job-card and parts systems staying up through a full working day.',
    icon: Car,
  },
];

/** Nav-shaped links for the Industries dropdown - only the pages that exist. */
export const industryNavLinks = industries
  .filter((i): i is Industry & { path: string } => i.path !== null)
  .map((i) => ({ label: i.name, to: i.path }));