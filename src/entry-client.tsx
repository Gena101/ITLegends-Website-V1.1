// src/entry-client.tsx
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Root } from './Root';
import { preloadRoute } from './routes';

// Self-hosted variable fonts; the browser downloads only the Latin subsets it needs
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './font-fallbacks.css';
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

function mount() {
  // Prerendered pages arrive with markup inside #root → hydrate.
  // The dev server serves an empty #root (only a comment) → render fresh.
  if (container.firstElementChild) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}

// Load the current page's chunk BEFORE hydrating (it's already downloading via modulepreload),
// so the first render matches the prerendered HTML and nothing suspends.
// If it fails, mount anyway: React keeps the server HTML inside the Suspense boundary and retries.
preloadRoute(window.location.pathname)
  .catch((error: unknown) => console.error('Page module failed to load before hydration:', error))
  .then(mount);