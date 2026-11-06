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
  ServiceSchemaInput,
  WebPageSchemaInput,
} from './schema';