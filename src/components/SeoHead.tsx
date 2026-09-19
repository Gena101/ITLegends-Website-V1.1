// src/components/SeoHead.tsx
// Owns every SEO tag in <head>: title, description, robots, canonical,
// Open Graph, Twitter and JSON-LD. index.html must not duplicate any of them.
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

type SeoHeadProps = {
  title: string;
  description: string;
  /** Path or absolute URL, e.g. "/" or "/services/managed-it-support".
   *  Normalised to https://www.itlegends.co.za with no trailing slash.
   *  If omitted, the current route is used. */
  url?: string;
  /** "website" or "article" */
  type?: 'website' | 'article';
  /** Absolute URL of the social preview image. Defaults to /social-share.jpg */
  image?: string;
  /** ISO 8601 with timezone, e.g. "2026-09-15T08:00:00+02:00" */
  publishedTime?: string;
  /** ISO 8601 with timezone, e.g. "2026-09-15T08:00:00+02:00" */
  modifiedTime?: string;
  /** Set true on 404 and "not found" states */
  noindex?: boolean;
  /** One or more JSON-LD schema objects */
  schema?: object | object[];
};

const BASE_URL = 'https://www.itlegends.co.za';
const SITE_NAME = 'IT Legends';
const DEFAULT_IMAGE = `${BASE_URL}/social-share.jpg`;

/** Canonical rule: https, www, no query or hash, no trailing slash (root stays "/"). */
function toCanonical(input: string): string {
  let path = input || '/';

  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = '/';
    }
  }

  path = path.split(/[?#]/)[0];
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/+$/, '');

  return path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
}

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
  schema,
}: SeoHeadProps) {
  const { pathname } = useLocation();

  const canonicalURL = toCanonical(url ?? pathname);
  const imageURL = image ?? DEFAULT_IMAGE;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={canonicalURL} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:image" content={imageURL} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageURL} />

      {/* JSON-LD: the JSON must be the script's text child, not
          dangerouslySetInnerHTML, or react-helmet-async drops the tag (D47) */}
      {schemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {toJsonLd(s)}
        </script>
      ))}
    </Helmet>
  );
}