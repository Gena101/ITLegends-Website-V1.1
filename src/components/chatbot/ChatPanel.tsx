import { useEffect, useRef } from 'react';
import type { Message } from './types';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

interface ChatPanelProps {
  isOpen: boolean;
  messages: Message[];
  onClose: () => void;
  onTalkToHuman: () => void;
  onStartOver: () => void;
}

/**
 * The panel container: header, scrollable message list, footer.
 * 
 * Desktop (sm and up): anchired bottom-right card, fixed size, capped well
 * short of full viewport height per the Phase 1 constraint.
 * Mobile (below sm): full-width bottom sheet.
 * 
 * Stays mounted at all times; isOpen toggles a transform/opacity transition
 * rather than conditional rendering, so the open/close animation has
 * something to animate between.
 * 
 * NOTE: full dialog semantics (focus trap, Escape-to-close, aria-live on new
 * messages) are Phase 6 accessibility work, not this phase. kept to a
 * landmark role + label for now rather than asserting modal behaviour the
 * widget doesn't have yet.
 */
export default function ChatPanel({
  isOpen,
  messages,
  onClose,
  onTalkToHuman,
  onStartOver,
}: ChatPanelProps): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const hasMessages = messages.length > 0;

  return(
    <div
      role="region"
      aria-label="Chat with Kai"
      aria-hidden={!isOpen}
      className={`fixed inset-x-0 bottom-0 z-[70] flex h-[85vh] max-h-[640px] w-full flex-col overflow-hidden rounded-t-2xl border border-itgray2 bg-itdark shadow-2xl transition-all duration-300 ease-out sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-140px)] sm:w-96 sm:rounded-2xl ${
        isOpen
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0 sm:translate-y-4'
      }`}
    >
      <ChatHeader onClose={onClose} onTalkToHuman={onTalkToHuman} />

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <footer className="border-t border-itgray2 px-4 py-3">
        {hasMessages && (
          <button
            type="button"
            onClick={onStartOver}
            className="mb-2 text-xs font-medium text-itsilver/70 underline-offset-2 hover:text-itsilver hover:underline"
          >
            Start over
          </button>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            disabled
            placeholder="Type a message..."
            aria-label="Message input (enabled in a later phase)"
            className="min-h-[44px] flex-1 rounded-full border border-itgray2 bg-itgray px-4 text-sm text-itsilver placeholder:text-itsilver/40 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            aria-label="Send message (enabled in a later phase)"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-itgray2 text-itsilver/40 disabled:cursor-not-allowed"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="curentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}