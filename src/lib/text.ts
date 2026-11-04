// src/lib/text.ts
// Small text helpers shared by pages and data files.

/** ["a","b","c"] → "a, b and c" */
export function joinList(items: readonly string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

/** 3 → "three" (falls back to digits above ten) */
export function countWord(n: number): string {
  return COUNT_WORDS[n] ?? String(n);
}