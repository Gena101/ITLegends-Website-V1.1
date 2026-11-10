// src/components/layout/BackToTop.tsx
// Floating "back to top" button. Rendered once at the app root (not inside Layout), so no ancestor with
// backdrop-filter or transform can trap its fixed position. Hidden until the visitor scrolls one screen down.
// Scrolling uses the global CSS scroll-behavior: smooth normally, instant under prefers-reduced-motion.
// Sits below the header, cookie banner and mobile nav (z-40 < z-header 50 < z-overlay 60).
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../ui';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
    // The button hides at the top, so move focus to the main content rather than leave it on a hidden control.
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full sm:bottom-6 sm:right-6',
        'border border-white/10 bg-ink-800/95 text-fg-muted shadow-lg shadow-black/40',
        'transition-[opacity,transform,color,border-color] duration-300 hover:border-itblue/50 hover:text-white',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}