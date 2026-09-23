// src/components/ui/Container.tsx
// Page width - 08 §8 LAYOUT: max-w-6xl, px-5 mobile / px-8 desktop.
import type { ElementType, ReactNode } from 'react';

export default function Container({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${className}`.trim()}>{children}</Tag>;
}