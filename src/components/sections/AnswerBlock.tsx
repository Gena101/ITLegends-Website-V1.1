// src/components/sections/AnswerBlock.tsx
// The direct-answer paragraph under every H1 - 04-AEO-PLAYBOOK §3, D53.
//
// It must answer the page's primary question on its own, naming IT Legends,
// the service and the geography, and containing at least one number. An
// answer engine lifts this paragraph out of the page with no surrounding
// context, so it has to survive being read alone.
//
// Plain text only, by design: no links or inline markup. A self-contained
// paragraph extracts cleanly and keeps the word count checkable.
//
// The dev warning is the enforcement. 40-60 words in the band: longer gets
// truncated, shorter gets ignored. Production ships without the check.
import { useEffect } from 'react';

const MIN_WORDS = 40;
const MAX_WORDS = 60;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

type AnswerBlockProps = {
  /** The answer paragraph, 40-60 words, with at least one specific figure. */
  text: string;
  /** Page path or name, so the dev warning says which page is wrong. */
  label?: string;
  className?: string;
};

export default function AnswerBlock({ text, label, className = '' }: AnswerBlockProps) {
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const words = countWords(text);
    if (words < MIN_WORDS || words > MAX_WORDS) {
      console.warn(
        `[AnswerBlock]${label ? ` ${label}:` : ''} ${words} words. ` +
          `AEO §3 requires ${MIN_WORDS}-${MAX_WORDS}. ` +
          (words < MIN_WORDS
            ? 'Too short - it will be passed over for a fuller answer elsewhere.'
            : 'Too long - it will be truncated mid-thought.'),
      );
    }
    if (!/\d/.test(text)) {
      console.warn(
        `[AnswerBlock]${label ? ` ${label}:` : ''} no number in the answer. ` +
          'AEO §2.2 - a passage with no concrete figure is not quoted.',
      );
    }
  }, [text, label]);

  return (
    <p className={`mt-5 max-w-[65ch] text-body-lg text-itdark ${className}`}>{text}</p>
  );
}