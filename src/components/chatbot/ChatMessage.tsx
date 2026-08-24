import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

/** Formats an ISO 8601 timestamp as a 24-hour HH:MM label (SAST, no am/pm). */
function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/**
 * A single chat bubble - bot or user variant, plus the typing indicator.
 * 
 * One Message = one bubble (see types.ts note on why a multi-line bot turn
 * from 03-CHATBOT-FLOWS.md becomes multiple Message entries upstream, not a 
 * single bubble with line breaks).
 */
export default function ChatMessage({ message }: ChatMessageProps): JSX.Element {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
          isBot
            ? 'tech-glass rounded-tl-sm text-itsilver'
            : 'rounded-tr-sm bg-itblue text-blue'
        }`}
      >
        {message.isTyping ? (
          <span className="flex items-center gap-1 py-1" role="status" aria-label="Kai is typing">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-itsilver/70 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-itsilver/70 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-itsilver/70" />
          </span>
        ) : (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        )}
      </div>

      {!message.isTyping && (
        <span className="mt-1 px-1 text-[11px] text-itsilver/50">
          {formatTimestamp(message.timestamp)}
        </span>
      )}
    </div>
  );
}