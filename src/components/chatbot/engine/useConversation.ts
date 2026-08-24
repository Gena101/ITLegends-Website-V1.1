import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { Message, Sender } from '../types';
import type { ChatNode, CollectedData, FlowConfig, TranscriptEntry } from './nodeTypes';
import { applyPresets } from './presets';
import { validateInput } from './validators';

type ConversationStatus = 'revealing' | 'awaitingChoice' | 'awaitingInput' | 'idle';

// Typing delay: proportional to message length, capped 400-1200ms
// (04-ROADMAP.md Phase 2 design requirmenets).
const MIN_TYPING_DELAY_MS = 400;
const MAX_TYPING_DELAY_MS = 1200;
const MS_PER_CHARACTER = 20;

export function computeTypingDelay(text: string): number {
  const estimated = text.length * MS_PER_CHARACTER;
  return Math.min(MAX_TYPING_DELAY_MS, Math.max(MIN_TYPING_DELAY_MS, estimated));
}

let messageIdCounter = 0;
function makeMessageId(): string {
  messageIdCounter += 1;
  return `msg_${messageIdCounter}`;
}

interface ConversationState<NodeId extends string> {
  readonly currentNodeId: NodeId;
  readonly revealedCount: number;
  readonly epoch: number;
  readonly messages: readonly Message[];
  readonly collectedData: CollectedData;
  readonly transcript: readonly TranscriptEntry[];
  readonly isTyping: boolean;
  readonly status: ConversationStatus;
  readonly inputError: string | null;
}

type ConversationAction<NodeId extends string> =
  | { readonly type: 'ENTER_NODE'; readonly nodeId: NodeId }
  | { readonly type: 'SET_TYPING'; readonly isTyping: boolean }
  | { readonly type: 'REVEAL_BUBBLE'; readonly text: string }
  | { readonly type: 'FINISH_REVEAL'; readonly status: ConversationStatus }
  | { readonly type: 'SUBMIT_USER_TEXT'; readonly text: string; readonly field?: string; readonly presets?: CollectedData }
  | { readonly type: 'SET_INPUT_ERROR'; readonly error: string | null }
  | { readonly type: 'RESTART'; readonly nodeId: NodeId };

function createInitialState<NodeId extends string>(startNodeId: NodeId): ConversationState<NodeId> {
  return {
    currentNodeId: startNodeId,
    revealedCount: 0,
    epoch: 0,
    messages: [],
    collectedData: {},
    transcript: [],
    isTyping: false,
    status: 'revealing',
    inputError: null,
  };
}

function appendMessage(sender: Sender, text: string): Message {
  return { id: makeMessageId(), sender, text, timestamp: new Date().toISOString() };
}

function conversationReducer<NodeId extends string>(
  state: ConversationState<NodeId>,
  action: ConversationAction<NodeId>,
): ConversationState<NodeId> {
  switch (action.type) {
    case 'ENTER_NODE':
      return {
        ...state,
        currentNodeId: action.nodeId,
        revealedCount: 0,
        epoch: state.epoch + 1,
        isTyping: false,
        status: 'revealing',
        inputError: null,
      };
    case 'SET_TYPING':
      return { ...state, isTyping: action.isTyping };
    case 'REVEAL_BUBBLE': {
      const message = appendMessage('bot', action.text);
      return {
        ...state,
        revealedCount: state.revealedCount + 1,
        isTyping: false,
        messages: [...state.messages, message],
        transcript: [...state.transcript, { role: 'bot', text: action.text, t: message.timestamp }],
      };
    }
    case 'FINISH_REVEAL':
      return { ...state, status: action.status, isTyping: false };
    case 'SUBMIT_USER_TEXT': {
      const message = appendMessage('user', action.text);
      const withField = action.field
        ? { ...state.collectedData, [action.field]: action.text }
        : state.collectedData;
      return {
        ...state,
        messages: [...state.messages, message],
        transcript: [...state.transcript, { role: 'user', text: action.text, t: message.timestamp }],
        collectedData: applyPresets(withField, action.presets),
        inputError: null,
      };
    }
    case 'SET_INPUT_ERROR':
      return { ...state, inputError: action.error };
    case 'RESTART':
      return { ...createInitialState<NodeId>(action.nodeId), epoch: state.epoch + 1 };
    default:
      return state;
  }
}

export interface UseConversationOptions<NodeId extends string> {
  readonly flow: FlowConfig<NodeId>;
  readonly startNodeId: NodeId;
  /** Node to jump to on "Start Over" / "Show me the main menu" - WELCOME in the real flow. */
  readonly menuNodeId: NodeId;
  /** Fired once per node entry when that node declares an 'event'. GA4 dispatch is the caller's job (Phase 4). */
  readonly onEvent?: (eventName: string, node: ChatNode<NodeId>) => void;
  /** Overridable for tests; defaults to the capped length-based delay above. */
  readonly typingDelayMs?: (text: string) => number;
}

