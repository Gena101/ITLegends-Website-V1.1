// src/components/seo/Breadcrumbs.tsx
// Visible breadcrumb trail AND its BreadcrumbList JSON-LD, from one array,
// so schema always matches what is on the page (D16).
// Trail: Home -> real parent pages (from routes.json) -> currentpage.
// Services and Industries have no index page, so they get no crumb.
// Location pages get the Gauteng hub as a parent once it exists (Phase 5).
// Renders nothing on the homepage or on URLs not in routes.json.
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import routesData from '../../data/routes.json';
import { toCanonical } from '../../lib/canonical';
import { breadcrumbList, type Crumb } from '../../lib/schema/page';

const HUB_PATH = '/it-support-gauteng';

function routeAt(path: string) {
  return routesData.routes.find((r) => r.path === path);
}

/** Builds the trail for a path from routes.json. Empty for home or unknown paths. */
export function crumbsFor(rawPath: string): Crumb[] {
  const path = new URL(toCanonical(rawPath)).pathname;
  const current = routeAt(path);
  if (path === '/' || !current) return [];

  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }];

  if (current.template === 'location') {
    const hub = routeAt(HUB_PATH);
    if (hub) crumbs.push({ name: hub.label, path: HUB_PATH });
  }

  const segments = path.split('/').filter(Boolean);
  for (let i = 1; i < segments.length; i++) {
    const parentPath = `/${segments.slice(0, i).join('/')}`;
    const parent = routeAt(parentPath);
    if (parent) crumbs.push({ name: parent.label, path: parentPath });
  }

  crumbs.push({ name: current.label, path });
  return crumbs;
}

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