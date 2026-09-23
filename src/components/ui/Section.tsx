// src/components/ui/Section.tsx
// <section> with aria-labelledby and standard spacing (08 §7, §8; D36).
// Pass the same `id` to <SectionHeading> so the label resolves.
// tone: light = white, alt = surface-alt, dark = itdark band (itsilver text).
import type { ReactNode } from 'react';
import Container from './Container';

type Tone = 'light' | 'alt' | 'dark';

const TONES: Record<Tone, string> = {
  light: 'bg-surface text-itdark',
  alt: 'bg-surface-alt text-itdark',
  dark: 'bg-itdark text-itsilver',
};

export default function Section({
  id,
  tone = 'light',
  labelled = true,
  className= '',
  children,
}: {
  /** Unique section id; the heading uses `${id}-heading`. */
  id: string;
  tone?: Tone;
  /** Set false only for a section with no heading; then add your own aria-label. */
  labelled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelled ? `${id}-heading` : undefined}
      className={`py-12 lg:py-20 ${TONES[tone]} ${className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
}