export interface UseConversationResult<NodeId extends string> {
  readonly currentNodeId: NodeId;
  readonly currentNode: ChatNode<NodeId>;
  readonly messages: readonly Message[];
  readonly collectedData: CollectedData;
  readonly transcript: readonly TranscriptEntry[];
  readonly isTyping: boolean;
  /** True while this node's bubbles are still being revealed - callers may want to disable input until false. */
  readonly isRevealing: boolean;
  readonly inputError: string | null;
  readonly awaitingInput: boolean;
  readonly awaitingChoice: boolean;
  readonly selectOption: (index: number) => void;
  readonly submitInput: (value: string) => void;
  readonly goTo: (nodeId: NodeId) => void;
  readonly restart: () => void;
  readonly backToMenu: () => void;
}

/**
 * Note: changing 'startNodeId'/'menuNodeId' after mount does not reset the
 * conversation - the reducer's lazy initializer only runs once. Call
 * restart() or remount with a new 'key' if the flow itself changes.
 */
export function useConversation<NodeId extends string>(
  options: UseConversationOptions<NodeId>,
): UseConversationResult<NodeId> {
  const { flow, startNodeId, menuNodeId, onEvent, typingDelayMs = computeTypingDelay } = options;

  const [state, dispatch] = useReducer(conversationReducer<NodeId>, startNodeId, createInitialState);

  const flowRef = useRef(flow);
  flowRef.current = flow;
  const typingDelayRef = useRef(typingDelayMs);
  typingDelayRef.current = typingDelayMs;
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const currentNode = flow[state.currentNodeId];

  // Fire onEvent once per node entry (including re-entries via restart, via 'epoch').
  useEffect(() => {
    const node = flowRef.current[state.currentNodeId];
    if (node.event) {
      onEventRef.current?.(node.event, node);
    }
  }, [state.currentNodeId, state.epoch]);

  // Reveal this node's bubbles one at a time, then resolve what happens next.
  useEffect(() => {
    const node = flowRef.current[state.currentNodeId];

    if (state.revealedCount < node.text.length) {
      dispatch({ type: 'SET_TYPING', isTyping: true });
      const nextText = node.text[state.revealedCount];
      const delay = typingDelayRef.current(nextText);
      const timer = setTimeout(() => {
        dispatch({ type: 'REVEAL_BUBBLE', text: nextText });
      }, delay);
      return () => clearTimeout(timer);
    }

    switch (node.type) {
      case 'message':
        dispatch({ type: 'ENTER_NODE', nodeId: node.next });
        return undefined;
      case 'link':
        if (node.next) {
          dispatch({ type: 'ENTER_NODE', nodeId: node.next });
        } else {
          dispatch({ type: 'FINISH_REVEAL', status: 'awaitingChoice' });
        }
        return undefined;
      case 'choice':
      case 'consent':
        dispatch({ type: 'FINISH_REVEAL', status: 'awaitingChoice' });
        return undefined;
      case 'input':
        dispatch({ type: 'FINISH_REVEAL', status: 'awaitingInput' });
        return undefined;
      case 'end':
        dispatch({ type: 'FINISH_REVEAL', status: 'idle' });
        return undefined;
    }
  }, [state.currentNodeId, state.revealedCount, state.epoch]);

  const goTo = useCallback((nodeId: NodeId) => {
    dispatch({ type: 'ENTER_NODE', nodeId });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART', nodeId: startNodeId });
  }, [startNodeId]);

  const backToMenu = useCallback(() => {
    dispatch({ type: 'ENTER_NODE', nodeId: menuNodeId });
  }, [menuNodeId]);

  const selectOption = useCallback(
    (index: number) => {
      const node = flowRef.current[state.currentNodeId];
      if (node.type !== 'choice' && node.type !== 'consent' && node.type !== 'link') return;

      const nodeOptions = node.options;
      if (!nodeOptions || index < 0 || index >= nodeOptions.length) return;

      const option = nodeOptions[index];
      const field = node.type === 'link' ? undefined : node.field;
      dispatch({ type: 'SUBMIT_USER_TEXT', text: option.label, field, presets: option.presets });
      dispatch({ type: 'ENTER_NODE', nodeId: option.next });
    },
    [state.currentNodeId],
  );

  const submitInput = useCallback(
    (value: string) => {
      const node = flowRef.current[state.currentNodeId];
      if (node.type !== 'input') return;

      const outcome = validateInput(value, node.validation, node.errorText);
      if (!outcome.valid) {
        dispatch({ type: 'SET_INPUT_ERROR', error: outcome.error });
        return;
      }
      dispatch({ type: 'SUBMIT_USER_TEXT', text: value.trim(), field: node.field });
      dispatch({ type: 'ENTER_NODE', nodeId: node.next });
    },
    [state.currentNodeId],
  );

  return {
    currentNodeId: state.currentNodeId,
    currentNode,
    messages: state.messages,
    collectedData: state.collectedData,
    transcript: state.transcript,
    isTyping: state.isTyping,
    isRevealing: state.status === 'revealing',
    inputError: state.inputError,
    awaitingInput: state.status === 'awaitingInput',
    awaitingChoice: state.status === 'awaitingChoice',
    selectOption,
    submitInput,
    goTo,
    restart,
    backToMenu,
  };
}