// src/components/sections/FaqList.tsx
// Native <details>: answers stay in the HTML (crawlable) while collapsed.
// Pair with faqSchema(sameArray) in the page's SeoHead.
import { Plus } from 'lucide-react';
import type { FaqItem } from '../../data/faqs';
import { cn } from '../ui';

interface FaqListProps {
  items: ReadonlyArray<FaqItem>;
  className?: string;
}

export function FaqList({ items, className }: FaqListProps) {
  return (
    <div className={cn('divide-y divide-white/10 border-y border-white/10', className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-white sm:text-lg">{item.question}</h3>
            <Plus
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-itblue-soft transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-6 pr-10 text-fg-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}