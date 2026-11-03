// src/components/ui/Section.tsx
import type { ReactNode } from 'react';
import { cn } from './cn';
import { Container, type ContainerWidth } from './Container';

interface SectionProps {
  id?: string;
  /** id of the section's heading, for aria-labelledby */
  labelledBy?: string;
  tone?: 'base' | 'raised';
  /** grid = subtle grid fading from the top edge (section breaks); mesh = animated brand gradient */
  backdrop?: 'none' | 'grid' | 'mesh';
  spacing?: 'default' | 'compact' | 'flush';
  /** hairline top border between sections */
  divider?: boolean;
  width?: ContainerWidth;
  /** wrap children in a Container (default true) */
  contained?: boolean;
  className?: string;
  children: ReactNode;
}

const tones = {
  base: 'bg-ink-950',
  raised: 'bg-ink-900',
} as const;

const spacings = {
  default: 'py-section',
  compact: 'py-12 sm:py-16',
  flush: '',
} as const;

export function Section({
  id,
  labelledBy,
  tone = 'base',
  backdrop = 'none',
  spacing = 'default',
  divider = false,
  width = 'default',
  contained = true,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative',
        tones[tone],
        spacings[spacing],
        divider && 'border-t border-white/5',
        backdrop === 'mesh' && 'mesh-backdrop',
        className,
      )}
    >
      {backdrop === 'grid' && (
        <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-96" />
      )}
      {contained ? (
        <Container width={width} className="relative">
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}