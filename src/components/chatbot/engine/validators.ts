import type { ValidationRule } from './nodeTypes';

export type ValidationOutcome =
  | { readonly valid: true }
  | { readonly valid: false; readonly error: string };

// Defaults - sourced from 03-CHATBOT-FLOWS.md where the flow file specifies
// them (QUOTE_EMAIL, QUOTE_PHONE). minLength has no documented copy; the
// fallback below is a placeholder pending Phase 3 confirmation.
const DEFAULT_EMAIL_ERROR = "That doesn't look like a valid email - mind checking it?";
const DEFAULT_PHONE_ERROR = "That number doesn't look right - could you check it?";
const DEFAULT_MIN_LENGTH_ERROR = 'Could you add a bit more detail?';

// Reasonably strict without chasing full RFC 5322.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SA formats only: 0XX XXX XXXX (10 digits) or +27XX XXX XXXX (+27 + 9
// digits). Spaces and dashes are stripped before matching.
const SA_PHONE_PATTERN = /^(?:0\d{9}|\+27\d{9})$/;

function stripPhoneFormatting(value: string): string {
  return value.replace(/[\s-]/g, '');
}

export function validateEmail(value: string, errorText?: string): ValidationOutcome {
  const trimmed = value.trim();
  if (EMAIL_PATTERN.test(trimmed)) {
    return { valid: true };
  }
  return { valid: false, error: errorText ?? DEFAULT_EMAIL_ERROR };
}

export function validatePhone(value: string, errorText?: string): ValidationOutcome {
  const stripped = stripPhoneFormatting(value.trim());
  if (SA_PHONE_PATTERN.test(stripped)) {
    return { valid: true };
  }
  return { valid: false, error: errorText ?? DEFAULT_PHONE_ERROR };
}

export function validateMinLength(
  value: string,
  length: number,
  errorText?: string,
): ValidationOutcome {
  if (value.trim().length >= length) {
    return { valid: true };
  }
  return { valid: false, error: errorText ?? DEFAULT_MIN_LENGTH_ERROR };
}

/**
 * Single entry point used by useConversation.ts - dispatched on the node's
 * ValidationRule and applies the node's own errorText (if any) over the
 * default copy.
 */
export function validateInput(
  value: string,
  rule: ValidationRule,
  errorText?: string,
): ValidationOutcome {
  switch (rule.type) {
    case 'none':
      return { valid: true };
    case 'email':
      return validateEmail(value, errorText);
    case 'phone':
      return validatePhone(value, errorText);
    case 'minLength':
      return validateMinLength(value, rule.length, errorText);
  }
}