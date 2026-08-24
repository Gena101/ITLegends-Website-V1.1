import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChatInteraction, Message, WidgetState } from './types';
import type { FlowConfig } from './engine/nodeTypes';
import { useConversation } from './engine/useConversation';
import ChatLauncher from './ChatLauncher';
import ChatPanel from './ChatPanel';

const STORAGE_KEY = 'itlegends_chatbot_widget_state';

const DEFAULT_WIDGET_STATE: WidgetState = {
  isOpen: false,
  teaserDismissed: false,
};

function loadWidgetState(): WidgetState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
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

/**
 * PHASE 2 SMOKE TEST ONLY. Exercise choice -> input (validation error, then
 * valid input) -> end. Deleted outright once Phase 3's flows/index.ts and
 * nodes.ts land - ChatWidget will import the real flow and NodeId union from
 * there instead.
 */
type SmokeNodeId = 'SMOKE_START' | 'SMOKE_NAME' | 'SMOKE_END';

const SMOKE_FLOWL: FlowConfig<SmokeNodeId> = {
  SMOKE_START: {
    id: 'SMOKE_START',
    type: 'choice',
    text: [
      "This is the Phase 2 engine smoke test - real content lands in Phase 3.",
      'Pick an option to continue.',
    ],
    options: [{ label: 'Continue', next: 'SMOKE_NAME' }],
  },
  SMOKE_NAME: {
    id: 'SMOKE_NAME',
    type: 'input',
    text: ['Type one character and send, to see a validation error - then try a real name.'],
    field: 'smoke_name',
    validation: { type: 'minLength', length: 2 },
    next: 'SMOKE_END',
  },
  SMOKE_END: {
    id: 'SMOKE_END',
    type: 'end',
    text: ['Engine works end to end. Phase 3 replaces this with the real flows.'],
  },
};

const INPUT_PLACEHOLDER = 'Type your answer...';

/**
 * Composes the widget shell around the Phase 2 conversation engine.
 * Open/close and teaser-dismissed state persist to sessionStorage so the
 * widget survives client-side route changes, mirroring how CookieBanner
 * already persists.
 */
export default function ChatWidget(): JSX.Element {
  const [widgetState, setWidgetState] = useState<WidgetState>(DEFAULT_WIDGET_STATE);

  // sessionStorage is a browser-only API, so persisted state is read after
  // mount rather than as the initial state itself.
  useEffect(() => {
    setWidgetState(loadWidgetState());
  }, []);

  useEffect(() => {
    saveWidgetState(widgetState);
  }, [widgetState]);

  const conversation = useConversation<SmokeNodeId>({
    flow: SMOKE_FLOWL,
    startNodeId: 'SMOKE_START',
    menuNodeId: 'SMOKE_START',
  });

  const displayMessages: Message[] = useMemo(() => {
    if (!conversation.isTyping) return [...conversation.messages];
    return [
      ...conversation.messages,
      {
        id: 'typing-indicator',
        sender: 'bot',
        text: '',
        timestamp: new Date().toISOString(),
        isTyping: true,
      },
    ];
  }, [conversation.messages, conversation.isTyping]);

  const interaction: ChatInteraction = useMemo(() => {
    if (conversation.awaitingChoice) {
      const node = conversation.currentNode;
      if (node.type === 'choice' || node.type === 'consent') {
        return { kind: 'choice', options: node.options.map((option) => option.label) };
      }
      if (node.type === 'link' && node.options) {
        return { kind: 'choice', options: node.options.map((option) => option.label) };
      }
    }
    if (conversation.awaitingInput) {
      return { kind: 'input', placeholder: INPUT_PLACEHOLDER, errorText: conversation.inputError };
    }
    return { kind: 'none' };
  }, [conversation.awaitingChoice, conversation.awaitingInput, conversation.currentNode, conversation.inputError]);

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
    conversation.restart();
  }, [conversation]);

  return (
    <>
      <ChatPanel
        isOpen={widgetState.isOpen}
        messages={displayMessages}
        interaction={interaction}
        interactionKey={conversation.currentNodeId}
        onClose={handleClose}
        onTalkToHuman={handleTalkToHuman}
        onStartOver={handleStartOver}
        onSelectOption={conversation.selectOption}
        onSubmitInput={conversation.submitInput}
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