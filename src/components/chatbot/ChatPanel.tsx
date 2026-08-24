import { useEffect, useRef, useState } from 'react';
import type { ChatInteraction, Message } from './types';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

interface ChatPanelProps {
  isOpen: boolean;
  messages: Message[];
  interaction: ChatInteraction;
  /** Changes only when the underlying node changes, so the input draft resets at
   * the right moments and not on every keystroke. */
  interactionKey: string;
  onClose: () => void;
  onTalkToHuman: () => void;
  onStartOver: () => void;
  onSelectOption: (index: number) => void;
  onSubmitInput: (value: string) => void;
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
  interaction,
  interactionKey,
  onClose,
  onTalkToHuman,
  onStartOver,
  onSelectOption,
  onSubmitInput,
}: ChatPanelProps): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  // Reset the draft only when the engine moves to a different node - keyed
  // on interactionKey rather than the messages array, which changes on
  // every keystroke's parent re-render too.
  useEffect(() => {
    setInputValue('');
  }, [interactionKey]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const hasMessages = messages.length > 0;
  const isTextInput = interaction.kind === 'input';

  function handleSubmit(): void {
    if (!isTextInput) return;
    onSubmitInput(inputValue);
  }

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
      {interaction.kind === 'choice' && (
        <div className="flex flex-col gap-2 border-t border-itgray2 px-4 py-3">
          {interaction.options.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelectOption(index)}
              className="min-h-[44px] rounded-xl border border-itblue/40 bg-itblue/10 px-4 py-2.5 text-left text-sm font-medium text-itsilver transition-colors duration-200 hover:border-itblue hover:bg-itblue/20"
            >
              {label}
            </button>
          ))}
        </div>
      )}

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

        {isTextInput && interaction.errorText && (
          <p role="alert" className="mb-2 text-xs text-itred">
            {interaction.errorText}
          </p>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            disabled={!isTextInput}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmit();
            }}
            placeholder={isTextInput ? interaction.placeholder : 'Type a message...'}
            aria-label={isTextInput ? interaction.placeholder : 'Message input (enabled once the bot asks a question)'}
            className="min-h-[44px] flex-1 rounded-full border border-itgray2 bg-itgray px-4 text-sm text-itsilver placeholder:text-itsilver/40 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled={!isTextInput}
            onClick={handleSubmit}
            aria-label="Send message"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-itblue text-white transition-colors duration:200 disabled:cursor-not-allowed disabled:bg-itgray2 disabled:text-itsilver/40"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
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