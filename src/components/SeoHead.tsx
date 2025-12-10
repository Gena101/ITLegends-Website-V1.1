// src/components/SeoHead.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

type SeoHeadProps = {
    title: string;
    description: string;
    /** Path or full URL for this page, e.g. "/" or"/services/managed-it-support" */
    url?: string;
    /** "website" or "article" */
    type?: 'website' | 'article';
    /** Absolute URL to an image to use in social previews */
    image?: string;
    /** One or more JSON-LD schema objects */
    schema?: object | object[];
};

const BASE_URL = 'https://www.itlegends.co.za';

export default function SeoHead({
    title,
    description,
    url,
    type = 'website',
    image,
    schema,
}: SeoHeadProps) {
    const schemas = schema
      ? Array.isArray(schema)
        ? schema
        : [schema]
      : [];

    const canonicalURL = 
      url && url.startsWith('http')
        ? url
        : url
        ? `${BASE_URL}${url}`
        : undefined;

    return (
        <Helmet>
            {/* Basic SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}

            {/* OpenGraph (bonus) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {canonicalURL && <meta property="og:url" content={canonicalURL} />}
            <meta property="og:type" content={type} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter (bonus) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* JSON-LD structured data */}
            {schemas.map((s, idx) => (
                <script
                  key={idx}
                  type="application/ld+json"
                  // Google wants a raw JSON here
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
        </Helmet>
    );
}