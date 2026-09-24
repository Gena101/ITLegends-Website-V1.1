// src/analytics.ts
// GA4 loader and event helper. Events (08 §6): click_tel, click_whatsapp,
// generate_lead, booking. trackEvent is a no-op until gtag has loaded, so it
// is always safe to call.
let hasInitialized = false;

const GA_MEASUREMENT_ID = 'G-QFCYN911RS';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (hasInitialized) return;
  if (!GA_MEASUREMENT_ID) return;

  hasInitialized = true;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inline  bootstrap for gtag
  const inline = document.createElement('script');
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inline);
}

export type GaEvent = 'click_tel' | 'click_whatsapp' | 'generate_lead' | 'booking';

/** Fires a GA4 event. Silently does nothing if gtag is not loaded. */
export function trackEvent(name: GaEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}