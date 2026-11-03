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
  /** From the GBP map pin */
  geo: { latitude: number; longitude: number } | null;
  /** Google Place ID ("ChIJ…"). null until added */
  placeId: string | null;
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
  whatsapp: 'https://wa.me/27846348144',
  /** Time to ACKNOWLEDGE a request, not to resolve it */
  support: {
    standardResponse: 'within one business day',
    criticalResponse: 'within 2 hours during business hours',
    criticalAfterHours:
      'Outside business hours, responses to critical issues may take longer, but we aim to respond within 2 hours.',
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
    geo: { latitude: -26.148472, longitude: 27.842823 },
    placeId: 'ChIJEyIDg4WflR4RLKSZ54st_LE',
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
    geo: { latitude: -25.856242, longitude: 28.137159 },
    placeId: 'ChIJMTV5HEZllR4Rz-4NSPGwD-8',
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

/** Google Maps link to the listing: Place ID when known, otherwise a name + address search */
export function mapsUrl(branch: Branch): string {
  if (branch.placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${branch.placeId}`;
  }
  const query = `${branch.name}, ${formatAddress(branch.address)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** "Write a review" link, or null until the Place ID is known */
export function reviewUrl(branch: Branch): string | null {
  return branch.placeId
    ? `https://search.google.com/local/writereview?placeid=${branch.placeId}`
    : null;
}

/** For schema sameAs: only the canonical listing URL, never the search fallback */
export function listingUrl(branch: Branch): string | null {
  return branch.placeId ? mapsUrl(branch) : null;
}

export function getBranch(id: BranchId): Branch {
  const branch = branches.find((b) => b.id === id);
  if (!branch) throw new Error(`Unknown branch: ${id}`);
  return branch;
}

export function formatHours(h: OpeningHours): string {
  return h.opens && h.closes ? `${h.opens}–${h.closes}` : 'Closed';
}