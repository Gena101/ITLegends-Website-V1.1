// src/data/company.ts
// Mirrors 02-PROJECT-KNOWLEDGE.md §1-§2 EXACTLY. 02 is the only approved
// source of IT Legends facts: change 02 first, then this file. Never round,
// estimate or add a value that is not in 02.
// All prices EXCLUDE VAT and must be displayed with `vatNote`.

export const SITE_URL = 'https://www.itlegends.co.za';

// ----------------------------------------------------------------- identity

export const company = {
  brandName: 'IT Legends', // prose
  legalName: 'IT Legends (Pty) Ltd', // legal and schema contexts
  registrationNumber: '2020/147010/07',
  vatNumber: '4920295864',
  foundingDate: '2020-03', // schema foundingDate
  foundedDisplay: 'March 2020',
  founder: {
    name: 'Eugene Morton',
    jobTitle: 'Director',
    linkedIn: 'https://www.linkedin.com/in/eugene-morton-483783112',
  },
  email: 'info@itlegends.co.za',
  phone: {
    display: '+27 84 634 8144',
    e164: '+27846348144',
    tel: 'tel:+27846348144',
  },
  whatsapp: {
    display: '+27 84 634 8144',
    url: 'https://wa.me/27846348144',
  },
  social: {
    facebook: 'https://www.facebook.com/itlegends',
    instagram: 'https://www.instagram.com/itlegends/',
  },
} as const;

// ----------------------------------------------------------------- branches
// Authoritative from Google Business Profile. Names use a plain hyphen-minus,
// never an en dash. Reproduce byte-identically everywhere.

export type Branch = {
  id: 'johannesburg' | 'pretoria';
  gbpName: string;
  address: {
    street: string;
    suburb: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  gbpUrl: string;
  storeCode?: string;
  geo: { latitude: number; longitude: number };
};

export const branches: readonly Branch[] = [
  {
    id: 'johannesburg',
    gbpName: 'IT Legends - Johannesburg',
    address: {
      street: '715 Elm Street',
      suburb: 'Grobler Park',
      locality: 'Roodepoort',
      region: 'Gauteng',
      postalCode: '1724',
      country: 'ZA',
    },
    gbpUrl: 'https://maps.app.goo.gl/V3ahJsTXzuPhCiJx7',
    geo: { latitude: -26.1436, longitude: 27.8564 },
  },
  {
    id: 'pretoria',
    gbpName: 'IT Legends - Pretoria',
    address: {
      street: '265 Theuns Van Niekerk Street',
      suburb: 'Wierdapark',
      locality: 'Centurion',
      region: 'Gauteng',
      postalCode: '0157',
      country: 'ZA',
    },
    gbpUrl: 'https://maps.app.goo.gl/2qxwLC1RPQS7nHBx7',
    storeCode: '14128510980249236560',
    geo: { latitude: -25.86, longitude: 28.189 },
  },
] as const;

/** One-line address exactly as displayed, e.g. in the footer and BranchCard. */
export function formatAddress(b: Branch): string {
  const a = b.address;
  return `${a.street}, ${a.suburb}, ${a.locality}, ${a.postalCode}`;
}

// ----------------------------------------------------------------- hours
// SAST (UTC+2). Public holidays are treated as Sunday.

export const hours = {
  timezone: 'Africa/Johannesburg',
  schedule: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '17:00', display: 'Monday-Friday 07:30 - 17:00' },
    { days: ['Saturday'], opens: '08:00', closes: '13:00', display: 'Saturday 08:00 - 13:00' },
  ],
  closedDisplay: 'Sunday closed - emergency support only',
  publicHolidaysDisplay: 'Public holidays treated as Sunday',
} as const;

// ----------------------------------------------------------------- service area

export const serviceArea = [
  'Johannesburg',
  'Pretoria',
  'Centurion',
  'Midrand',
  'Sandton',
  'Roodepoort',
] as const;

export const serviceDelivery =
  'Mostly delivered remotely, with on-site attendance where needed.';

export const verticals = ['accounting', 'legal', 'medical', 'insurance', 'automotive'] as const;

// ----------------------------------------------------------------- pricing
// EXACT. Never round or alter. `amount` feeds Offer schema; `display` is
// what appears on the page. Tier inclusions, add-ons and extended retention
// are below, decided Oct 2026.

export const vatNote = 'excl. VAT';

export type TierId = 'essential' | 'managed' | 'complete';

export const tiers = [
  { id: 'essential', name: 'Essential Care', amount: 449, display: 'R449', unit: 'per device per month', mostPopular: false },
  { id: 'managed', name: 'Managed Care', amount: 699, display: 'R699', unit: 'per device per month', mostPopular: true },
  { id: 'complete', name: 'Complete Care', amount: 949, display: 'R949', unit: 'per device per month', mostPopular: false },
] as const satisfies readonly { id: TierId, name: string, amount: number, display: string, unit: string, mostPopular: boolean }[];

export const pricingTerms = {
  currency: 'ZAR',
  // Available on ALL tiers (decided 5 Oct 2026, correcting the earlier
  // Complete Care restriction).
  serverAddOn: { amount: 1495, display: 'R1,495', unit: 'per server per month' },
  minimumMonthlyFee: { amount: 2245, display: 'R2,245', note: 'equivalent to 5 devices' },
  annualSlaDiscount: { percent: 10, display: '10%' },
  priceLock: { months: 12, display: '12 months' },
} as const;

