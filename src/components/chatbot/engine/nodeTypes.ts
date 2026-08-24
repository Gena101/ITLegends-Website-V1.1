/**
 * Node schema for the Kai conversation engine (03-CHATBOT-FLOWS.md section 1).
 * NodeId is generic so each flow (the Phase 2 smoke test, the real Phase 3
 * flow) supplies its own strict union. A typo in a 'next' target then fails
 * the TypeScript build instead of failing silently at runtime.
 */

export type NodeType = 'message' | 'choice' | 'input' | 'consent' | 'link' | 'end';

/** A single selectable option on a choice, consent or link node. */
export interface ChatOption<NodeId extends string> {
  readonly label: string;
  readonly next: NodeId;
  /** Field values to seed into collectedData when this option is chosen - e.g.
   *  SERVICES_DEVs "project in mind" option presetting service=Software Development
   * before QUOTE_START is entered. */
  readonly presets?: CollectedData;
}

/** Validation rules available on input nodes. */
export type ValidationRule =
  | { readonly type: 'none' }
  | { readonly type: 'email' }
  | { readonly type: 'phone' }
  | { readonly type: 'minLength'; readonly length: number };

/** The single button rendered on a link node (e.g. WhatsApp, Calendly). */
export interface LinkButton {
  readonly label: string;
  /** Literal URL, or a token resolved by the caller (e.g. an env-derived wa.me link). */
  readonly href: string;
  /** Defaults to true - link nodes open in a new tab. */
  readonly external?: boolean;
}

interface BaseNode<NodeId extends string> {
  readonly id: NodeId;
  /** One string per chat bubble. */
  readonly text: readonly string[];
  /** Optional GA4 event name fired on entry - dispatched by the caller, not the engine. */
  readonly event?: string;
}

export interface MessageNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'message';
  readonly next: NodeId;
}

export interface ChoiceNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'choice';
  readonly options: readonly ChatOption<NodeId>[];
  /** Present when the chosen option's label should be recorded as collected data (e.g. QUOTE_START -> service). */
  readonly field?: string;
}

export interface InputNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'input';
  readonly field: string;
  readonly validation: ValidationRule;
  readonly next: NodeId;
  /** Overrides the default validator error copy - see 03-CHATBOT-FLOW.md. */
  readonly errorText?: string;
}

export interface ConsentNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'consent';
  readonly field: string;
  readonly options: readonly ChatOption<NodeId>[];
}

export interface LinkNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'link';
  readonly button: LinkButton;
  /** Auto-advance target (e.g. BOOK_CALENDLY -> BOOK_CONFIRM). */
  readonly next?: NodeId;
  /** Follow-up choices shown alongside the button (e.g. HUMAN's menu). */
  readonly options?: readonly ChatOption<NodeId>[];
}

export interface EndNode<NodeId extends string> extends BaseNode<NodeId> {
  readonly type: 'end';
}

export type ChatNode<NodeId extends string> =
  | MessageNode<NodeId>
  | ChoiceNode<NodeId>
  | InputNode<NodeId>
  | ConsentNode<NodeId>
  | LinkNode<NodeId>
  | EndNode<NodeId>;

/** A complete flow: every NodeId maps to exactly one node carrying that id. */
export type FlowConfig<NodeId extends string> = Readonly<Record<NodeId, ChatNode<NodeId>>>;

/** One flat object of every field collected so far, keyed by 'field'. */
export type CollectedData = Readonly<Record<string, string>>;

/** One entry per bot or user turn - shape matches the Make.com payload's transcript array (section 12). */
export interface TranscriptEntry {
  readonly role: 'bot' | 'user';
  readonly text: string;
  readonly t: string; // ISO 8601 timestamp
}

// --- Type guards, for narrowing in useConversation.ts and beyond -------

export function isMessageNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is MessageNode<NodeId> {
  return node.type === 'message';
}

export function isChoiceNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is ChoiceNode<NodeId> {
  return node.type === 'choice';
}

export function isInputNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is InputNode<NodeId> {
  return node.type === 'input';
}

export function isConsentNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is ConsentNode<NodeId> {
  return node.type === 'consent';
}

export function isLinkNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is LinkNode<NodeId> {
  return node.type === 'link';
}

export function isEndNode<NodeId extends string>(
  node: ChatNode<NodeId>,
): node is EndNode<NodeId> {
  return node.type === 'end';
}