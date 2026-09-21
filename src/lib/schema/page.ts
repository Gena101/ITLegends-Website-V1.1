// src/lib/schema/page.ts
// Page-level JSON-LD builders - 03-SEO-PLAYBOOK §5.
// Callers pass the page's VISIBLE content; schema never says more than the page.
// Sitewide entities and graph() are in ./entities.ts.
import { tiers, pricingTerms, company } from '../../data/company';
import { toCanonical } from '../canonical';
import { ids, cities, type JsonLd } from './entities';

// ----------------------------------------------------------------- BreadcrumbList

export type Crumb = { name: string; path: string };

/** Built by <Breadcrumbs /> from the same crumbs it renders. Not on the homepage. */
export function breadcrumbList(crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: toCanonical(c.path),
    })),
  };
}

// ----------------------------------------------------------------- Service

/** One per service page. `description` must match visible copy on the page. */
export function service(opts: {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
}): JsonLd {
  const url = toCanonical(opts.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url,
    provider: { '@id': ids.organization },
    areaServed: cities(),
  };
}

// ----------------------------------------------------------------- FAQPage

export type Faq = { question: string; answer: string };

/**
 * Build from the SAME array <FaqList /> renders, so schema and visible text
 * match word for word (AEO §6, D03). Returns null for an empty list.
 * Note: Google no longer shows FAQ rich results (7 May 2026); this is for
 * Bing and AI crawlers, and is never a substitute for the visible Q&A.
 */
export function faqPage(faqs: Faq[]): JsonLd | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

// ----------------------------------------------------------------- Article

/** Blog posts. Dates come from routes.json and are never invented. */
export function article(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}): JsonLd {
  const url = toCanonical(opts.path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en-ZA',
    mainEntityOfPage: url,
    ...(opts.image ? { image: opts.image } : {}),
    author: { '@type': 'Person', '@id': ids.founder, name: company.founder.name },
    publisher: { '@id': ids.organization },
  };
}

// ----------------------------------------------------------------- Offers

function perUnitOffer(name: string, amount: number, unitText: string): JsonLd {
  return {
    '@type': 'Offer',
    name,
    price: amount,
    priceCurrency: pricingTerms.currency,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: amount,
      priceCurrency: pricingTerms.currency,
      unitText,
      valueAddedTaxIncluded: false,
    },
    seller: { '@id': ids.organization },
  };
}

/**
 * Managed IT plans as an OfferCatalog. Emit only where every tier AND the
 * server add-on are visible (/pricing). No priceValidUntil: 02 gives no
 * validity date - the 12-month price lock is per client, not an expiry.
 */
export function managedItOffers(path: string): JsonLd {
  return {
    '@type': 'Service',
    '@id': `${toCanonical(path)}#managed-it-plans`,
    name: 'Managed IT services',
    provider: { '@id': ids.organization },
    areaServed: cities(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Managed IT support plans',
      itemListElement: [
        ...tiers.map((t) => perUnitOffer(t.name, t.amount, t.unit)),
        perUnitOffer('Server add-on', pricingTerms.serverAddOn.amount, pricingTerms.serverAddOn.unit),
      ],
    },
  };
}