// ----------------------------------------------------------------- inclusions
// What each tier includes - 02 §, decided Oct 2026. Each toer lists only
// what it ADDS; the page states that a tier carries everything below it.
//
// Every line must be deliverable TODAY with the stack in use (Action1 for
// patching, monitoring and Defender reporting; MSP360 to Z1 for backup).
// Never list a capability the tooling cannot deliver - that is D54 and D60
// repeating itself on a page a model will quote.

export const tierInclusions: Record<TierId, readonly string[]> = {
  essential: [
    'Remote helpdesk during business hours',
    'Endpoint monitoring and alerting',
    'Operating system and third-party patching',
    'Microsoft Defender configured and monitored',
    'User account and mailbox administration',
    'Asset register kept current',
    'Remote support only - on-site visits are billed separately',
  ],
  managed: [
    'Proactive maintenance',
    'Microsoft 365 administration',
    'Monthly reporting',
    'One on-site visit a month included',
  ],
  complete: [
    'Security reviews',
    'Quarterly IT planning',
    'Vendor and ISP liaison',
    'Two on-site visits a month included',
  ],
};

// ----------------------------------------------------------------- add-ons
// Available on every tier. Cloud backup is delivered by MSP360 Managed Backup
// to Z1 Storage, so restore testing is real rather than aspirational.
// "1TB" means STORED backup data pooled across the site, never live data and
// never per device - the difference is where backup margin is lost.

export const addOns = {
  server: {
    name: 'Server management',
    display: 'R1,495',
    unit: 'per server per month',
    note: 'Available on any plan, in addition to the per-device fee.'
  },
  backup: {
    name: 'Cloud backup',
    display: 'R249',
    unit: 'per device per month',
    note: 'Includes up to 1TB of stored backup data pooled across the site, with 30-day retention, monitored backups and restore testing.',
    overage: { display: 'R0.40', unit: 'per GB per month', note: 'Storage beyond 1TB.' },
  },
} as const;

export const extendedRetention = {
  defaultDisplay: '30 days',
  note: 'Assumes ordinary office files data. Databases, CAD and videos are quoted after an assessment.',
  warning:
    'Backup retention is not records archiving. Keeping records for fivve or seven years to satisfy SARS or Companies Act needs an archiving system, not a longer backup window.',
  options: [
    { period: '60 days', display: 'R350', unit: 'per site per month' },
    { period: '90 days', display: 'R650', unit: 'per site per month' },
    { period: '180 days', display: 'R1,400', unit: 'per site per month' },
    { period: '365 days', display: 'R2,900', unit: 'per site per month' },
  ],
} as const;

// ----------------------------------------------------------------- response guarantee

export const responseGuarantee = {
  standard: '24 business hours',
  criticalDefinition: 'server down, office offline, suspected breach',
  critical: [
    { tier: 'essential', display: 'same business day'},
    { tier: 'managed', display: 'within 4 business hours' },
    { tier: 'complete', display: 'within 2 business hours' },
  ],
} as const satisfies {
  standard: string;
  criticalDefinition: string;
  critical: readonly { tier: TierId, display: string }[];
};

// ----------------------------------------------------------------- -site call-out and labour
// 02 §2, revised 1 Oct 2026. REPLACES the old travelPolicy (free / R650 /
// R650 + R6.50/km), which priced travel only and was silent on labour - a
// reader took "free within 20km" to mean the whole visit was free.
// Distances are measured ONE WAY from the nearest branch. All excl. VAT.

export const onSite = {
  callOut: {
    amount: 650,
    display: 'R650',
    radiusKm: 20,
    label: 'Call-out, within 20km of the nearest branch',
    note: 'Includes the first hour on site, from the time the technician arrives. Charged per visit, not per day.',
  },
  extraTravel: {
    amountPerKm: 4.5,
    display: 'R4.50 per km',
    label: 'Travel beyond 20km',
    note: 'Charged on the kilometres beyond 20, measured one way.',
  },
  labour: {
    amountPerHour: 450,
    display: 'R450 per hour',
    label: 'Labour after the first hour',
    note: 'Billed in 30-minute increments, rounded-up.',
  },
  sla: {
    included:
      'Included on-site visits carry no call-out fee within 20km of the nearest branch. Beyond 20km, travel is agreed when the SLA is signed.',
    beyondAllowance: 'Visits beyond the tier allowance bill at R650 plus R450 per hour.',
  },
} as const;

// Free IT assessment - the pre-sales exception to the call-out fee above.

export const assessment = {
  withinRadius: {
    label: 'Within 20km of either branch',
    display: 'free',
  },
  beyondRadiusGauteng: {
    amount: 650,
    display: 'R650',
    label: 'Beyond 20km, within Gauteng',
    note: 'A flat fee with no per-kilometer charge.',
  },
  outsideGauteng: {
    label: 'Outside Gauteng',
    display: 'quoted per site',
  },
  credit: 'The assessment fee is credited against your first invoice if you sign.',
} as const;

// ----------------------------------------------------------------- sameAs
// Organization sameAs: social profiles and both GBP listings.
// Eugene's LinkedIn belongs on the Person schema, not here (02 §9).

export const sameAs = [
  company.social.facebook,
  company.social.instagram,
  ...branches.map((b) => b.gbpUrl),
] as const;