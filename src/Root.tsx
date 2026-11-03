// src/Root.tsx
// App root shared by the browser entry and the prerender (server) entry.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CookieBanner } from './components/layout';
import { AppRoutes } from './routes';

/** New page = start at the top (unless navigating to an #anchor) */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function Root() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      <CookieBanner />
    </>
  );
}