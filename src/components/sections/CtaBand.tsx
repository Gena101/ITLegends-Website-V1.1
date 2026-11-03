// src/components/sections/CtaBand.tsx
import { MessageCircle, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { primaryCta } from '../../data/navigation';
import { Button, Section } from '../ui';

interface CtaBandProps {
  id?: string;
  title: string;
  text?: string;
  className?: string;
}

export function CtaBand({ id = 'cta', title, text, className }: CtaBandProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} className={className}>
      <div className="mesh-backdrop rounded-panel border border-white/10 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 id={headingId} className="mx-auto max-w-2xl text-h2">
          {title}
        </h2>
        {text && <p className="mx-auto mt-4 max-w-xl text-lead text-fg-muted">{text}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          <Button href={company.phone.href} variant="secondary" size="lg">
            <Phone aria-hidden="true" className="h-5 w-5" />
            {company.phone.display}
          </Button>
          <Button href={company.whatsapp} variant="ghost" size="lg">
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            WhatsApp us
          </Button>
        </div>
      </div>
    </Section>
  );
}