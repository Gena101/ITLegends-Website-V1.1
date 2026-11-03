// src/data/forms.ts
// Contact form settings. The webhook URL is public by nature (called from the browser).

export const CONTACT_WEBHOOK_URL = 'https://hook.us2.make.com/pt14ynlwgyio4c48iwruduu9curorf4a';

/** The value v1 sent for general enquiries; kept so existing Make.com routing still matches */
export const GENERAL_ENQUIRY = 'General Query';

/** Submissions faster than this after the form appears are treated as bots */
export const MIN_FILL_TIME_MS = 3000;