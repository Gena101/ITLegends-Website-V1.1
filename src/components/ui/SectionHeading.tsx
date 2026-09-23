// src/components/ui/SectionHeading.tsx
// Heading for a <Section>. `id` must match the Section's id, so the
// rendered heading id is `${id}-heading` (08 §7).
// AEO §3: an H2 states a question or a clear claim; `intro` answers it in
// 2-3 sentences before the supporting detail.
import type { ReactNode } from 'react';

export default function SectionHeading({
  id,
  as: Tag = 'h2',
  intro,
  className = '',
  children,
}: {
  id: string;
  as?: 'h2' | 'h3';
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mb-8 max-w-prose ${className}`.trim()}>
      <Tag
        id={`${id}-heading`}
        className={Tag === 'h2' ? 'section-title' : 'text-h3 font-bold lg:text-h3-lg'}
      >
        {children}
      </Tag>
      {intro && <p className="mt-3">{intro}</p>}
    </div>
  );
}