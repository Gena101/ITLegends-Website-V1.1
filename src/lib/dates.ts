// src/lib/dates.ts
// Date helpers for ISO dates stored in routes.json (YYYY-MM-DD).
// Parsed manually: new Date('YYYY-MM-DD') is UTC midnight and can render as
// the previous day in western time zones. Month names are explicit so the
// prerendered HTML and every browser produce identical text.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** "2025-11-30" -> "3 November 2025" (SA English). Returns null if not an ISO date. */
export function formatDate(iso: string): string | null {
  const m = ISO_DATE.exec(iso);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}