// src/lib/schema/entities.ts
// Sitewide JSON-LD entities - 03-SEO-PLAYBOOK §5, 04-AEO-PLAYBOOK §2.3.
// Page-level builders are in ./page.ts.
//
// RULES
//  - Every emitted value must be VISIBLE on the page that emits it.
//    Organization and WebSite render on every page, so the Footer shows:
//    legal name, reg no, VAT no, "Since March 2020", the service-area line,
//    both branches' NAP and hours, and the social links.
//  - Entities link by @id. A page emits ONE document via graph().
//  - NEVER AggregateRating or Review about IT Legends (02 §9 NEVER).
//  - No SearchAction on WebSite (D33). No '$$' priceRange (D34).
import {
  SITE_URL,
  company,
  branches,
  hours,
  serviceArea,
  tiers,
  sameAs,
  type Branch,
} from '../../data/company';

export type JsonLd = Record<string, unknown>;

// ----------------------------------------------------------------- ids

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  founder: `${SITE_URL}/about#eugene-morton`,
  branch: (b: Branch) => `${SITE_URL}/#branch-${b.id}`,
} as const;

/** Square 512x512 logo made from the unaltered original (item 32). */
export const LOGO_URL = `${SITE_URL}/logo.png`;

/** Wraps nodes in a single @graph document for SeoHead. Falsy nodes are dropped. */
export function graph(...nodes: (JsonLd | null | undefined | false)[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

/** The six service-area cities from 02 §1 as schema City objects. */
export function cities(): JsonLd[] {
  return serviceArea.map((name) => ({ '@type': 'City', name }));
}

// ----------------------------------------------------------------- Organization

export function organization(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: company.brandName,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': ids.logo,
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: { '@id': ids.logo },
    email: company.email,
    telephone: company.phone.e164,
    vatID: company.vatNumber,
    foundingDate: company.foundingDate,
    areaServed: cities(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: company.phone.e164,
      email: company.email,
      areaServed: cities(),
    },
    sameAs: [...sameAs],
  };
}

/** Adds founder to the Organization. /about only, where Eugene is visible. */
export function organizationFounder(): JsonLd {
  return { '@id': ids.organization, founder: { '@id': ids.founder } };
}

//----------------------------------------------------------------- WebSite

export function website(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${SITE_URL}/`,
    name: company.brandName,
    inLanguage: 'en-ZA',
    publisher: { '@id': ids.organization },
  };
}

// ----------------------------------------------------------------- LocalBusiness

/**
 * One entity per GBP branch; the name is the GBP name, never the page's city.
 * Emit only where the branch's address and hours are visible (BranchCard):
 * home, /contact, location pages, the Gauteng hub.
 * `withPriceRange` only where the tier prices are visible (home, /pricing).
 */
export function localBusiness(b: Branch, opts: { withPriceRange?: boolean } = {}): JsonLd {
  const a = b.address;
  return {
    '@type': 'ProfessionalService',
    '@id': ids.branch(b),
    name: b.gbpName,
    url: `${SITE_URL}/`,
    image: LOGO_URL,
    telephone: company.phone.e164,
    email: company.email,
    hasMap: b.gbpUrl,
    parentOrganization: { '@id': ids.organization },
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: `${a.suburb}, ${a.locality}`,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: b.geo.latitude,
      longitude: b.geo.longitude,
    },
    openingHoursSpecification: hours.schedule.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...s.days],
      opens: s.opens,
      closes: s.closes,
    })),
    ...(opts.withPriceRange
      ? { priceRange: `${tiers[0].display}-${tiers[2].display} ${tiers[0].unit}, excl. VAT` }
      : {}),
  };
}

export function allLocalBusinesses(opts?: { withPriceRange?: boolean }): JsonLd[] {
  return branches.map((b) => localBusiness(b, opts));
}

// ----------------------------------------------------------------- Person

/** Eugene Morton - /about only. `image` only once a real photo exists (02 §9). */
export function person(opts: { knowsAbout?: string[]; image?: string } = {}): JsonLd {
  return {
    '@type': 'Person',
    '@id': ids.founder,
    name: company.founder.name,
    jobTitle: company.founder.jobTitle,
    worksFor: { '@id': ids.organization },
    sameAs: [company.founder.linkedIn],
    ...(opts.knowsAbout?.length ? { knowsAbout: opts.knowsAbout } : {}),
    ...(opts.image ? { image: opts.image } : {}),
  };
}