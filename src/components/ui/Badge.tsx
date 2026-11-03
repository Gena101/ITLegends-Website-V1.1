// src/components/ui/Badge.tsx
import type { ReactNode } from 'react';
import { cn } from './cn';

type BadgeTone = 'neutral' | 'blue' | 'red';

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-white/5 text-fg-muted ring-white/10',
  blue: 'bg-itblue/10 text-itblue-soft ring-itblue/25',
  red: 'bg-itred/10 text-itred-soft ring-itred/30',
};

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}