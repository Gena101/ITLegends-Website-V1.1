// src/lib/text.ts
// Small text helpers shared by pages and data files.

/** ["a","b","c"] → "a, b and c" */
export function joinList(items: readonly string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}