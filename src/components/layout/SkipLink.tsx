// src/components/layout/SkipLink.tsx
// First focusable element on every page. Hidden until focused (08 §8
// ACCESSIBILITY). Targets #main-content, set by Layout on <main>.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-itdark focus:px-4 focus:py-3 focus:font-bold focus:text-white"
    >
      Skip to main content
    </a>
  );
}