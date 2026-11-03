// src/components/layout/CookieBanner.tsx
// Rendered once at the app root (not inside Layout). Reopened via openCookieSettings().
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { disableAnalytics, initAnalytics } from '../../analytics';
import { OPEN_COOKIE_SETTINGS_EVENT, readConsent, writeConsent } from '../../consent';
import { Button } from '../ui';

// TODO Phase 5: point to /cookie-policy once that page exists
const POLICY_PATH = '/privacy-policy';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === 'accepted') initAnalytics();
    if (consent === null) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const accept = () => {
    writeConsent('accepted');
    initAnalytics();
    setVisible(false);
  };

  const decline = () => {
    writeConsent('declined');
    disableAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-header p-4 sm:p-6"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-panel border border-white/10 bg-ink-900/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-lg sm:flex sm:items-center sm:gap-6 sm:p-6">
        <p className="text-sm text-fg-muted">
          <span className="font-semibold text-white">Analytics cookies.</span> We'd like to use Google
          Analytics to see how visitors use this site. It only switches on if you accept.{' '}
          <Link
            to={POLICY_PATH}
            className="text-itblue-soft underline underline-offset-2 transition-colors hover:text-white"
          >
            Privacy and cookie policy
          </Link>
        </p>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <Button variant="secondary" onClick={decline} className="flex-1 sm:flex-none">
            Decline
          </Button>
          <Button onClick={accept} className="flex-1 sm:flex-none">
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}