// src/analytics.ts
// GA4 loads only in production AND only after consent.

export const GA_MEASUREMENT_ID = 'G-QFCYN911RS';

/** GA4's session cookie is named after the measurement ID without "G-" (listed in the cookie policy) */
export const GA_SESSION_COOKIE = `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, '')}`;

/** Remove _ga and _ga_<id> from this host and the parent domain (GA sets them on .itlegends.co.za) */
function deleteGaCookies(): void {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

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

/** Consent withdrawn: stop sending hits for the rest of this visit and delete the GA cookies */
export function disableAnalytics(): void {
  if (import.meta.env.VITE_SITE_ENV !== 'production') return;
  setGaDisabled(true);
  deleteGaCookies();
}