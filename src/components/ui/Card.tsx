// src/components/ui/Card.tsx
// Bordered block - 08 §8 SHAPE: 10px radius, 1px border, no shadow or glow.
// Separation comes from the border, never elevation.
import type { ElementType, ReactNode } from 'react';

export default function Card({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`rounded-card border border-border bg-surface p-5 lg:p-6 ${className}`.trim()}>
      {children}
    </Tag>
  );
}