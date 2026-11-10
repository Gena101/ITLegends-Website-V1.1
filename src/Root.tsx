// src/Root.tsx
// App root shared by the browser entry and the prerender (server) entry.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BackToTop, CookieBanner } from './components/layout';
import { AppRoutes } from './routes';

/** New page → top (instantly, not smooth). "/#contact" from another page → scroll to that section. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export function Root() {
  return (
    <>
      <ScrollManager />
      <AppRoutes />
      <BackToTop />
      <CookieBanner />
    </>
  );
}