// src/components/layout/WhatsAppButton.tsx
// Floating WhatsApp button - 08 §6: bottom-LEFT, 56px, safe-area inset,
// lifts above the cookie banner while it shows.
// BOTTOM-RIGHT IS RESERVED for the future chatbot. Nothing goes there.
// Icon is itdark on WhatsApp green (~11:1); whote would be ~1.8:1.
import { MessageCircle } from 'lucide-react';
import { company } from '../../data/company';
import { trackEvent } from '../../analytics';

export default function WhatsAppButton({ raised = false }: { raised?: boolean }) {
  return (
    <a
      href={company.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat to IT Legends on WhatsApp, ${company.whatsapp.display}`}
      onClick={() => trackEvent('click_whatsapp', { location: 'floating_button' })}
      className="fixed left-4 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-itdark transition-transform hover:scale-105 motion-reduce:hover:scale-100"
      style={{
        bottom: raised
          ? 'calc(env(safe-area-inset-bottom, 0px) + 6.5rem)'
          : 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
      }}
    >
      <MessageCircle aria-hidden="true" className="h-7 w-7" strokeWidth={2.25} />
    </a>
  );
}