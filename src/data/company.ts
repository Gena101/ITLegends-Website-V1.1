// src/data/company.ts
// Single source of truth for NAP, contact details and identifiers.
// Must match 02-company-facts.md and the Google Business Profiles character for character.

export type BranchId = 'johannesburg' | 'pretoria';

export interface Address {
  streetAddress: string;
  suburb: string;
  locality: string;
  postalCode: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface Branch {
  id: BranchId;
  /** Exactly as listed on Google Business Profile */
  name: string;
  /** Short UI label */
  label: string;
  address: Address;
  /** TODO: copy from each GBP map pin. null = omitted from schema */
  geo: { latitude: number; longitude: number } | null;
  /** TODO: add at launch (Phase 5 GBP checklist) */
  googleBusinessProfileUrl: string | null;
}

export interface OpeningHours {
  /** UI label, e.g. "Mon–Fri" */
  label: string;
  /** schema.org day names */
  dayOfWeek: string[];
  /** 24h "HH:MM"; null = closed */
  opens: string | null;
  closes: string | null;
}

export const company = {
  name: 'IT Legends',
  legalName: 'IT Legends (Pty) Ltd',
  registrationNumber: '2020/147010/07',
  foundingYear: 2020,
  url: 'https://www.itlegends.co.za',
  email: 'info@itlegends.co.za',
  phone: {
    display: '+27 84 634 8144',
    schema: '+27-84-634-8144',
    href: 'tel:+27846348144',
  },
  logo: '/logo-itlegends.webp',
  mark: '/it-legends-mark.svg',
  socialShareImage: '/social-share.jpg',
  social: {
    facebook: 'https://www.facebook.com/itlegends',
    instagram: 'https://www.instagram.com/itlegends/',
    linkedin: null as string | null, // TBC
  },
  /** Overall service area (location pages live in locations.ts) */
  serviceArea: ['Johannesburg', 'Roodepoort', 'Sandton', 'Midrand', 'Centurion', 'Pretoria', 'Gauteng'],
  /** Web and software development also serves international clients */
  servesInternationalClients: true,
} as const;

export const branches: Branch[] = [
  {
    id: 'johannesburg',
    name: 'IT Legends - Johannesburg',
    label: 'Johannesburg branch',
    address: {
      streetAddress: '715 Elm Street',
      suburb: 'Grobler Park',
      locality: 'Roodepoort',
      postalCode: '1724',
      region: 'Gauteng',
      country: 'South Africa',
      countryCode: 'ZA',
    },
    geo: null,
    googleBusinessProfileUrl: null,
  },
  {
    id: 'pretoria',
    name: 'IT Legends - Pretoria',
    label: 'Pretoria branch',
    address: {
      streetAddress: '265 Theuns Van Niekerk Street',
      suburb: 'Wierdapark',
      locality: 'Centurion',
      postalCode: '0157',
      region: 'Gauteng',
      country: 'South Africa',
      countryCode: 'ZA',
    },
    geo: null,
    googleBusinessProfileUrl: null,
  },
];

/** Same hours at both branches */
export const openingHours: OpeningHours[] = [
  {
    label: 'Mon–Fri',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  { label: 'Sat', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
  { label: 'Sun', dayOfWeek: ['Sunday'], opens: null, closes: null },
];

/** "715 Elm Street, Grobler Park, Roodepoort, 1724, Gauteng, South Africa" (matches GBP) */
export function formatAddress(a: Address): string {
  return `${a.streetAddress}, ${a.suburb}, ${a.locality}, ${a.postalCode}, ${a.region}, ${a.country}`;
}

/** Schema streetAddress: "715 Elm Street, Grobler Park" */
export function schemaStreetAddress(a: Address): string {
  return `${a.streetAddress}, ${a.suburb}`;
}

/** Google Maps link: GBP URL when known, otherwise a search for name + address */
export function mapsUrl(branch: Branch): string {
  if (branch.googleBusinessProfileUrl) return branch.googleBusinessProfileUrl;
  const query = `${branch.name}, ${formatAddress(branch.address)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getBranch(id: BranchId): Branch {
  const branch = branches.find((b) => b.id === id);
  if (!branch) throw new Error(`Unknown branch: ${id}`);
  return branch;
}

export function formatHours(h: OpeningHours): string {
  return h.opens && h.closes ? `${h.opens}–${h.closes}` : 'Closed';
}