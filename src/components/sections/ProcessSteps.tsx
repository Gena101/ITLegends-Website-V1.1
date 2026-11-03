// src/components/sections/ProcessSteps.tsx
// Numbered steps joined by a blue→red "cable" line on desktop. Used on Home and service pages.
import { Reveal, Section, SectionHeading, cn } from '../ui';

interface Step {
  title: string;
  text: string;
}

interface ProcessStepsProps {
  id?: string;
  title: string;
  intro?: string;
  steps: ReadonlyArray<Step>;
  tone?: 'base' | 'raised';
  className?: string;
}

export function ProcessSteps({ id = 'process', title, intro, steps, tone = 'base', className }: ProcessStepsProps) {
  const headingId = `${id}-title`;
  const columns = steps.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <Section id={id} tone={tone} backdrop="grid" divider labelledBy={headingId} className={className}>
      <Reveal>
        <SectionHeading id={headingId} title={title} intro={intro} />
      </Reveal>
      <ol
        className={cn(
          'relative mt-14 grid gap-10 md:gap-6',
          columns,
          'md:before:absolute md:before:inset-x-0 md:before:top-5 md:before:h-px',
          'md:before:bg-gradient-to-r md:before:from-itblue/60 md:before:via-itblue/30 md:before:to-itred/50',
        )}
      >
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <Reveal delay={i * 0.1}>
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-itblue/50 bg-ink-950 font-display text-sm font-semibold tabular-nums text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}