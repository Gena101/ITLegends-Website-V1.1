// src/lib/env.ts
// Build-context helpers. VITE_NETLIFY_CONTEXT is injected by vite.config.ts
// from Netlify's CONTEXT: "production" | "deploy-preview" | "branch-deploy"
// | "dev" on Netlify, "" locally.
//
// SAFETY: this is a DENY list. Only the two non-production contexts below are
// noindexed. Production, local builds and any unknown future value sta
// indexable, so the live site can never be noindexed by this code.
// Staging (https://staging--itlegendscoza.netlify.app) is a branch deploy.

const NOINDEX_CONTEXT: ReadonlySet<string> = new Set(['branch-deploy', 'deploy-preview']);

export const netlifyContext: string = import.meta.env.VITE_NETLIFY_CONTEXT ?? '';

/** False on the staging branch deploy and on deploy previews; true everywhere else. */
export function isIndexableDeploy(): boolean {
  return !NOINDEX_CONTEXT.has(netlifyContext);
}