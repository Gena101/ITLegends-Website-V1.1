// src/components/seo/schema.ts
// JSON-LD builders. Everything comes from src/data; never hardcode NAP here.

import {
  branches,
  company,
  listingUrl,
  openingHours,
  schemaStreetAddress,
  type Branch,
  type BranchId,
} from '../../data/company';
import { locationsForBranch } from '../../data/locations';
import { absoluteUrl } from './url';

export type JsonLd = Record<string, unknown>;

const SITE = company.url;

export const schemaIds = {
  organization: `${SITE}/#organization`,
  website: `${SITE}/#website`,
  branch: (id: BranchId) => `${SITE}/#branch-${id}`,
};

/** Safe for embedding in <script>: escapes "<" so content can never close the tag */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// ---------- Global graph (rendered once by <GlobalSchema /> in Layout) ----------

function organizationSchema(): JsonLd {
  const sameAs = [company.social.facebook, company.social.instagram, company.social.linkedin].filter(
    (u): u is string => Boolean(u),
  );

  return {
    '@type': 'Organization',
    '@id': schemaIds.organization,
    name: company.name,
    legalName: company.legalName,
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: absoluteUrl(company.logo) },
    image: absoluteUrl(company.socialShareImage),
    email: company.email,
    telephone: company.phone.schema,
    foundingDate: String(company.foundingYear),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CIPC company registration number',
      value: company.registrationNumber,
    },
    subOrganization: branches.map((b) => ({ '@id': schemaIds.branch(b.id) })),
    sameAs,
  };
}

function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': schemaIds.website,
    url: `${SITE}/`,
    name: company.name,
    inLanguage: 'en-ZA',
    publisher: { '@id': schemaIds.organization },
  };
}

function branchSchema(branch: Branch): JsonLd {
  const listing = listingUrl(branch);

  return {
    '@type': 'LocalBusiness',
    '@id': schemaIds.branch(branch.id),
    name: branch.name,
    // Decide at launch whether each branch points to its location page instead (Phase 5 GBP checklist)
    url: `${SITE}/`,
    image: absoluteUrl(company.socialShareImage),
    logo: absoluteUrl(company.logo),
    telephone: company.phone.schema,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: schemaStreetAddress(branch.address),
      addressLocality: branch.address.locality,
      addressRegion: branch.address.region,
      postalCode: branch.address.postalCode,
      addressCountry: branch.address.countryCode,
    },
    ...(branch.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: branch.geo.latitude,
            longitude: branch.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: openingHours.flatMap((h) =>
      h.opens && h.closes
        ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.dayOfWeek, opens: h.opens, closes: h.closes }]
        : [],
    ),
    areaServed: locationsForBranch(branch.id).map((l) => ({ '@type': 'City', name: l.name })),
    parentOrganization: { '@id': schemaIds.organization },
    ...(listing ? { hasMap: listing, sameAs: [listing] } : {}),
  };
}

export function globalSchemaGraph(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), websiteSchema(), ...branches.map(branchSchema)],
  };
}

// ---------- Per-page builders (pass to <SeoHead schema={...} />) ----------

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Must be built from the SAME array that renders the visible FAQ list. Answers in plain text. */
export function faqSchema(faqs: ReadonlyArray<{ question: string; answer: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  /** Defaults to Gauteng; digital services can add e.g. "South Africa" */
  areaServed?: string[];
}

export function serviceSchema({ name, description, path, areaServed = ['Gauteng'] }: ServiceSchemaInput): JsonLd {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    provider: { '@id': schemaIds.organization },
    areaServed: areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  };
}