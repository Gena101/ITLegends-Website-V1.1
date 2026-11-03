// src/analytics.ts
// GA4 loads only in production AND only after consent.

const GA_MEASUREMENT_ID = 'G-QFCYN911RS';

let hasInitialized = false;

/** Google's documented opt-out flag: window['ga-disable-<ID>'] = true stops all hits */
function setGaDisabled(disabled: boolean): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

export function initAnalytics(): void {
  if (import.meta.env.VITE_SITE_ENV !== 'production') return;

  setGaDisabled(false);
  if (hasInitialized) return;
  hasInitialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inline);
}

/** Consent withdrawn: stop sending hits for the rest of this visit */
export function disableAnalytics(): void {
  if (import.meta.env.VITE_SITE_ENV !== 'production') return;
  setGaDisabled(true);
}