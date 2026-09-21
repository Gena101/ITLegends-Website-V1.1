// src/lib/breadcrumbs.ts
// Builds a breadcrumb trail for a path from routes.json. Pure logic, no React.
// Trail: Home -> real parent pages -> current page.
// Services and Industries have no index page, so they get no crumb.
// Location pages get the Gauteng hub as a parent once it exists (Phase 5).
// Empty for the homepage and for paths not in routes.json.
import routesData from '../data/routes.json';
import { toCanonical } from './canonical';
import type { Crumb } from './schema/page';

const HUB_PATH = '/it-support-gauteng';

function routeAt(path: string) {
  return routesData.routes.find((r) => r.path === path);
}

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