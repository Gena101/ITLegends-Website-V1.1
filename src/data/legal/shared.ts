// src/data/legal/shared.ts
// Facts shared by the privacy policy and the PAIA manual, so the two can never disagree. Legal pages only.

export const informationOfficer = {
  name: 'Eugene Morton',
  title: 'Director',
} as const;

/** Service providers (operators) for the website and enquiries. Confirmed Nov 2026. */
export const operators: { name: string; role: string; where: string }[] = [
  { name: 'Netlify', role: 'Hosts and delivers this website', where: 'United States, with a global delivery network' },
  { name: 'Make', role: 'Routes contact form submissions', where: 'United States' },
  { name: 'Airtable', role: 'Stores contact form submissions', where: 'United States' },
  { name: '1-Grid', role: 'Hosts our email', where: 'South Africa' },
  { name: 'Google (Google Analytics)', role: 'Website statistics, only with your consent', where: 'United States' },
  { name: 'Meta (WhatsApp)', role: 'Messages you send us on WhatsApp', where: 'Outside South Africa' },
];

/** Security measures in place (confirmed Nov 2026). Add to this only what is actually true. */
export const securityMeasures =
  'Access is limited to the people who need it, our business accounts are protected with multi-factor authentication, ' +
  'and this website and its contact form use encrypted (HTTPS) connections.';