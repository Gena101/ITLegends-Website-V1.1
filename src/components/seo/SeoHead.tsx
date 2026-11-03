// src/components/seo/SeoHead.tsx
// Every page renders exactly one <SeoHead>. Global schema comes from <GlobalSchema /> in Layout.
import { Helmet } from 'react-helmet-async';
import { company } from '../../data/company';
import { serializeJsonLd, type JsonLd } from './schema';
import { absoluteUrl } from './url';

interface SeoHeadProps {
  /** Full <title>, aim for 50–60 characters */
  title: string;
  /** Aim for 140–160 characters */
  description: string;
  /** Route path, e.g. "/services/helpdesk" (trailing slash is stripped) */
  path: string;
  type?: 'website' | 'article';
  /** Path or absolute URL; defaults to the site share image */
  image?: string;
  /** For 404 and utility pages */
  noindex?: boolean;
  /** Page-level JSON-LD (Service, FAQPage, BreadcrumbList, Article…) */
  schema?: JsonLd | JsonLd[];
}

export function SeoHead({
  title,
  description,
  path,
  type = 'website',
  image = company.socialShareImage,
  noindex = false,
  schema,
}: SeoHeadProps) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  if (import.meta.env.DEV) {
    if (title.length > 60) console.warn(`[SeoHead] Title is ${title.length} chars (aim ≤ 60): ${path}`);
    if (description.length > 160) {
      console.warn(`[SeoHead] Description is ${description.length} chars (aim ≤ 160): ${path}`);
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {serializeJsonLd(s)}
        </script>
      ))}
    </Helmet>
  );
}