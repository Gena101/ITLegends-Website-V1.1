// src/render-status.ts
// Lets a page report the HTTP status it represents (e.g. 404) during prerendering.
import { createContext, useContext } from 'react';

export interface RenderStatus {
  code: number;
}

export const RenderStatusContext = createContext<RenderStatus | null>(null);

/** Records the status at build time. No-op in the browser (no provider). */
export function useRenderStatus(code: number): void {
  const ctx = useContext(RenderStatusContext);
  if (ctx) ctx.code = code;
}