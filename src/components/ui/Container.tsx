// src/components/ui/Container.tsx
import type { ReactNode } from 'react';
import { cn } from './cn';

type ContainerTag = 'div' | 'header' | 'footer' | 'nav' | 'section' | 'article';
export type ContainerWidth = 'default' | 'narrow' | 'wide';

interface ContainerProps {
  as?: ContainerTag;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}

const widths: Record<ContainerWidth, string> = {
  default: 'max-w-content',
  narrow: 'max-w-3xl',
  wide: 'max-w-[88rem]',
};

export function Container({ as: Tag = 'div', width = 'default', className, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', widths[width], className)}>
      {children}
    </Tag>
  );
}