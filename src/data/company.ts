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
// Authoritative from Google Business Profile. Names use a plain hypen-minus,
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
// what appears on the page. Tier INCLUSIONS are not yet supplied (02 §2) -
// do not add them here until Eugene provides them.

export const vatNote = 'excl. VAT';

export type TierId = 'essential' | 'managed' | 'complete';

export const tiers = [
  { id: 'essential', name: 'Essential Care', amount: 449, display: 'R449', unit: 'per device per month', mostPopular: false },
  { id: 'managed', name: 'Managed Care', amount: 699, display: 'R699', unit: 'per device per month', mostPopular: true },
  { id: 'complete', name: 'Complete Care', amount: 949, display: 'R949', unit: 'per device per month', mostPopular: false },
] as const satisfies readonly { id: TierId, name: string, amount: number, display: string, unit: string, mostPopular: boolean }[];

export const pricingTerms = {
  currency: 'ZAR',
  serverAddOn: { amount: 1495, display: 'R1,495', unit: 'per server per month', tier: 'complete' as TierId },
  minimumMonthlyFee: { amount: 2245, display: 'R2,245', note: 'equivalent to 5 devices' },
  annualSlaDiscount: { percent: 10, display: '10%' },
  priceLock: { months: 12, display: '12 months' },
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

// ----------------------------------------------------------------- travel policy

export const travelPolicy = [
  { zone: 'within-20km', label: 'Within 20km of either branch', display: 'free' },
  { zone: '20-50km', label: '20-50km', display: 'R650' },
  { zone: 'beyond-50km', label: 'Beyond 50km', display: 'R 650 + R 6,50/km' },
] as const;

// ----------------------------------------------------------------- sameAs
// Organization sameAs: social profiles and both GBP listings.
// Eugene's LinkedIn belongs on the Person schema, not here (02 §9).

export const sameAs = [
  company.social.facebook,
  company.social.instagram,
  ...branches.map((b) => b.gbpUrl),
] as const;