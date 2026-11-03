// src/components/seo/GlobalSchema.tsx
// Organization + WebSite + both LocalBusiness branches, as one linked @graph.
// Rendered once, in Layout.
import { Helmet } from 'react-helmet-async';
import { globalSchemaGraph, serializeJsonLd } from './schema';

const graph = serializeJsonLd(globalSchemaGraph());

export function GlobalSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{graph}</script>
    </Helmet>
  );
}