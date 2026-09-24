// src/components/layout/CookieBanner.tsx
// Full-width fixed consent bar, z-[60] (08 §6). Never covers the WhatsApp
// button: it reports visibility so Layout can raise it.
// Consent behaviour is unchanged from the previous banner: same storage key
// and values, analytics only loads after acceptance.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initAnalytics } from '../../analytics';
import Container from '../ui/Container';

const COOKIE_KEY = 'it_legends_cookie_consent'; // "accepted" | "declined"

export default function CookieBanner({
  onVisibleChange,
}: {
  onVisibleChange?: (visible: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        setVisible(true);
      } else if (stored === 'accepted') {
        initAnalytics();
      }
    } catch {
      // localStorage blocked: still ask
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    onVisibleChange?.(visible);
  }, [visible, onVisibleChange]);

  function choose(value: 'accepted' | 'declined') {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      // Ignore: the choice applies to this visit only
    }
    if (value === 'accepted') initAnalytics();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-prose text-small">
          We use essential cookies to run this site and optional analytics cookies to see how it
          is used. Read more in out{' '}
          <Link to="/privacy-policy" className="text-link underline underline-offset-2 hover:no-underline">
            privacy and cookie policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => choose('declined')} className="btn-secondary">
            Decline analytics
          </button>
          <button type="button" onClick={() => choose('accepted')} className="btn-primary">
            Accept analytics
          </button>
        </div>
      </Container>
    </div>
  );
}