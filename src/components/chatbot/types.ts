/** Shared types for the Phase 1 widget shell.
 * 
 *  This file intentionally holds what the UI layer needs to render a
 *  dummy conversation and track open/close state. The conversation node
 *  schema (message | choice | input | consent | link | end) is introduced in
 *  Phase 2's engine/nodeTypes.ts and does NOT belong here.
 */

/** Who a chat bubble is attributed to. */
export type Sender = 'bot' | 'user';

/**
 * A single rendered chat bubble.
 * 
 * Per 03-CHATBOT-FLOWS.md section 1, a bot turn's 'text' field in an array
 * of strings (one per bubble). Phase 1's dummy conversation and Phase 2's
 * engine both flatten that into one Message per bubble rather than one
 * Message per turn, so ChatMessage.tsx never needs to know about multi-line
 * turns.
 */
export interface Message {
  /** Unique per message; used as the React list key. */
  id: string;
  sender: Sender;
  text: string;
  /** ISO 8601. Used for the small time label inder a bubble. */
  timestamp: string;
  /** True while the bot "typing" indicator should render instead of text. */
  isTyping?: boolean;
}

/**
 * Widget open/close state, persisted to sessionStorage so it survives
 * route changes (02-PROJECT-KNOWLEDGE.md section 7 - ame pattern
 * CookieBanner already uses for persistence). 
 */
export interface WidgetState {
  isOpen: boolean;
  /** Whether the 15s launcher teaser has already been shown/dismissed this session. */
  teaserDismissed: boolean;
}