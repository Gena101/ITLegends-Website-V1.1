// src/analytics.ts
let hasInitialized = false;

const GA_MEASUREMENT_ID = 'G-QFCYN911RS';

export function initAnalytics() {
  if (import.meta.env.VITE_SITE_ENV !== "production") return;
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