// src/entry-server.tsx
// Build-time only: renders a URL to HTML for scripts/prerender.mjs. Never shipped to browsers.
// No CSS imports here: styles come from the client build already linked in dist/index.html.
import { StrictMode, type ComponentProps } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Root } from './Root';
import { RenderStatusContext, type RenderStatus } from './render-status';
import { preloadRoute } from './routes';
import { company } from './data/company';

export { getPrerenderEntries } from './routes';
export { buildLlmsTxt } from './llms';
export const siteUrl = company.url;

/** Exactly the type HelmetProvider expects for `context` */
type HelmetContext = NonNullable<ComponentProps<typeof HelmetProvider>['context']>;

export interface RenderResult {
  html: string;
  head: string;
  status: number;
  /** Source file of the matched page (for modulepreload tags); undefined for the 404 page */
  pageFile?: string;
}

export async function render(url: string): Promise<RenderResult> {
  // Load the page module first: renderToString can't wait for React.lazy
  const pageFile = await preloadRoute(url);

  const helmetContext: HelmetContext = {};
  const status: RenderStatus = { code: 200 };

  const html = renderToString(
    <StrictMode>
      <RenderStatusContext.Provider value={status}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <Root />
          </StaticRouter>
        </HelmetProvider>
      </RenderStatusContext.Provider>
    </StrictMode>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script]
        .map((part) => part.toString())
        .filter(Boolean)
        .join('\n    ')
    : '';

  return { html, head, status: status.code, pageFile };
}