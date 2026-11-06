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
  /** Defaults to name; industry pages pass the general type, e.g. "Managed IT services" */
  serviceType?: string;
  /** Who the service is for (BusinessAudience), e.g. "accounting firms" */
  audience?: string;
  /** schema type for areaServed entries; location pages use City */
  areaType?: 'AdministrativeArea' | 'City';
  /** @id of the provider; defaults to the Organization (location pages pass their branch) */
  providerId?: string;
}

export function serviceSchema({
  name,
  description,
  path,
  areaServed = ['Gauteng'],
  serviceType = name,
  audience,
  areaType = 'AdministrativeArea',
  providerId = schemaIds.organization,
}: ServiceSchemaInput): JsonLd {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: { '@id': providerId },
    areaServed: areaServed.map((name) => ({ '@type': areaType, name })),
    ...(audience ? { audience: { '@type': 'BusinessAudience', audienceType: audience } } : {}),
  };
}

/** A list of pages (e.g. the services hub). Items use the same shape as breadcrumbs. */
export function itemListSchema(name: string, items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}


export interface ArticleSchemaInput {
  path: string;
  headline: string;
  description: string;
  /** "YYYY-MM-DD" */
  datePublished: string;
  /** "YYYY-MM-DD" */
  dateModified: string;
  section?: string;
  wordCount?: number;
}

/** BlogPosting. Author and publisher are the company (the site names no individual authors). */
export function articleSchema({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  section,
  wordCount,
}: ArticleSchemaInput): JsonLd {
  const url = absoluteUrl(path);
  const organization = { '@type': 'Organization', '@id': schemaIds.organization, name: company.name, url: `${SITE}/` };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified,
    inLanguage: 'en-ZA',
    image: absoluteUrl(company.socialShareImage),
    author: organization,
    publisher: { ...organization, logo: { '@type': 'ImageObject', url: absoluteUrl(company.logo) } },
    isPartOf: { '@id': schemaIds.website },
    ...(section ? { articleSection: section } : {}),
    ...(wordCount ? { wordCount } : {}),
  };
}

export interface PortfolioItem {
  name: string;
  description: string;
  kind: 'Software' | 'Website';
  url?: string;
}

/** Portfolio page: a CollectionPage whose main entity lists the projects. Creator is the company. */
export function portfolioSchema({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items: PortfolioItem[];
}): JsonLd {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': schemaIds.website },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': item.kind === 'Software' ? 'SoftwareApplication' : 'WebSite',
          name: item.name,
          description: item.description,
          ...(item.url ? { url: item.url } : {}),
          ...(item.kind === 'Software' ? { applicationCategory: 'BusinessApplication', operatingSystem: 'Web' } : {}),
          creator: { '@id': schemaIds.organization },
        },
      })),
    },
  };
}

export interface OfferPrice {
  price: number;
  /** e.g. "per device per month" */
  unitText: string;
}

export interface CatalogOffer {
  name: string;
  description: string;
  prices: OfferPrice[];
}

export interface OfferCatalogSchemaInput {
  /** The service the offers belong to; reuses that service page's @id so both pages describe one entity */
  serviceName: string;
  servicePath: string;
  catalogName: string;
  /** Page that lists the offers (e.g. /pricing) */
  pagePath: string;
  offers: CatalogOffer[];
  areaServed?: string[];
}

/** Service with an OfferCatalog of priced plans. Prices excl. VAT. No ratings or reviews. */
export function offerCatalogSchema({
  serviceName,
  servicePath,
  catalogName,
  pagePath,
  offers,
  areaServed = ['Gauteng'],
}: OfferCatalogSchemaInput): JsonLd {
  const serviceUrl = absoluteUrl(servicePath);
  const pageUrl = absoluteUrl(pagePath);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: serviceName,
    serviceType: serviceName,
    url: serviceUrl,
    provider: { '@id': schemaIds.organization },
    areaServed: areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: catalogName,
      url: pageUrl,
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        url: pageUrl,
        price: offer.prices[0]?.price,
        priceCurrency: 'ZAR',
        seller: { '@id': schemaIds.organization },
        priceSpecification: offer.prices.map((p) => ({
          '@type': 'UnitPriceSpecification',
          price: p.price,
          priceCurrency: 'ZAR',
          valueAddedTaxIncluded: false,
          unitText: p.unitText,
        })),
      })),
    },
  };
}

export interface WebPageSchemaInput {
  path: string;
  name: string;
  description: string;
}

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage';

function webPageSchema(type: WebPageType, { path, name, description }: WebPageSchemaInput): JsonLd {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.organization },
    mainEntity: { '@id': schemaIds.organization },
  };
}

/** ContactPage about the Organization (whose branches are in the global graph) */
export function contactPageSchema(input: WebPageSchemaInput): JsonLd {
  return webPageSchema('ContactPage', input);
}

/** AboutPage about the Organization */
export function aboutPageSchema(input: WebPageSchemaInput): JsonLd {
  return webPageSchema('AboutPage', input);
}