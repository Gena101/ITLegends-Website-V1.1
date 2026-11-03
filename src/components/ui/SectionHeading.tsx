// src/components/ui/SectionHeading.tsx
// One H1 per page: use as="h1" only in the page hero.
// For an H1, `intro` is the 40–60 word direct-answer paragraph (AEO).
import type { ReactNode } from 'react';
import { cn } from './cn';

type HeadingTag = 'h1' | 'h2' | 'h3';

interface SectionHeadingProps {
  title: ReactNode;
  as?: HeadingTag;
  /** Pass the same id to <Section labelledBy> */
  id?: string;
  /** Inline content only (rendered inside a <p>) */
  intro?: ReactNode;
  align?: 'left' | 'center';
  actions?: ReactNode;
  className?: string;
}

const sizes: Record<HeadingTag, string> = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
};

export function SectionHeading({
  title,
  as: Tag = 'h2',
  id,
  intro,
  align = 'left',
  actions,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <Tag id={id} className={sizes[Tag]}>
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lead text-fg-muted">{intro}</p>}
      {actions && (
        <div className={cn('mt-8 flex flex-wrap gap-3', centered && 'justify-center')}>{actions}</div>
      )}
    </div>
  );
}