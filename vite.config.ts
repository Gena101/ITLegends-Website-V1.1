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
  },
  ssr: {
    // Bundle these into the server build: their Node ESM entry points are unreliable
    noExternal: ['react-helmet-async', 'lucide-react'],
  },
}));