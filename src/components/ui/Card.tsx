// src/components/ui/Card.tsx
import type { ReactNode } from 'react';
import { cn } from './cn';

type CardTag = 'div' | 'article' | 'li';
type CardVariant = 'glass' | 'solid' | 'outline';
type CardPadding = 'none' | 'md' | 'lg';

interface CardProps {
  as?: CardTag;
  /** glass = translucent with blur (content cards over backdrops); solid = raised panel; outline = quiet */
  variant?: CardVariant;
  padding?: CardPadding;
  /** Hover/focus border highlight, for cards containing a link */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

const variants: Record<CardVariant, string> = {
  glass: 'glass',
  solid: 'border border-white/5 bg-ink-800',
  outline: 'border border-white/10',
};

const paddings: Record<CardPadding, string> = {
  none: '',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export function Card({
  as: Tag = 'div',
  variant = 'glass',
  padding = 'md',
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-card',
        variants[variant],
        paddings[padding],
        interactive && 'transition-colors duration-300 hover:border-itblue/40 focus-within:border-itblue/50',
        className,
      )}
    >
      {children}
    </Tag>
  );
}