import { useEffect, useRef, useState } from 'react';

const TEASER_DELAY_MS = 15000
const TEASER_TEXT = 'Need help with IT? Ask me anything.';

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  teaserDismissed: boolean;
  onTeaserDismiss: () => void;
}

/**
 * Floating launcher button for the chat widget. Shows a one-time teaser
 * bubble 15s after mount (skipped entirely if already dismissed this
 * session - see ChatWidget.tsx for the sessionStorage read).
 */
export default function ChatLauncher({
  isOpen,
  onToggle,
  teaserDismissed,
  onTeaserDismiss,
}: ChatLauncherProps): JSX.Element | null {
  const [teaserVisible, setTeaserVisible] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (teaserDismissed || isOpen) {
      return undefined;
    }

    timerRef.current = setTimeout(() => {
      setTeaserVisible(true);
    }, TEASER_DELAY_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // Only ever runs once per mount unless dismissal state flips externally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teaserDismissed]);

  // Opening the chat supersedes the teaser - treat it as dismissal too.
  useEffect(() => {
    if (isOpen && teaserVisible) {
      setTeaserVisible(false);
      onTeaserDismiss();
    }
  }, [isOpen, teaserVisible, onTeaserDismiss]);

  const handleTeaserDismiss = (): void => {
    setTeaserVisible(false);
    onTeaserDismiss();
  };

  const handleLauncherClick = (): void => {
    if (teaserVisible) {
      setTeaserVisible(false);
      onTeaserDismiss();
    }
    onToggle();
  };

  // Hide the floating button entirely while the panel is open. The panel's
  // own header already has a close control, and on mobile the panel is a 
  // full-height bottom sheet anchored to the screen edge (bottom-0) - the
  // launcher's fixed bottom-6 position sits inside that sheet's footer,
  // covering the message input's send button. Hiding it removes the
  // overlap on every breakpoint rather than just repositioning it.
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3">
      {teaserVisible && !isOpen && (
        <div className="tech-glass flex max-w-[240px] items-start gap-2 rounded-2xl px-4 py-3 text-sm text-itsilver shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <p className="flex-1 leading-snug">{TEASER_TEXT}</p>
          <button
            type="button"
            onClick={handleTeaserDismiss}
            aria-label="Dismiss message"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-irsilver/70 transition-colors hover:text-itsilver"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleLauncherClick}
        aria-label={isOpen ? 'Close chat' : 'Open chat with Kai'}
        aria-expanded={isOpen}
        className="glow-blue relative flex h-14 w-14 items-center justify-center rounded-full bg-itblue text-white shadoe-lg transition-transform hover:scale-105 active:scale-95"
      >
        {!isOpen && !teaserVisible && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-itred opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rouunded-full bg-itred" />
          </span>
        )}

        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M66l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}