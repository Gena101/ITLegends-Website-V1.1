// src/components/three/HeroBackdrop.tsx
// Decorative hero background. Always renders the static SVG network (prerendered, instant).
// On capable desktop/tablet devices it lazy-loads the WebGL scene after the page is idle
// and fades it in. Place inside a `relative isolate overflow-hidden` section with reserved height.
import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../ui';
import { NetworkFallback } from './NetworkFallback';

const HeroScene = lazy(() => import('./HeroScene'));

/** WebGL failure of any kind → keep the SVG, never break the page */
class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type CapableNavigator = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function canRun3D(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia('(min-width: 768px)').matches) return false;

  const nav = navigator as CapableNavigator;
  if (nav.connection?.saveData) return false;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false;
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext(); // free the test context
    return true;
  } catch {
    return false;
  }
}

interface HeroBackdropProps {
  className?: string;
}

export function HeroBackdrop({ className }: HeroBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Decide after mount, then wait for idle so 3D never competes with LCP or input
  useEffect(() => {
    if (!canRun3D()) return;

    // Safari has no requestIdleCallback (TS's DOM types assume it always exists)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setEnabled(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  // Pause rendering whenever the hero is off-screen
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Brand glow under everything */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 50% at 72% 42%, rgb(0 123 255 / 0.16), transparent 70%),' +
            'radial-gradient(35% 35% at 88% 78%, rgb(199 0 57 / 0.12), transparent 70%)',
        }}
      />

      <NetworkFallback className={cn('transition-opacity duration-1000', ready && 'opacity-0')} />

      {enabled && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <div className={cn('absolute inset-0 transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0')}>
              <HeroScene active={visible} onReady={handleReady} />
            </div>
          </Suspense>
        </SceneErrorBoundary>
      )}

      {/* Scrims: keep hero text legible on the left, blend into the next section */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent lg:via-ink-950/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}