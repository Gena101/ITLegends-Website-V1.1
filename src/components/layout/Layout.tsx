// src/components/layout/Layout.tsx
// Site shell. The header is fixed and overlays the page, so each page's first
// section adds `pt-header` (the home hero sits under the transparent nav on purpose).
// CookieBanner is NOT here: it renders once at the app root.
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalSchema } from '../seo';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  /** Omit when used as a layout route; falls back to <Outlet /> */
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <GlobalSchema />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-overlay focus:rounded-control focus:bg-itred focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </>
  );
}