// src/data/legal/paths.ts
// Routes for the legal pages. Kept separate (and tiny) so routes.tsx doesn't pull the documents into the main bundle.
// Add a path here when its document is added to legal/index.ts.
export const legalPaths = ['/privacy-policy', '/cookie-policy', '/terms', '/paia'] as const;

export type LegalPath = (typeof legalPaths)[number];