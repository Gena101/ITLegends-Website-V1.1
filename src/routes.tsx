// src/routes.tsx
// THE route table. The router, the prerender script and sitemap.xml all read from here.
// Adding a page = one entry here; `page` is the file under src/pages without ".tsx".
// Every page is its own JS chunk: the browser downloads only the page it's on.
import { Suspense, lazy, type ComponentType } from 'react';
import { Route, Routes, matchRoutes } from 'react-router-dom';

// NotFound stays in the main bundle: it must render for any unknown URL without a network round trip
import NotFound from './pages/NotFound';
import { servicePath, services } from './data/services';
import { industries, industryPath } from './data/industries';
import { locationPath, locations } from './data/locations';

type PageModule = { default: ComponentType };

// One lazily loaded chunk per page file (NotFound excluded, it's imported above)
const pageModules = import.meta.glob<PageModule>(['./pages/**/*.tsx', '!./pages/NotFound.tsx']);

export interface AppRoute {
  path: string;
  /** File under src/pages without ".tsx", e.g. "Home" or "ServicePage" */
  page: string;
  /**
   * Required for dynamic paths (containing ":"): resolves every concrete URL to prerender.
   * A function (with a dynamic import where needed) so heavy data stays out of the browser bundle.
   */
  prerenderPaths?: () => Promise<string[]>;
  /** false = prerender but leave out of sitemap.xml (noindex pages) */
  sitemap?: boolean;
}

export const appRoutes: AppRoute[] = [
  { path: '/', page: 'Home' },

  // Services: one hub + one data-driven template for all 10
  { path: '/services', page: 'ServicesHub' },
  {
    path: '/services/:slug',
    page: 'ServicePage',
    prerenderPaths: async () => services.map((s) => servicePath(s.slug)),
  },

  // Industries: one data-driven template
  {
    path: '/industries/:slug',
    page: 'IndustryPage',
    prerenderPaths: async () => industries.map((i) => industryPath(i.slug)),
  },

  // Company
  { path: '/pricing', page: 'Pricing' },
  { path: '/contact', page: 'Contact' },
  { path: '/about', page: 'About' },

  // Locations: one template, one route per area (/it-support-:slug isn't a valid router pattern)
  ...locations.map((l) => ({ path: locationPath(l.slug), page: 'LocationPage' })),

  // Blog
  { path: '/blog', page: 'BlogIndexPage' },
  {
    path: '/blog/:slug',
    page: 'BlogPost',
    prerenderPaths: async () => {
      const { blogPosts, blogPath } = await import('./data/blog');
      return blogPosts.map((post) => blogPath(post.slug));
    },
  },

  // Other
  { path: '/faq', page: 'FAQ' },
  { path: '/privacy-policy', page: 'PrivacyPolicy' },
];

interface PageHandle {
  /** Source path as Vite's build manifest names it, e.g. "src/pages/Home.tsx" */
  file: string;
  load: () => Promise<void>;
  Component: ComponentType;
}

/** One handle per page file, so routes sharing a template share one chunk */
const pageHandles = new Map<string, PageHandle>();

function getPage(name: string): PageHandle {
  const existing = pageHandles.get(name);
  if (existing) return existing;

  const importer = pageModules[`./pages/${name}.tsx`];
  if (!importer) throw new Error(`Route page "${name}" not found: expected src/pages/${name}.tsx`);

  let Loaded: ComponentType | undefined;
  const loadModule = () =>
    importer().then((mod) => {
      Loaded = mod.default;
      return mod;
    });
  const LazyPage = lazy(loadModule);

  // Module already loaded (prerender, first load after preloadRoute, revisits) → render it directly,
  // so server and client trees match. First client-side visit → React.lazy fetches the chunk while
  // the router (startTransition) keeps the previous page on screen.
  function Component() {
    const Page = Loaded;
    return Page ? <Page /> : <LazyPage />;
  }

  const handle: PageHandle = {
    file: `src/pages/${name}.tsx`,
    load: async () => {
      await loadModule();
    },
    Component,
  };
  pageHandles.set(name, handle);
  return handle;
}

// Resolve every page up front: a typo in `page` fails the build instead of a visitor's page view
appRoutes.forEach((route) => getPage(route.page));

/** Same order as appRoutes; matchRoutes returns these objects, indexOf maps back to the route */
const routeMatchers = appRoutes.map((route) => ({ path: route.path }));

/**
 * Loads the page module for a URL before the first render (prerender and hydration),
 * so nothing suspends and the HTML matches. Returns the page's source file, or undefined (404).
 */
export async function preloadRoute(pathname: string): Promise<string | undefined> {
  const match = matchRoutes(routeMatchers, pathname)?.[0];
  if (!match) return undefined;
  const page = getPage(appRoutes[routeMatchers.indexOf(match.route)].page);
  await page.load();
  return page.file;
}

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {appRoutes.map((route) => {
          const { Component } = getPage(route.page);
          return <Route key={route.path} path={route.path} element={<Component />} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export interface PrerenderEntry {
  path: string;
  sitemap: boolean;
}

/** Every concrete URL to prerender, in route-table order */
export async function getPrerenderEntries(): Promise<PrerenderEntry[]> {
  const groups = await Promise.all(
    appRoutes.map(async (route) => {
      const isDynamic = route.path.includes(':');
      if (isDynamic && !route.prerenderPaths) {
        throw new Error(`Route "${route.path}" is dynamic but has no prerenderPaths`);
      }
      const paths = isDynamic && route.prerenderPaths ? await route.prerenderPaths() : [route.path];
      return paths.map((path) => ({ path, sitemap: route.sitemap !== false }));
    }),
  );
  return groups.flat();
}