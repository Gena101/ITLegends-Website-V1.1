// src/data/service-pages.ts
// Full content for each service page, read by the ServicePage template.
// Kept OUT of services.ts on purpose: services.ts is imported by the Navbar (main bundle),
// this file only ships in the service-page chunk.
// Confirmed facts only (02-company-facts.md or supplied by Eugene). Prices, terms and response
// times are interpolated from company.ts / pricing.ts, never typed into the copy.
import { company } from './company';
import type { FaqItem } from './faqs';
import {
  contractTerms,
  formatRand,
  getPlan,
  onboarding,
  onsite,
  plans,
  startingPrice,
  VAT_NOTE,
} from './pricing';
import type { ServiceSlug } from './services';

export interface ContentItem {
  title: string;
  text: string;
}

export interface ServicePageContent {
  /** ≤ 60 characters (SeoHead warns in dev) */
  metaTitle: string;
  /** ≤ 160 characters */
  metaDescription: string;
  /** The page's H1 */
  headline: string;
  /** 40–60 word direct answer under the H1 (AEO); also the Service schema description */
  intro: string;
  /** "What's included": 4–6 items */
  included: ContentItem[];
  /** "How it works": 3–4 steps */
  process: ContentItem[];
  /** Visible FAQ list AND FAQPage schema (same array) */
  faqs: FaqItem[];
  /** 2–3 related services, shown as cards */
  related: ServiceSlug[];
  /** Service schema areaServed; defaults to Gauteng */
  areaServed?: string[];
}

// ---------- Shared values ----------

const complete = getPlan('complete');
if (!complete.pricePerServer) throw new Error('Complete Care needs pricePerServer in pricing.ts');
const serverPrice = formatRand(complete.pricePerServer);
const fromPrice = formatRand(startingPrice);
const callout = formatRand(onsite.calloutFee);
const { standardResponse, criticalResponse, criticalAfterHours } = company.support;

const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
function countWord(n: number): string {
  return COUNT_WORDS[n] ?? String(n);
}

