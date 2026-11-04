// src/components/seo/index.ts
export { SeoHead } from './SeoHead';
export { GlobalSchema } from './GlobalSchema';
export { absoluteUrl, normalizePath } from './url';
export {
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
  JsonLd,
  BreadcrumbItem,
  CatalogOffer,
  OfferCatalogSchemaInput,
  OfferPrice,
  ServiceSchemaInput,
  WebPageSchemaInput,
} from './schema';