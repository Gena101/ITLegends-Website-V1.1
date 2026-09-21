// src/lib/canonical.ts
// The one canonical-URL rule for the whole site (02 §3 URL CONVENTIONS):
// https, www, no query or hash, no trailing slash, root stays "/".
// Used by SeoHead, the schema builders and Breadcrumbs, so no call site can
// reintroduce a trailing slash (D01).
// Behaviour is identical to the version committed in SeoHead at 828b7ed.
import { SITE_URL } from '../data/company';

/** Normalises a path or absolute URL to the canonical absolute URL. */
export function toCanonical(input: string): string {
  let path = input || '/';

  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      path = '/';
    }
  }

  path = path.split(/[?#]/)[0];
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/+$/, '');

  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}