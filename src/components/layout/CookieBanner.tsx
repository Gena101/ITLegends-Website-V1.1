// src/components/layout/CookieBanner.tsx
// Full-width fixed consent bar, z-[60] (08 §6). Never covers the WhatsApp
// button: it publishes its measured height as --whatsapp-offset, which
// WhatsAppButton uses. Measured, not assumed - at 375px this bar is roughly
// twice as tall as on desktop.
// Consent behaviour is unchanged: same storage key and values, analytics
// only loads after acceptance.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initAnalytics } from '../../analytics';
import Container from '../ui/Container';

const COOKIE_KEY = 'it_legends_cookie_consent'; // "accepted" | "declined"
const OFFSET_VAR = '--whatsapp-offset';
const NO_BANNER = 'env(safe-area-inset-bottom, 0px)';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

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

  // Publish the bar's real height so the WhatsApp button clears it
  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;

    if (!visible || !el) {
      root.style.setProperty(OFFSET_VAR, NO_BANNER);
      return;
    }

    const measure = () => root.style.setProperty(OFFSET_VAR, `${el.offsetHeight}px`);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure);
      root.style.setProperty(OFFSET_VAR, NO_BANNER);
    };
  }, [visible]);

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
      ref={barRef}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:item-center lg:justify-between">
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