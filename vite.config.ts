import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Netlify sets CONTEXT on every build: "production", "deploy-preview",
// "branch-deploy" or "dev". It is exposed to the app as
// import.meta.env.VITE_NETLIFY_CONTEXT so SeoHead can emit noindex on the
// staging branch deploy and on deploy previews.
// Unset locally, so a local build is indexable, like production.
// Production can never be noindexed by this: only "branch-deploy" and
// "deploy-preview" trigger it (see src/lib/env.ts).
const netlifyContext = process.env.CONTEXT ?? '';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_NETLIFY_CONTEXT': JSON.stringify(netlifyContext),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});