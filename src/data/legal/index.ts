// src/data/legal/index.ts
// Every legal document, keyed by its path (see paths.ts). Legal pages only.
import { cookiePolicy } from './cookies';
import { paiaManual } from './paia';
import type { LegalPath } from './paths';
import { privacyPolicy } from './privacy';
import { termsOfUse } from './terms';
import type { LegalDoc } from './types';

export const legalDocs: Record<LegalPath, LegalDoc> = {
  '/privacy-policy': privacyPolicy,
  '/cookie-policy': cookiePolicy,
  '/terms': termsOfUse,
  '/paia': paiaManual,
};

export function getLegalDoc(path: string): LegalDoc | undefined {
  return (legalDocs as Record<string, LegalDoc>)[path];
}

// Build-time checks
for (const [path, doc] of Object.entries(legalDocs)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(doc.lastUpdated)) throw new Error(`[legal] ${path}: lastUpdated must be YYYY-MM-DD`);
  if (doc.metaTitle.length > 60) throw new Error(`[legal] ${path}: metaTitle is ${doc.metaTitle.length} chars (max 60)`);
  if (doc.metaDescription.length > 160) {
    throw new Error(`[legal] ${path}: metaDescription is ${doc.metaDescription.length} chars (max 160)`);
  }
  const ids = doc.sections.map((s) => s.id);
  if (new Set(ids).size !== ids.length) throw new Error(`[legal] ${path}: duplicate section id`);
}