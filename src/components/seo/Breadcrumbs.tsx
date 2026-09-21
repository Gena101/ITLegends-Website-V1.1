// src/components/seo/Breadcrumbs.tsx
// Visible breadcrumb trail AND its BreadcrumbList JSON-LD, from one array,
// so schema always matches what is on the page (D16).
// Trail logic lives in lib/breadcrumbs.ts. Renders nothing when the trail
// has fewer than two crumbs (homepage, unknown URLs).
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { crumbsFor } from '../../lib/breadcrumbs';
import { breadcrumbList, type Crumb } from '../../lib/schema/page';

export default function Breadcrumbs({ crumbs }: { crumbs?: Crumb[] }) {
  const { pathname } = useLocation();
  const trail = crumbs ?? crumbsFor(pathname);
  if (trail.length < 2) return null;

  const last = trail.length - 1;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    ...breadcrumbList(trail),
  }).replace(/</g, '\\u003c');

  return (
    <>
      <Helmet>
        {/* Text child, never dangerouslySetInnerHTML (D47) */}
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="text-small text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {trail.map((c, i) => (
            <li key={c.path} className="flex min-w-0 items-center gap-1">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />}
              {i === last ? (
                <span aria-current="page" className="truncate">
                  {c.name}
                </span>
              ) : (
                <Link
                  to={c.path}
                  className="text-link underline underline-offset-2 hover:no-underline"
                >
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}