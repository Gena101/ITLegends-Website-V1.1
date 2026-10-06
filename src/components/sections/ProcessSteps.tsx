// src/components/sections/ProcessSteps.tsx
// A numbered process - 08 §7 HOME item 5 (onboarding) and SERVICE ("how it
// works" in Phase 4).
//
// A real <ol>. The old site rendered its "Our Process" sections as a grid of
// cards, which is <ol> content drawn as divs - AEO §2.5 names this exact
// case, and the site has zero <ol>elements today (D12). The visible numbers
// are decoration; the ordering is carried by the list itself.
//
// Steps come in as a prop: the onboarding sequence and a service's delivery
// steps are different content using the same structure.

export type ProcessStep = {
  /** Short imperative or noun phrase, e.g. "Free IT assessment". */
  title: string;
  /** One or two sentences. Include a real figure where there is one. */
  description: string;
};

type ProcessStepsProps = {
  steps: ProcessStep[];
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  intro?: string;
  className?: string;
};

export default function ProcessSteps({
  steps,
  as: Heading = 'h2',
  heading = 'How it works',
  headingId = 'process-heading',
  intro,
  className = '',
}: ProcessStepsProps) {
  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <ol className="mt-8 space-y-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 lg:gap-5">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-alt text-body font-bold text-itdark"
            >
              {index + 1}
            </span>
            <div className="flex-1 pt-1.5">
              <h3 className="text-h3 font-bold text-itdark">{step.title}</h3>
              <p className="mt-1.5 max-w-[65ch] text-body text-itdark">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}