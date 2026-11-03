// src/components/seo/url.ts
import { company } from '../../data/company';

/** "/services/helpdesk/" → "/services/helpdesk"; strips query/hash; "/" stays "/" */
export function normalizePath(path: string): string {
  const [pathname] = path.split(/[?#]/);
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (clean.length > 1) clean = clean.replace(/\/+$/, '');
  return clean || '/';
}

/** Absolute, canonical-form URL. Absolute URLs pass through unchanged. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = normalizePath(pathOrUrl);
  return path === '/' ? `${company.url}/` : `${company.url}${path}`;
}