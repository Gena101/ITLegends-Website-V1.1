// src/data/legal/privacy.ts
// Privacy policy (POPIA). Only facts Eugene has confirmed; reviewed by an attorney: NO (Nov 2026).
// Processors confirmed Nov 2026: Netlify, Make (us2 region), Airtable, 1-Grid email (classic Outlook, IMAP),
// Google Analytics (consent only), WhatsApp. No marketing email. DPAs accepted for Make and Airtable.
import { branches, company, formatAddress } from '../company';
import { informationOfficer, operators, securityMeasures } from './shared';
import type { LegalDoc } from './types';

const io = `${informationOfficer.name} (${informationOfficer.title})`;
const email = `[${company.email}](mailto:${company.email})`;
const phone = `[${company.phone.display}](${company.phone.href})`;

export const privacyPolicy: LegalDoc = {
  title: 'Privacy policy',
  metaTitle: 'Privacy Policy | IT Legends',
  metaDescription:
    'How IT Legends collects, uses, shares and protects personal information under POPIA, how long we keep it, and how to contact our Information Officer.',
  intro:
    'This policy explains what personal information IT Legends collects through this website and in the course of our work, why we collect it, ' +
    'who we share it with, how long we keep it, and how you can exercise your rights under the Protection of Personal Information Act (POPIA).',
  lastUpdated: '2026-11-10',
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      blocks: [
        {
          kind: 'p',
          text:
            `${company.legalName} (registration number ${company.registrationNumber}) is the responsible party for the personal information described in this policy. ` +
            `You can reach us at ${email} or ${phone}.`,
        },
        { kind: 'list', items: branches.map((b) => `${b.name}: ${formatAddress(b.address)}`) },
      ],
    },
    {
      id: 'information-officer',
      heading: 'Information Officer',
      blocks: [
        {
          kind: 'p',
          text:
            `Our Information Officer is ${io}. registered with the Information Regulator under registration number ` +
            `${informationOfficer.registrationNumber}. Contact our Information Officer at ${email} or ${phone}` +
            'with any question about your personal information or to exercise your rights under POPIA.',
        },
      ],
    },
    {
      id: 'what-we-collect',
      heading: 'What we collect',
      blocks: [
        {
          kind: 'list',
          items: [
            'Enquiries through this website: your name, email address, phone number, company name, the service you are interested in, your message and the page you sent it from.',
            'When you contact us directly by phone, email or WhatsApp: your contact details and what you tell us.',
            'When you or your employer is a client: contact details of the people we deal with, billing and contract information, records of the work we do and our support communications.',
            'Website usage, only if you accept analytics cookies: pages visited, how you arrived, approximate location (city and country) and device and browser type, collected by Google Analytics.',
            'Technical logs: our hosting provider records IP addresses and browser details when pages are requested, to deliver and protect the website.',
          ],
        },
        {
          kind: 'p',
          text:
            'We do not ask for special personal information, such as health or religious information, and ask you not to send it to us.',
        },
      ],
    },
    {
      id: 'client-systems',
      heading: 'Information in our clients’ systems',
      blocks: [
        {
          kind: 'p',
          text:
            'When we provide managed IT, backup, website or software services, we may handle personal information that belongs to our clients, such as their staff and customer records. ' +
            'For that information, our client is the responsible party and IT Legends is an operator: we process it only on the client’s instructions and under our agreement with them, not under this policy.',
        },
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How we use it, and why we are allowed to',
      blocks: [
        {
          kind: 'table',
          head: ['Purpose', 'Lawful basis under POPIA'],
          rows: [
            ['Responding to your enquiry and sending quotations', 'You asked us to, as a step towards a contract'],
            ['Providing our services, support and billing', 'Our contract with you or your employer'],
            ['Keeping accounting, tax and company records', 'Obligations imposed by law'],
            ['Measuring how the website is used', 'Your consent (analytics cookies)'],
            ['Keeping our website and systems secure', 'Our legitimate interest in protecting them'],
          ],
        },
        {
          kind: 'p',
          text:
            'We do not send marketing emails or newsletters. If we start, we will ask for your consent first, and every message will let you opt out.',
        },
      ],
    },
    {
      id: 'sharing',
      heading: 'Who we share it with',
      blocks: [
        {
          kind: 'p',
          text: 'We use these service providers (operators) to run our website and handle enquiries:',
        },
        {
          kind: 'table',
          head: ['Provider', 'What they do', 'Where'],
          rows: operators.map((o) => [o.name, o.role, o.where]),
        },
        {
          kind: 'p',
          text:
            'We also share information with our accountant and auditors, our bank, network providers when we set up a connection you ordered, ' +
            'and authorities when the law requires it. We never sell personal information.',
        },
      ],
    },
    {
      id: 'cross-border',
      heading: 'Information sent outside South Africa',
      blocks: [
        {
          kind: 'p',
          text:
            'Some of the providers above store or process information outside South Africa, mainly in the United States. ' +
            'POPIA allows this when the recipient is bound by law, binding rules or an agreement that gives adequate protection, ' +
            'or when the transfer is needed for a contract with you or a request you made. ' +
            'We use providers whose terms include data protection commitments, and we have accepted the data processing agreements offered by Make and Airtable.',
        },
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      blocks: [
        {
          kind: 'table',
          head: ['Information', 'How long we keep it'],
          rows: [
            ['Website enquiries that do not lead to work', '12 months after our last contact, then deleted'],
            ['Contracts, quotations, invoices and accounting records', '7 years, as company and tax law requires'],
            ['Client support records (emails, WhatsApp messages, site reports)', 'For the contract and 3 years after it ends'],
            ['Google Analytics data', '14 months'],
            ['Your cookie choice', 'In your browser until you change it or clear your browser data'],
          ],
        },
        {
          kind: 'p',
          text: 'We may keep information longer where the law requires it or where it is needed for a legal claim.',
        },
      ],
    },
    {
      id: 'security',
      heading: 'How we protect it',
      blocks: [
        {
          kind: 'p',
          text:
            `We protect personal information with reasonable technical and organisational measures, as POPIA requires. ${securityMeasures}`,
        },
        {
          kind: 'p',
          text:
            'If we have reasonable grounds to believe your personal information has been accessed or acquired by someone without authority, ' +
            'we will notify you and the Information Regulator, as POPIA requires.',
        },
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      blocks: [
        {
          kind: 'list',
          items: [
            'Ask whether we hold personal information about you, and for a copy of it. The procedure and any prescribed fees are set out in our [PAIA manual](/paia).',
            'Ask us to correct or delete information that is inaccurate, out of date, incomplete or that we are no longer allowed to keep.',
            'Object to us processing your information on the basis of our legitimate interest.',
            'Withdraw your consent to analytics cookies at any time, using the Cookie settings link at the bottom of every page.',
            'Complain to the Information Regulator. Its current contact details are on the [Information Regulator website](https://inforegulator.org.za).',
          ],
        },
        {
          kind: 'p',
          text:
            `To exercise these rights, contact our Information Officer at ${email}. We may ask you to confirm your identity before we act on a request.`,
        },
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      blocks: [
        {
          kind: 'p',
          text:
            'This website remembers your cookie choice in your browser and, only if you accept, uses Google Analytics cookies. ' +
            'Our [cookie policy](/cookie-policy) explains them in detail.',
        },
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      blocks: [
        {
          kind: 'p',
          text: 'Our services are for businesses. We do not knowingly collect personal information about children.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        {
          kind: 'p',
          text: 'We update this policy when our practices change. The date at the top shows when it last changed.',
        },
      ],
    },
  ],
};