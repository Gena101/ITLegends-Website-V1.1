// src/entry-client.tsx
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Root } from './Root';

// Self-hosted variable fonts; the browser downloads only the Latin subsets it needs
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './index.css';

const container = document.getElementById('root') as HTMLElement;

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Prerendered pages arrive with markup inside #root → hydrate.
// The dev server serves an empty #root (only a comment) → render fresh.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}