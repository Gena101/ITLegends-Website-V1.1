// src/components/seo/SeoHead.tsx
// Owns every SEO tag in <head>: title, description, robots, canonical,
// Open Graph, Twitter and JSON-LD. index.html must not duplicate any of them.
//
// - Canonical: lib/canonical (https, www, no trailing slash).
// - Robots: noindex when the page asks (404) OR on staging/deploy previews
//   (lib/env). Production can never be noIndexed by the deploy check.
// - JSON-LD: ONE @graph per page = Organization + WebSite + WebPage + the
//   page's `nodes`. Emitted as the <script>'s text child (never
//   dangerouslySetInnerHTML, or react-helmet-async drops it - D47).
// - Dates: taken from routes.json for the current path unless passed in.
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import routesData from '../../data/routes.json';
import { SITE_URL, company } from '../../data/company';
import { toCanonical } from '../../lib/canonical';
import { isIndexableDeploy } from '../../lib/env';
import { graph, organization, website, ids, type JsonLd } from '../../lib/schema/entities';

type SeoHeadProps = {
  /** Full title tag, 50-60 characters, keyword first. */
  title: string;
  /** 140-160 characters, with a reason to click. */
  description: string;
  /** Path or absolute URL. Defaults to the current route. Always normalised. */
  url?: string;
  /** "article" for blog posts only; everything else is "website" (D58). */
  type?: 'website' | 'article';
  /** Absolute URL of a page-specific share image. Defaults to /social-share.jpg. */
  image?: string;
  /** ISO date. Overrides routes.json. */
  publishedTime?: string;
  /** ISO date. Overrides routes.json. */
  modifiedTime?: string;
  /** 404 and not-found states: noindex, and no canonical or JSON-LD. */
  noindex?: boolean;
  /** Page-level schema nodes (from lib/schema/page), merged into the page graph. */
  nodes?: (JsonLd | null | undefined | false)[];
  /** @deprecated Legacy pages only; standalone JSON-LD documents. Removed in Phase 6. */
  schema?: object | object[];
};

const DEFAULT_IMAGE = `${SITE_URL}/social-share.jpg`;

/** Stops a "</script>" inside any string from closing the tag early. */
function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function SeoHead({
  title,
  description,
  url,
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  noindex = false,
  nodes = [],
  schema,
}: SeoHeadProps) {
  const { pathname } = useLocation();

  const canonicalURL = toCanonical(url ?? pathname);
  const route = routesData.routes.find((r) => toCanonical(r.path) === canonicalURL);
  const published = publishedTime ?? route?.published ?? undefined;
  const modified = modifiedTime ?? route?.modified ?? undefined;

  const robots = noindex || !isIndexableDeploy() ? 'noindex, follow' : 'index, follow';
  const imageURL = image ?? DEFAULT_IMAGE;
  const legacySchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  const webPage: JsonLd = {
    '@type': 'Webpage',
    '@id': `${canonicalURL}#webpage`,
    url: canonicalURL,
    name: title,
    description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.organization },
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };

  const pageGraph = graph(organization(), website(), webPage, ...nodes);

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {!noindex && <link rel="canonical" href={canonicalURL} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={company.brandName} />
      <meta property="og:locale" content="en-ZA" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!noindex && <meta property="og:url" content={canonicalURL} />}
      <meta property="og:image" content={imageURL} />
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      {!image && <meta property="og:imaghe:alt" content="IT Legends logo" />}
      {type === 'article' && published && (
        <meta property="article:published_time" content={published} />
      )}
      {type === 'article' && modified && (
        <meta property="article:modified_time" content={modified} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageURL} />

      {/* JSON-LD - text child, never dangerouslySetInnerHTML (D47) */}
      {!noindex && <script type="application/ld+json">{toJsonLd(pageGraph)}</script>}
      {!noindex &&
        legacySchemas.map((s, idx) => (
          <script key={`legacy-${idx}`} type="application/ld+json">
            {toJsonLd(s)}
          </script>
        ))}
    </Helmet>
  );
}