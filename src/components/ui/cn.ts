// src/components/ui/cn.ts
// Joins class names, skipping falsy values. Deliberately no tailwind-merge:
// it would mis-merge custom tokens like text-h1 (size) with text-white (colour).

export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}