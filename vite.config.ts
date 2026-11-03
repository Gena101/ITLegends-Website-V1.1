// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // public/ is copied once, by the client build; the server bundle only needs JS
    copyPublicDir: !isSsrBuild,
    // Client build only: dist/.vite/manifest.json maps each page to its chunk, so the prerender
    // can add <link rel="modulepreload"> per page. The prerender deletes it afterwards.
    manifest: !isSsrBuild,
  },
  ssr: {
    // Bundle these into the server build: their Node ESM entry points are unreliable
    noExternal: ['react-helmet-async', 'lucide-react'],
  },
}));