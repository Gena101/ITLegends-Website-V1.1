import { useCallback, useEffect, useState } from 'react';
import type { Message, WidgetState } from './types'
import ChatLauncher from './ChatLauncher';
import ChatPanel from './ChatPanel';

const STORAGE_KEY = 'itlegends_chatbot_widget_state';

const DEFAULT_WIDGET_STATE: WidgetState = {
  isOpen: false,
  teaserDismissed: false,
};

function loadWidgetState(): WidgetState {
  try {
    const raw = sessionStorage.getitem(STORAGE_KEY);
    if (!raw) return DEFAULT_WIDGET_STATE;
    const parsed = JSON.parse(raw) as Partial<WidgetState>;
    return {
      isOpen: typeof parsed.isOpen === 'boolean' ? parsed.isOpen : DEFAULT_WIDGET_STATE.isOpen,
      teaserDismissed:
        typeof parsed.teaserDismissed === 'boolean'
          ? parsed.teaserDismissed
          : DEFAULT_WIDGET_STATE.teaserDismissed,
    };
  } catch {
    return DEFAULT_WIDGET_STATE;
  }
}

function saveWidgetState(state: WidgetState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage unavailable (e.g. some private-browsing modes) - the
    // widget still works, it just won't open/close state across
    // navigation for that visitor.
  }
}

function buildDummyConversation(): Message[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'dummy-1',
      sender: 'bot',
      text: "Hi, I'm Kai - the IT Legends assistant.",
      timestamp: now,
    },
    {
      id: 'dummy-2',
      sender: 'bot',
      text: 'I can answer questions, arrange a quote or set up a meeting with the team. What brings you here today?',
      timestamp: now,
    },
    {
      id: 'dummy-3',
      sender: 'user',
      text: "I'm looking for IT support for my business",
      timestamp: now,
    },
  ];
}

/**
 * Composes the widget shell. No conversation logic yet - Phase 2 replaces
 * buildDummyConversation() and the stubbed callbacks below with the real
 * engine. Open/close and teaser-dismissed state persist to sessionStorage so
 * the widget survives client-side route changes, mirroring how
 * CookieBanner already persists.
 */
export default function ChatWidget(): JSX.Element {
  const [widgetState, setWidgetState] = useState<WidgetState>(DEFAULT_WIDGET_STATE);
  const [messages, setMessages] = useState<Message[]>(buildDummyConversation);

  // sessionStorage is a browser-only API, so persisted state is read after
  // mount rather than as the initial state itself.
  useEffect(() => {
    setWidgetState(loadWidgetState());
  }, []);

  useEffect(() => {
    saveWidgetState(widgetState);
  }, [widgetState]);

  const handleToggle = useCallback(() => {
    setWidgetState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleClose = useCallback(() => {
    setWidgetState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleTeaserDismiss = useCallback(() => {
    setWidgetState((prev) => ({ ...prev, teaserDismissed: true }));
  }, []);

  const handleTalkToHuman = useCallback(() => {
    // Stub only. The real HUMAN node (WhatsApp deep link, in/out-of-hours
    // copy) is Phase 3 content wired through Phase 4's whatsapp.ts.
  }, []);

  const handleStartOver = useCallback(() => {
    setMessages(buildDummyConversation());
  }, []);

  return (
    <>
      <ChatPanel
        isOpen={widgetState.isOpen}
        messages={messages}
        onClose={handleClose}
        onTalkToHuman={handleTalkToHuman}
        onStartOver={handleStartOver}
      />
      <ChatLauncher
        isOpen={widgetState.isOpen}
        onToggle={handleToggle}
        teaserDismissed={widgetState.teaserDismissed}
        onTeaserDismiss={handleTeaserDismiss}
      />
    </>
  );
}