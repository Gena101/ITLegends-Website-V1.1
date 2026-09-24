// src/components/layout/Layout.tsx
// Page shell - 08 §5, §6.
// Legacy routes (routes.json `legacy: true`) render their own old nav and
// footer inside the .legacy wrapper, WITHOUT the new Header/Footer, so there
// is only ever one of each. The flag is removed in the phase that rebuilds
// the page, and that page then picks up the new chrome automatically.
import { useCallback, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import routesData from '../../data/routes.json';
import { toCanonical } from '../../lib/canonical';
import SkipLink from './SkipLink';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [cookieVisible, setCookieVisible] = useState(false);

  const path = new URL(toCanonical(pathname)).pathname;
  const route = routesData.routes.find((r) => r.path === path);
  const isLegacy = route?.legacy === true;

  const handleCookieVisibility = useCallback((visible: boolean) => setCookieVisible(visible), []);

  return (
    <>
      <SkipLink />
      <ScrollToTop />

      {!isLegacy && <Header />}

      <main id="main-content" className={isLegacy ? 'legacy' : ''}>
        {children}
      </main>

      {!isLegacy && <Footer />}

      <WhatsAppButton raised={cookieVisible} />
      <CookieBanner onVisibleChange={handleCookieVisibility} />
    </>
  );
}