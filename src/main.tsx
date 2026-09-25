// src/main.tsx
// Entry point. Routing, layout and Suspense all live in App.tsx; this file
// only mounts the tree and provides the Helmet context that SeoHead needs.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);