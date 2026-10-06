// src/components/sections/FaqList.tsx
// Visible Q&A and the matching FAQPage schema - 08 §12, AEO §6, D03.
//
// D03 exists because seven pages carry FAQ schema with no visible counterpart.
// The fix is structural: the page passes ONE array to <FaqList> and to
// faqSchemaFor(), so the schema text and the page text are the same strings.
// Never build FAQ schema from anything but the array being rendered.
//
// DEVIATION FROM 08 §12, which says FaqList emits the schema itself: the
// JSON-LD has to join SeoHead's single @graph, and a component emitting its
// own <script> would produce a second, detached block. So the schema is built
// by the exported helper and passed through SeoHead's `nodes`. One source of
// truth either way.
//
// <details>/<summary>: the answer text is in the HTML whether open or closed,
// so a crawler reads all of it, and the disclosure needs no JavaScript.
import { ChevronDown } from 'lucide-react';
import type { Faq } from '../../data/faqs';
import { faqPage } from '../../lib/schema/page';
import type { JsonLd } from '../../lib/schema/entities';

/** Build FAQPage schema from the SAME array passed to <FaqList>. */
export function faqSchemaFor(faqs: readonly Faq[]): JsonLd | null {
  return faqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));
}

type FaqListProps = {
  faqs: readonly Faq[];
  as?: 'h2' | 'h3';
  heading?: string;
  headingId?: string;
  intro?: string;
  /** Open the first item, so the pattern is obvious at a glance. */
  openFirst?: boolean;
  className?: string;
};

export default function FaqList({
  faqs,
  as: Heading = 'h2',
  heading = 'Common questions',
  headingId = 'faq-heading',
  intro,
  openFirst = true,
  className = '',
}: FaqListProps) {
  if (faqs.length === 0) return null;

  return (
    <div className={className}>
      <Heading id={headingId} className="text-h2 font-bold text-itdark lg:text-h2-lg">
        {heading}
      </Heading>

      {intro && <p className="mt-4 max-w-[65ch] text-body-lg text-itdark">{intro}</p>}

      <div className="mt-8 divide-y divide-border border-y border-border">
        {faqs.map((faq, index) => (
          <details
            key={faq.id}
            open={openFirst && index === 0}
            className="group py-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="text-h3 font-bold text-itdark">{faq.question}</h3>
              <ChevronDown
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <p className="mt-3 max-w-[70ch] text-body text-itdark">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}