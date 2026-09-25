// src/App.tsx
// Route table only - every route comes from src/data/routes.json, with one
// lazy import per page (D22, D38). To add a page: add it to routes.json,
// add one line to PAGES below, and add it to _redireccts and sitemap.xlm
// (npm run check:routes enforces the last two).
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routesData from './data/routes.json';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/NotFoundPage';

// `page` in route.json -> component. Legacy pages live in pages/legacy or
// their original folders until the phase that replaces them.
const PAGES: Record<string, LazyExoticComponent<ComponentType>> = {
  LegacyHome: lazy(() => import('./pages/legacy/LegacyHome')),
  ManagedITSupport: lazy(() => import('./pages/ManagedITSupport')),
  Cybersecurity: lazy(() => import('./pages/Cybersecurity')),
  CloudBackup: lazy(() => import('./pages/CloudBackup')),
  ServerMaintenance: lazy(() => import('./pages/ServerMaintenance')),
  Helpdesk: lazy(() => import('./pages/Helpdesk')),
  HardwareNetwork: lazy(() => import('./pages/HardwareNetwork')),
  ITSupportRoodepoort: lazy(() => import('./pages/locations/ITSupportRoodepoort')),
  ITSupportCenturion: lazy(() => import('./pages/locations/ITSupportCenturion')),
  ITSupportMidrand: lazy(() => import('./pages/locations/ITSupportMidrand')),
  ITSupportSandton: lazy(() => import('./pages/locations/ITSupportSandton')),
  FAQ: lazy(() => import('./pages/FAQ')),
  BlogIndex: lazy(() => import('./pages/BlogIndexPage')),
  BlogPost: lazy(() => import('./pages/BlogPost')),
  PrivacyPolicy: lazy(() => import('./pages/PrivacyPolicy')),
};

// Blog posts share one component, so they become a single :slug route.
// Their individual paths stay in routes.json for the sitemap and _redirects.
const ARTICLE_ROUTE = '/blog/:slug';

export default function App() {
  const pageRoutes = routesData.routes.filter((r) => r.template !== 'article');
  const hasArticles = routesData.routes.some((r) => r.template === 'article');
  const ArticlePage = PAGES.BlogPost;

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            {pageRoutes.map((route) => {
              const Page = PAGES[route.page];
              if (!Page) {
                console.warn(`No component registered for route ${route.path} (${route.page})`);
                return null;
              }
              return <Route key={route.path} path={route.path} element={<Page />} />;
            })}

            {hasArticles && <Route path={ARTICLE_ROUTE} element={<ArticlePage />} />}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}