/** ["a","b","c"] → "a, b and c" */
function joinList(items: string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** "Essential Care includes one on-site visit a month; Managed Care and Complete Care include two" */
const onsiteVisits = (() => {
  const groups = new Map<number, string[]>();
  for (const plan of plans) {
    groups.set(plan.onsiteVisitsPerMonth, [...(groups.get(plan.onsiteVisitsPerMonth) ?? []), plan.name]);
  }
  return [...groups]
    .map(([count, names], i) => {
      const verb = names.length > 1 ? 'include' : 'includes';
      const unit = i === 0 ? ` on-site visit${count === 1 ? '' : 's'} a month` : '';
      return `${joinList(names)} ${verb} ${countWord(count)}${unit}`;
    })
    .join('; ');
})();

/** "Essential Care R449, Managed Care R699 and Complete Care R949" */
const planPrices = joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`));

const extraVisits =
  `Additional visits cost ${callout} per call-out (${VAT_NOTE}) within ${onsite.radiusKm} km of either branch, ` +
  'including the first hour of labour, and travel beyond that is charged per kilometre.';

/** Onboarding for every Managed IT service */
const managedOnboarding: ContentItem[] = [
  {
    title: 'Book a free IT assessment',
    text: `We agree a date to visit your office. The assessment is free within ${onboarding.freeAssessmentRadiusKm} km of either branch.`,
  },
  {
    title: 'Get your assessment report',
    text:
      `We assess your current IT setup and send you a written report within ${countWord(onboarding.reportBusinessDays)} business days. ` +
      'The report is yours to keep, whether or not you sign up.',
  },
  {
    title: 'Choose your plan',
    text: 'We talk you through the findings, recommend the plan that fits your business and send a formal quotation.',
  },
  {
    title: 'Go live',
    text:
      `Once you accept, we sign a service level agreement (SLA) and install our management agents on your devices within ${countWord(onboarding.deploymentBusinessDays)} business days. ` +
      'Support is active once the SLA is signed, the agents are installed and the first payment is received.',
  },
];

// ---------- Pages ----------

// Partial until all 10 services are written; then change to Record so TypeScript enforces completeness.
export const servicePages: Partial<Record<ServiceSlug, ServicePageContent>> = {
  'managed-it-support': {
    metaTitle: `Managed IT Support from ${fromPrice} per Device | IT Legends`,
    metaDescription:
      'Managed IT support for Gauteng SMEs: device monitoring, patching, helpdesk by phone, email and WhatsApp, ' +
      `and on-site visits. From ${fromPrice} per device, ${VAT_NOTE}.`,
    headline: 'Managed IT support for Gauteng businesses',
    intro:
      'IT Legends acts as your outsourced IT department. For a fixed monthly fee per device, we monitor and update your computers, ' +
      'help your staff by phone, email and WhatsApp, and visit on site when needed. ' +
      `Plans start at ${fromPrice} per device per month (${VAT_NOTE}), month-to-month or on a 12-month agreement.`,
    included: [
      {
        title: 'Monitoring and alerts',
        text: 'A lightweight agent on each managed device reports its health and update status around the clock and alerts us to problems, often before your team notices them.',
      },
      {
        title: 'Updates and patching',
        text: "We keep Windows, macOS and your business applications up to date on a schedule agreed with you, so updates don't interrupt working hours. Critical security patches go in sooner.",
      },
      {
        title: 'Helpdesk by phone, email and WhatsApp',
        text: `Your staff contact us whichever way suits them. We acknowledge standard requests ${standardResponse} and critical issues ${criticalResponse}.`,
      },
      {
        title: 'On-site visits included',
        text: `${onsiteVisits}, within ${onsite.radiusKm} km of either branch.`,
      },
      {
        title: 'Microsoft 365 and Google Workspace',
        text: 'We look after user accounts, mailboxes and day-to-day settings on the platforms your business already runs, on Windows and macOS.',
      },
      {
        title: 'One predictable monthly price',
        text: `You pay per device per month, month-to-month or on a 12-month agreement with ${contractTerms.annualDiscountPercent}% off. Servers are covered on ${complete.name} at ${serverPrice} per server per month.`,
      },
    ],
    process: managedOnboarding,
    faqs: [
      {
        question: 'How much does managed IT support cost?',
        answer:
          `${planPrices} per device per month, all ${VAT_NOTE}. ` +
          `A 12-month agreement gets ${contractTerms.annualDiscountPercent}% off the total contract value. ` +
          `Servers are covered on ${complete.name} at ${serverPrice} per server per month.`,
      },
      {
        question: 'Is on-site support included in the managed IT plans?',
        answer:
          `Yes. ${onsiteVisits}, within ${onsite.radiusKm} km of either branch. ${extraVisits} ` +
          'Extra visits can also be built into your plan at an agreed rate.',
      },
      {
        question: 'Do I have to sign a 12-month contract?',
        answer:
          'No. You can choose month-to-month or a 12-month agreement. ' +
          `A 12-month agreement gets ${contractTerms.annualDiscountPercent}% off the total contract value and needs at least ${contractTerms.annualMinDevices} devices. ` +
          'If you have fewer, we can agree a special arrangement.',
      },
      {
        question: 'How do we get started with IT Legends?',
        answer:
          `Book a free IT assessment (free within ${onboarding.freeAssessmentRadiusKm} km of either branch). ` +
          `You get a written report within ${countWord(onboarding.reportBusinessDays)} business days, which is yours to keep, then a recommended plan and a quotation. ` +
          `Once you accept, we sign an SLA and install our agents within ${countWord(onboarding.deploymentBusinessDays)} business days. ` +
          `Further away, a ${callout} call-out fee (${VAT_NOTE}) applies, credited against your first invoice if you sign a 12-month SLA.`,
      },
      {
        question: 'What happens if something goes wrong outside business hours?',
        answer: `Automated monitoring keeps running around the clock, and our team works during business hours. ${criticalAfterHours}`,
      },
    ],
    related: ['helpdesk', 'cybersecurity', 'cloud-backup'],
  },

  helpdesk: {
    metaTitle: 'IT Helpdesk & Remote Support for Businesses | IT Legends',
    metaDescription: `Remote IT helpdesk for Gauteng businesses. Reach us by phone, email or WhatsApp; standard requests are acknowledged ${standardResponse}.`,
    headline: 'IT helpdesk and remote assistance',
    intro:
      "The IT Legends helpdesk is your team's single point of contact for everyday IT problems. " +
      'Staff reach us by phone, email or WhatsApp, and we fix what we can remotely, from password resets and email problems to printers and software errors. ' +
      `We acknowledge standard requests ${standardResponse} and critical issues ${criticalResponse}.`,
    included: [
      {
        title: 'Phone, email and WhatsApp',
        text: 'No portal to learn: your staff contact us the way they already communicate, and we pick it up from there.',
      },
      {
        title: 'Secure remote sessions',
        text: 'With the user’s permission, a technician connects to their computer to see the problem and fix it while they watch, with no waiting for a visit.',
      },
      {
        title: 'Everyday problems covered',
        text: 'Password resets and account lockouts, email and Microsoft 365 or Google Workspace issues, printers, Wi-Fi and software installs.',
      },
      {
        title: 'Clear response times',
        text: `We acknowledge standard requests ${standardResponse} and critical issues ${criticalResponse}. These are times to acknowledge, not to resolve.`,
      },
      {
        title: 'On site when remote isn’t enough',
        text: `Managed IT plans include on-site visits within ${onsite.radiusKm} km of either branch; additional visits are charged per call-out.`,
      },
    ],
    process: [
      {
        title: 'Contact us',
        text: 'Call, email or WhatsApp us with who is affected, what happened and any error message.',
      },
      {
        title: 'We acknowledge it',
        text: `A technician acknowledges standard requests ${standardResponse} and critical issues ${criticalResponse}.`,
      },
      {
        title: 'We fix it remotely',
        text: 'Most everyday problems are solved in a secure remote session on the affected device.',
      },
      {
        title: 'On site if needed',
        text: 'If a problem needs hands-on work, we arrange a visit to your office.',
      },
    ],
    faqs: [
      {
        question: 'How do I log an IT support request?',
        answer:
          `Call or WhatsApp ${company.phone.display}, or email ${company.email}. ` +
          'Tell us who is affected, what you were doing and any error message you saw, and we take it from there.',
      },
      {
        question: 'How quickly does the IT Legends helpdesk respond?',
        answer:
          `We acknowledge standard requests ${standardResponse} and critical issues ${criticalResponse}. ${criticalAfterHours} ` +
          'These are times to acknowledge your request, not to fully resolve it.',
      },
      {
        question: 'What kinds of problems can the helpdesk fix?',
        answer:
          'Everyday IT problems such as password resets and account lockouts, email and Microsoft 365 or Google Workspace issues, ' +
          'printer and Wi-Fi problems, software installs and error messages, on Windows and macOS.',
      },
      {
        question: 'Can you fix IT problems without coming to our office?',
        answer:
          'Usually, yes. With your permission, a technician connects securely to the affected computer and fixes the problem remotely. ' +
          `If hands-on work is needed, managed IT plans include on-site visits within ${onsite.radiusKm} km of either branch.`,
      },
    ],
    related: ['managed-it-support', 'cybersecurity', 'hardware-network'],
  },

  cybersecurity: {
    metaTitle: 'Cybersecurity for Small Businesses in Gauteng | IT Legends',
    metaDescription:
      'Endpoint protection, email filtering, firewall management, MFA and staff training for SMEs in Johannesburg and Pretoria, plus help with POPIA safeguards.',
    headline: 'Cybersecurity and protection for SMEs',
    intro:
      'IT Legends protects small and medium businesses against ransomware, phishing and data theft with layered security: ' +
      'endpoint protection on every device, email filtering, firewall setup and management, multi-factor authentication and staff awareness training. ' +
      'We also help you put in place the technical safeguards that POPIA expects for personal information.',
    included: [
      {
        title: 'Endpoint protection',
        text: 'Business-grade protection against malware and ransomware on every computer, managed from one console. We usually deploy Webroot and can provide alternatives.',
      },
      {
        title: 'Email filtering',
        text: 'Phishing, spam and malicious attachments are filtered out before they reach your team’s inboxes.',
      },
      {
        title: 'Firewall setup and management',
        text: 'We configure and maintain the firewall that sits between your office network and the internet.',
      },
      {
        title: 'Multi-factor authentication',
        text: 'We set up MFA on email and business accounts, so a stolen password alone can’t open them.',
      },
      {
        title: 'Staff awareness training',
        text: 'Practical training that helps your team recognise phishing and scams, the way most attacks get in.',
      },
      {
        title: 'Help with POPIA safeguards',
        text: 'We help you put the technical security measures in place that POPIA expects for the personal information you hold.',
      },
    ],
    process: managedOnboarding,
    faqs: [
      {
        question: 'What does POPIA require for cybersecurity?',
        answer:
          'Section 19 of POPIA requires every business that processes personal information to secure it with appropriate, reasonable technical and organisational measures. ' +
          'IT Legends helps with the technical side, such as endpoint protection, email filtering, firewalls, MFA and staff training. ' +
          "We don't give legal advice, so pair this with your own POPIA compliance process.",
      },
      {
        question: 'Which antivirus or endpoint protection does IT Legends use?',
        answer:
          'We usually deploy Webroot business endpoint protection, managed from one console so we can see the protection status of every device. ' +
          'If your business has other requirements, we can provide alternatives.',
      },
      {
        question: 'How do you protect a business against phishing?',
        answer:
          'In layers. Email filtering removes many phishing emails before they reach inboxes, multi-factor authentication stops a stolen password from opening an account, ' +
          'and awareness training helps staff spot the messages that still get through.',
      },
      {
        question: 'What should we do if we think we have been hacked?',
        answer:
          "Disconnect the affected computer from the network, don't pay any ransom demand, and contact us straight away. " +
          `We treat a suspected breach as a critical issue, acknowledged ${criticalResponse}. ` +
          'If personal information may have been accessed, POPIA requires you to notify the Information Regulator and the affected people as soon as reasonably possible.',
      },
    ],
    related: ['managed-it-support', 'cloud-backup', 'helpdesk'],
  },

  'server-maintenance': {
    metaTitle: 'Server Maintenance & Monitoring in Gauteng | IT Legends',
    metaDescription:
      'Server monitoring, monthly patching and maintenance for Windows Server, Hyper-V and VMware, on-premises or in the cloud. ' +
      `${serverPrice} per server per month, ${VAT_NOTE}.`,
    headline: 'Server maintenance and monitoring',
    intro:
      'IT Legends keeps your business servers healthy and up to date. ' +
      'We monitor them around the clock, install patches every month on a pre-agreed date outside working hours, ' +
      'and look after Windows Server, Hyper-V and VMware, on-premises or in the cloud. ' +
      `Server care is part of ${complete.name} at ${serverPrice} per server per month (${VAT_NOTE}).`,
    included: [
      {
        title: 'Monitoring and alerts',
        text: 'An agent on each server reports its health and update status around the clock and alerts us to problems before they turn into downtime.',
      },
      {
        title: 'Monthly patching on a set date',
        text: 'Updates are installed every month on a date agreed with you, outside working hours. Critical security patches are applied sooner.',
      },
      {
        title: 'Windows Server',
        text: 'We maintain the Windows servers your business depends on, from file shares and user accounts to the applications your team runs every day.',
      },
      {
        title: 'Hyper-V and VMware',
        text: 'We look after virtualised servers as well as the hosts they run on.',
      },
      {
        title: 'On-premises and cloud',
        text: 'Whether your servers sit in your office or in the cloud, they get the same monitoring and maintenance.',
      },
      {
        title: 'Remote first, on site when needed',
        text: `Most maintenance is done remotely. When hands-on work is needed, we come to you; ${complete.name} includes on-site visits within ${onsite.radiusKm} km of either branch.`,
      },
    ],
    process: managedOnboarding,
    faqs: [
      {
        question: 'How much does server maintenance cost?',
        answer:
          `Server care is part of ${complete.name}: ${formatRand(complete.pricePerDevice)} per device plus ${serverPrice} per server per month, ${VAT_NOTE}. ` +
          `A 12-month agreement gets ${contractTerms.annualDiscountPercent}% off the total contract value.`,
      },
      {
        question: 'When do you install server updates?',
        answer:
          'Every month, on a date agreed with you and outside working hours, so updates never interrupt your team. ' +
          'Critical security patches are applied sooner.',
      },
      {
        question: 'Do you support virtualised and cloud servers?',
        answer:
          'Yes. IT Legends maintains Windows Server on physical machines, Hyper-V and VMware virtual machines and their hosts, and servers in the cloud.',
      },
      {
        question: 'What happens if a server fails?',
        answer:
          `A server outage is a critical issue, acknowledged ${criticalResponse}. ` +
          'We diagnose it remotely first and come on site when needed. If the server is backed up, we restore your systems and data from the backup.',
      },
    ],
    related: ['cloud-backup', 'managed-it-support', 'hardware-network'],
  },
};

export function getServicePage(slug: ServiceSlug): ServicePageContent | undefined {
  return servicePages[slug];
}