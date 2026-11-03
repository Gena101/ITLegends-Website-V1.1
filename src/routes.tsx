// src/routes.tsx
// THE route table. The router, the prerender script and sitemap.xml all read from here.
// Adding a page = one entry here. Dynamic paths must list their concrete URLs.
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import ManagedITSupportPage from './pages/ManagedITSupport';
import HardwareNetworkPage from './pages/HardwareNetwork';
import CybersecurityPage from './pages/Cybersecurity';
import CloudBackupPage from './pages/CloudBackup';
import ServerMaintenancePage from './pages/ServerMaintenance';
import HelpdeskPage from './pages/Helpdesk';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPost';
import FAQPage from './pages/FAQ';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import ITSupportRoodepoort from './pages/locations/ITSupportRoodepoort';
import ITSupportCenturion from './pages/locations/ITSupportCenturion';
import ITSupportMidrand from './pages/locations/ITSupportMidrand';
import ITSupportSandton from './pages/locations/ITSupportSandton';
import NotFound from './pages/NotFound';

import { blogPosts } from './data/blogPosts';

export interface AppRoute {
  path: string;
  element: ReactElement;
  /** Required for dynamic paths (containing ":"): every concrete URL to prerender */
  prerenderPaths?: string[];
  /** false = prerender but leave out of sitemap.xml (noindex pages) */
  sitemap?: boolean;
}

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },

  // Services (v1 pages until Phase 2)
  { path: '/services/managed-it-support', element: <ManagedITSupportPage /> },
  { path: '/services/helpdesk', element: <HelpdeskPage /> },
  { path: '/services/cybersecurity', element: <CybersecurityPage /> },
  { path: '/services/cloud-backup', element: <CloudBackupPage /> },
  { path: '/services/server-maintenance', element: <ServerMaintenancePage /> },
  { path: '/services/hardware-network', element: <HardwareNetworkPage /> },

  // Locations (v1 pages until Phase 4)
  { path: '/it-support-roodepoort', element: <ITSupportRoodepoort /> },
  { path: '/it-support-centurion', element: <ITSupportCenturion /> },
  { path: '/it-support-midrand', element: <ITSupportMidrand /> },
  { path: '/it-support-sandton', element: <ITSupportSandton /> },

  // Blog
  { path: '/blog', element: <BlogIndexPage /> },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
    prerenderPaths: blogPosts.map((post) => `/blog/${post.slug}`),
  },

  // Other
  { path: '/faq', element: <FAQPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
];

export function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export interface PrerenderEntry {
  path: string;
  sitemap: boolean;
}

/** Every concrete URL to prerender, in route-table order */
export function getPrerenderEntries(): PrerenderEntry[] {
  return appRoutes.flatMap((route) => {
    const isDynamic = route.path.includes(':');
    if (isDynamic && !route.prerenderPaths) {
      throw new Error(`Route "${route.path}" is dynamic but has no prerenderPaths`);
    }
    const paths = isDynamic ? route.prerenderPaths ?? [] : [route.path];
    return paths.map((path) => ({ path, sitemap: route.sitemap !== false }));
  });
}