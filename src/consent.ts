// src/consent.ts
// Cookie consent state. Same storage key as v1 so existing choices carry over.

export type ConsentValue = 'accepted' | 'declined';

const STORAGE_KEY = 'it_legends_cookie_consent';

/** Fired by the footer "Cookie settings" button to reopen the banner */
export const OPEN_COOKIE_SETTINGS_EVENT = 'itl:open-cookie-settings';

export function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    // Storage blocked: treat as no choice yet (banner shows)
    return null;
  }
}

export function writeConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: choice applies for this visit only
  }
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}