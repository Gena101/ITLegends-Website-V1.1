// src/data/legal/cookies.ts
// Cookie policy. Matches the code: consent.ts (localStorage key) and analytics.ts (GA4, production + consent only).
// If a new cookie or tracker is ever added, it must be listed here first.
import { GA_SESSION_COOKIE } from '../../analytics';
import type { LegalDoc } from './types';

export const cookiePolicy: LegalDoc = {
  title: 'Cookie policy',
  metaTitle: 'Cookie Policy | IT Legends',
  metaDescription:
    'The cookies on the IT Legends website: one essential setting that remembers your choice, and Google Analytics only if you accept. How to change your choice.',
  intro:
    'This website uses as few cookies as possible: one setting that remembers your cookie choice, and Google Analytics cookies only if you accept them. ' +
    'This policy lists each one, what it does, how long it lasts and how to change your choice at any time.',
  lastUpdated: '2026-11-06',
  sections: [
    {
      id: 'what-cookies-are',
      heading: 'What cookies are',
      blocks: [
        {
          kind: 'p',
          text:
            'Cookies are small text files a website stores in your browser. Websites can also keep small amounts of information in your browser’s local storage. ' +
            'This policy covers both.',
        },
      ],
    },
    {
      id: 'what-we-use',
      heading: 'What this website uses',
      blocks: [
        {
          kind: 'table',
          head: ['Name', 'Type', 'What it does', 'How long'],
          rows: [
            [
              'it_legends_cookie_consent',
              'Essential (browser local storage)',
              'Remembers whether you accepted or declined analytics cookies, so we do not ask again on every page',
              'Until you change your choice or clear your browser data',
            ],
            ['_ga', 'Analytics, only with your consent', 'Google Analytics: tells visits by different browsers apart', '2 years'],
            [GA_SESSION_COOKIE, 'Analytics, only with your consent', 'Google Analytics: keeps track of the current visit', '2 years'],
          ],
        },
        {
          kind: 'p',
          text: 'We do not use advertising or social media cookies, and no other company sets cookies through this website.',
        },
      ],
    },
    {
      id: 'google-analytics',
      heading: 'Google Analytics',
      blocks: [
        {
          kind: 'p',
          text:
            'Google Analytics shows us which pages are visited, how people arrive and which device types they use, so we can improve the website. ' +
            'It only loads after you choose Accept in the cookie banner. Google processes this information outside South Africa, ' +
            'and we keep analytics data for 14 months. Our [privacy policy](/privacy-policy) has the details.',
        },
      ],
    },
    {
      id: 'your-choices',
      heading: 'Changing your choice',
      blocks: [
        {
          kind: 'p',
          text:
            'Use the Cookie settings link at the bottom of every page to change your choice at any time. ' +
            'If you withdraw consent, we stop Google Analytics straight away and delete its cookies from your browser.',
        },
        {
          kind: 'p',
          text:
            'You can also block or delete cookies in your browser settings. The website works fully without analytics cookies.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        {
          kind: 'p',
          text: 'We update this policy whenever the cookies on this website change. The date at the top shows when it last changed.',
        },
      ],
    },
  ],
};