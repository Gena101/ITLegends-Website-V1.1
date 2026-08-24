const BOT_NAME = 'Kai';

interface ChatHeaderProps {
  onClose: () => void;
  onTalkToHuman: () => void;
}

/**
 * Persistant panel header per 03-CHATBOT-FLOWS.md section 0 "PERSISTANT UI":
 * bot name, a live status pill, a "Talk to a human" button, and close.
 * 
 * The status pill is hard-coded "Online" for Phase 1. Real SAST business-hours
 * logic (Online / Closed - emergency only) lands in Phase 5's
 * businessHours.ts and will replace the hard-coded value here.
 * 
 * onTalkToHuman is a plain callback for now - it wires to the real HUMAN
 * node once the conversation engine exists (Phase 2/3). ChatWidget.tsx can
 * stub it with a no-op or a console.log until then.
 */
export default function ChatHeader({ onClose, onTalkToHuman }: ChatHeaderProps): JSX.Element {
  return (
    <header className="tech-glass flex items-center justify-between gap-3 rounded-t-2xl border-b border-itgray2 px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <h2 className="truncate font-semibold text-white">{BOT_NAME}</h2>
        <span className="flex items-center gap-1.5 rounded-full bg-itgray px-2.5 py-1 text-xs font-medium text-itsilver">
          <span className="h-1.5 w-1.5 rounded-full bg-itblue" aria-hidden="true" />
          Online
        </span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onTalkToHuman}
          className="btn-outline flex min-h-[44px] items-center whitespace-nowrap px-3 text-xs"
        >
          Talk to a human
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-itsilver transition-colors hover:bg-itgray hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </header>
  );
}