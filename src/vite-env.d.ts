/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Netlify build context, injected by the `define` block in vite.config.ts.
   * "production" | "deploy-preview" | "branch-deploy" | "dev" on Netlify;
   * "" in a local build. Read it only through src/lib/env.ts.
   */
  readonly VITE_NETLIFY_CONTEXT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}