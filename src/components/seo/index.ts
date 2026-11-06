// src/components/seo/index.ts
export { SeoHead } from './SeoHead';
export { GlobalSchema } from './GlobalSchema';
export { absoluteUrl, normalizePath } from './url';
export {
  aboutPageSchema,
  articleSchema,
  breadcrumbSchema,
  contactPageSchema,
  faqSchema,
  itemListSchema,
  offerCatalogSchema,
  portfolioSchema,
  serviceSchema,
  globalSchemaGraph,
  serializeJsonLd,
  schemaIds,
} from './schema';
export type {
  ArticleSchemaInput,
  JsonLd,
  BreadcrumbItem,
  CatalogOffer,
  OfferCatalogSchemaInput,
  OfferPrice,
  PortfolioItem,
  ServiceSchemaInput,
  WebPageSchemaInput,
} from './schema';