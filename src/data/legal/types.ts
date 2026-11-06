// src/data/legal/types.ts
// Legal documents are data; LegalPage renders them. Text may contain links as [label](href):
// internal paths start with "/", everything else (https:, mailto:, tel:) is an external link.

export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] };

export interface LegalSection {
  /** Anchor, e.g. /privacy-policy#retention */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** H1 */
  title: string;
  /** <title> (max 60 characters) */
  metaTitle: string;
  /** Meta description (max 160 characters) */
  metaDescription: string;
  /** Plain-language summary under the H1 (40–60 words) */
  intro: string;
  /** "YYYY-MM-DD": change it whenever the content changes */
  lastUpdated: string;
  sections: LegalSection[];
}