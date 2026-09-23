// src/components/ui/Badge.tsx
// Small label, e.g. the Most Popular pricing tier. Text stays itdark;
// itred is a fill colour only and never carries text on a light surface.
import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent';

const TONES: Record<Tone, string> = {
  neutral: 'border-border bg-surface-alt text-itdark',
  accent: 'border-transparent bg-itred text-white',
};

export default function Badge({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-btn border px-2.5 py-1 text-small font-bold ${TONES[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}