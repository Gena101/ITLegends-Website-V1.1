// src/data/industry-pages.ts
// Full content for each industry page, read by the IndustryPage template.
// Kept OUT of industries.ts on purpose: industries.ts ships in the main bundle (nav/footer),
// this file only ships in the industry-page chunk.
// Confirmed facts only (02-company-facts.md or supplied by Eugene, Nov 2026). Prices, plan names,
// radii and response times are interpolated from company.ts / pricing.ts, never typed into the copy.
// Rules: no client names, no "experience" claims, compliance = technical safeguards, never legal advice,
// and backups are never described as long-term record keeping (max retention is below legal retention periods).
import { company } from './company';
import type { FaqItem } from './faqs';
import type { IndustrySlug } from './industries';
import {
  cloudBackup,
  formatRand,
  getPlan,
  plans,
  projectTerms,
  siteVisitRadiusText,
  softwarePricing,
  VAT_NOTE,
  workspaceBackup,
} from './pricing';
import type { ServiceSlug } from './services';
import { joinList } from '../lib/text';

export interface IndustryProblem {
  title: string;
  text: string;
  /** The service that solves it; the card links there */
  service: ServiceSlug;
}

export interface IndustryPageContent {
  /** Full <title>, ≤ 60 characters (SeoHead warns in dev) */
  metaTitle: string;
  /** ≤ 160 characters */
  metaDescription: string;
  /** The page's H1 */
  headline: string;
  /** 40–60 word direct answer under the H1 (AEO); also the Service schema description */
  intro: string;
  /** Plural noun used in headings and schema audienceType, e.g. "accounting firms" */
  audience: string;
  /** "Where IT goes wrong for …": 4–6 problem cards, each linked to a service */
  problems: IndustryProblem[];
  /** Optional one-liner shown under the problem cards */
  note?: string;
  /** Industry software section */
  softwareTitle: string;
  software: string;
  /** Compliance section (1–2 paragraphs) */
  complianceTitle: string;
  compliance: string[];
  /** Visible FAQ list AND FAQPage schema (same array) */
  faqs: FaqItem[];
  /** 3–5 services shown as cards; also the Service schema's related offers */
  services: ServiceSlug[];
}

// ---------- Shared values ----------

const region = 'Johannesburg, Pretoria and the rest of Gauteng';
const completeCare = getPlan('complete').name;
const { criticalResponse } = company.support;
const backupPrice = formatRand(cloudBackup.pricePerDevice);
const maxRetentionDays = Math.max(...cloudBackup.retentionOptions.map((o) => o.days));

/** "Essential Care R449, Managed Care R699 and Complete Care R949" */
const planPrices = joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`));

const vendorLine = (systems: string) =>
  `${systems} ${systems.includes(' and ') ? 'are' : 'is'} supported by ${systems.includes(' and ') ? 'their vendors' : 'its vendor'}. On ${completeCare}, we deal with the vendor for you, so you make one call.`;

const backupLimits =
  `Cloud backups are kept for ${cloudBackup.includedRetentionDays} days as standard and up to ${maxRetentionDays} days on request. ` +
  'They protect your working files; they are not a replacement for your long-term record keeping.';

const costFaq = (audience: string): FaqItem => ({
  question: `How much does managed IT cost for ${audience}?`,
  answer:
    `Managed IT is priced per device (PC or laptop) per month: ${planPrices}, ${VAT_NOTE}. ` +
    `One plan covers all your devices. Cloud backup is ${backupPrice} per backed-up device per month. ` +
    'Hardware, software licences and installation projects are quoted separately.',
});

const popiaSafeguards =
  'multi-factor authentication, endpoint protection, patching, encrypted backups and staff awareness training';

// ---------- Pages ----------

export const industryPages: Record<IndustrySlug, IndustryPageContent> = {
  accounting: {
    metaTitle: 'IT Support for Accounting Firms in Gauteng | IT Legends',
    metaDescription:
      'Managed IT for accounting firms in Gauteng: support for the systems behind Sage and QuickBooks, fraud-resistant email, POPIA safeguards and SA cloud backup.',
    headline: 'IT support for accounting firms',
    intro:
      `IT Legends supports accounting firms across ${region} with managed IT, cybersecurity and cloud backup. ` +
      'We keep the computers, servers and access behind Sage and QuickBooks running, block phishing and banking-detail fraud at the mailbox, ' +
      "protect client data under POPIA, and make sure files can be restored when tax season can’t wait.",
    audience: 'accounting firms',
    problems: [
      {
        title: "Tax season can’t stop for a broken PC",
        text:
          'Deadlines leave no room for a dead laptop or a server that won’t start. Monitoring and patching catch problems early, ' +
          `and critical issues are acknowledged ${criticalResponse}.`,
        service: 'managed-it-support',
      },
      {
        title: 'Banking-detail and invoice fraud',
        text:
          'Fraudsters copy a client’s or supplier’s email and change the banking details. Email filtering, multi-factor authentication ' +
          'on every mailbox and staff awareness training help your team spot and stop fake requests.',
        service: 'cybersecurity',
      },
      {
        title: 'Ransomware',
        text:
          'One click can lock every client file. Endpoint protection, patching and backups that are locked against deletion ' +
          'give you a way back without paying a ransom.',
        service: 'cybersecurity',
      },
      {
        title: 'Sharing files with clients',
        text:
          'Statements and tax documents shouldn’t travel as email attachments. We set up sharing in Microsoft 365 or Google Workspace, ' +
          'with access you control.',
        service: 'cloud-backup',
      },
      {
        title: 'Working away from the office',
        text:
          'Staff at home or at a client’s office need the firm’s files, safely. We set up secure access with multi-factor authentication ' +
          'and support your team by phone, email and WhatsApp wherever they are.',
        service: 'helpdesk',
      },
      {
        title: 'Data files on one server or PC',
        text:
          'When the accounting data lives on one machine, one failure stops the firm. We back up the devices you choose to South African ' +
          'data centres, encrypted and locked against deletion, and test restores quarterly.',
        service: 'cloud-backup',
      },
    ],
    softwareTitle: 'Sage and QuickBooks',
    software:
      'We look after the computers, servers, network, user access and backups that Sage and QuickBooks run on. ' +
      vendorLine('Sage and QuickBooks'),
    complianceTitle: 'POPIA and client confidentiality',
    compliance: [
      'Your firm holds clients’ financial records, ID numbers and tax information. POPIA requires you to protect it, and your ' +
        'professional body (SAICA, SAIPA or IRBA) expects client confidentiality. We help with the technical safeguards: ' +
        `${popiaSafeguards}. We don’t give legal advice, so pair this with your own POPIA compliance process.`,
      backupLimits,
    ],
    faqs: [
      {
        question: 'Do you support Sage and QuickBooks?',
        answer:
          'We support the computers, servers, network, user access and backups that Sage and QuickBooks run on. ' +
          vendorLine('Sage and QuickBooks'),
      },
      {
        question: 'Can you protect our firm against banking-detail fraud?',
        answer:
          'We reduce the risk with email filtering, multi-factor authentication on every mailbox, endpoint protection and staff awareness ' +
          'training, so fake payment requests are more likely to be blocked or spotted. Always confirm changed banking details by phone ' +
          'on a number you already have.',
      },
      {
        question: 'How do you help accounting firms with POPIA?',
        answer:
          `We put the technical safeguards in place: ${popiaSafeguards}. We don’t give legal advice, so pair this with your own POPIA ` +
          'compliance process.',
      },
      costFaq('an accounting firm'),
    ],
    services: ['managed-it-support', 'cybersecurity', 'cloud-backup', 'helpdesk'],
  },

  insurance: {
    metaTitle: 'IT Support for Insurance Brokers in Gauteng | IT Legends',
    metaDescription:
      'Managed IT for insurance brokers in Gauteng: 3CX phones with call recording, protected mailboxes, POPIA safeguards and backup for client email and files.',
    headline: 'IT support for insurance brokers',
    intro:
      `IT Legends supports insurance brokers across ${region} with managed IT, cybersecurity and business phone systems. ` +
      'We set up 3CX phones with call recording, secure the mailboxes fraudsters target, protect policyholder data under POPIA, ' +
      'and keep brokers working in the office and on the road.',
    audience: 'insurance brokers',
    problems: [
      {
        title: 'Phishing and account takeover',
        text:
          'A broker’s mailbox holds policyholder details and payment conversations, which makes it a target. Email filtering, ' +
          'multi-factor authentication and staff awareness training keep attackers out.',
        service: 'cybersecurity',
      },
      {
        title: 'Phones and call recording',
        text:
          'We supply and set up 3CX VoIP phone systems with call recording, so client conversations are recorded and every broker ' +
          'has a working line.',
        service: 'hardware-network',
      },
      {
        title: 'Brokers on the road',
        text:
          'Laptops that leave the office need the same protection as the ones that stay. We secure and monitor them, and support ' +
          'brokers by phone, email and WhatsApp wherever they are.',
        service: 'helpdesk',
      },
      {
        title: 'Client email and files',
        text:
          `Microsoft 365 and Google Workspace backup keeps mail, OneDrive or Drive, calendars and contacts for ${workspaceBackup.includedRetentionDays} days, ` +
          'well beyond the built-in recycle bins.',
        service: 'cloud-backup',
      },
      {
        title: 'Downtime with clients waiting',
        text:
          'Automated monitoring and patching catch problems before they stop a broker mid-quote, and critical issues are acknowledged ' +
          `${criticalResponse}.`,
        service: 'managed-it-support',
      },
    ],
    note: 'We also assess damaged IT equipment and write damage reports for insurance claims.',
    softwareTitle: 'Phones and call recording',
    software:
      'We set up and support 3CX phone systems with call recording, plus the computers, Microsoft 365 or Google Workspace and ' +
      'network your brokers use every day.',
    complianceTitle: 'POPIA and FAIS',
    compliance: [
      'POPIA requires you to protect policyholder information, and FAIS expects you to keep records of the advice you give. ' +
        `We help with the technical side: ${popiaSafeguards}, plus call recording. We don’t give legal or compliance advice.`,
      backupLimits,
    ],
    faqs: [
      {
        question: 'Do you set up call recording for insurance brokers?',
        answer:
          'Yes. We supply and set up 3CX VoIP phone systems with call recording, and support them as part of your IT. ' +
          'Phone systems are quoted after a site visit.',
      },
      {
        question: 'How do you help brokers with POPIA and FAIS?',
        answer:
          `We put the technical safeguards in place: ${popiaSafeguards}, plus call recording. We don’t give legal or compliance advice, ` +
          'and our backups don’t replace your record-keeping system.',
      },
      {
        question: 'Can you support brokers who work away from the office?',
        answer:
          'Yes. We secure laptops with multi-factor authentication and endpoint protection, monitor them wherever they are, and ' +
          'support your brokers by phone, email and WhatsApp during business hours.',
      },
      costFaq('an insurance broker'),
    ],
    services: ['managed-it-support', 'cybersecurity', 'hardware-network', 'cloud-backup'],
  },

  automotive: {
    metaTitle: 'IT Support for Panel Beaters & Workshops | IT Legends',
    metaDescription:
      'IT for panel beaters and workshops in Gauteng: computers for Audatex, TMS, Dr Smash and Vantage, workshop Wi-Fi, cabling, internet and job card software.',
    headline: 'IT support for panel beaters and workshops',
    intro:
      `IT Legends supports panel beaters and mechanical workshops across ${region} with managed IT, networks and connectivity. ` +
      'We keep the computers running Audatex, TMS, Dr Smash and Vantage working, get Wi-Fi and reliable internet onto the workshop ' +
      'floor for photo uploads to insurers, and build custom job card software.',
    audience: 'panel beaters and workshops',
    problems: [
      {
        title: 'Computers in a harsh workshop',
        text:
          'Dust, heat and grease are hard on PCs. We supply business-grade Dell, HP and Lenovo computers, and automated monitoring ' +
          'flags problems before they stop a job.',
        service: 'hardware-network',
      },
      {
        title: 'Wi-Fi across the workshop floor',
        text:
          'Diagnostic laptops and phones need a signal at every bay. We plan and install Wi-Fi access points to cover the office and the floor.',
        service: 'hardware-network',
      },
      {
        title: 'Cabling between office and workshop',
        text:
          'We run Cat6 cabling, or fibre between switches over longer distances, and test every cable pair by pair.',
        service: 'structured-cabling',
      },
      {
        title: 'Photo uploads to insurers',
        text:
          'Slow internet means slow approvals. We source fibre, fixed LTE, 5G or air fibre, and add a backup connection so work carries on ' +
          'when one line goes down.',
        service: 'business-connectivity',
      },
      {
        title: 'Job cards on paper',
        text:
          'We build custom job card and workshop management software at a fixed price agreed after scoping, and you own the code ' +
          'once the project is paid in full.',
        service: 'custom-software',
      },
    ],
    softwareTitle: 'Estimating and workshop systems',
    software:
      'We look after the computers and network that run Audatex, TMS, Dr Smash and Vantage, and the OEM diagnostic laptops on the ' +
      `workshop floor. ${vendorLine('Audatex, TMS, Dr Smash and Vantage')}`,
    complianceTitle: 'POPIA, approvals and accreditation',
    compliance: [
      'Customer and vehicle records fall under POPIA, and OEM and insurer approvals come with their own IT and data requirements. ' +
        `We help with the technical side: ${popiaSafeguards}. We don’t give legal advice.`,
      'For RMI and SAMBRA accreditation, the IT basics are a computer with internet, a digital camera or smartphone for photos, ' +
        'a colour printer and, optionally, a website. We can supply and set up the computer, internet connection and printer, and build the website.',
    ],
    faqs: [
      {
        question: 'Do you support Audatex, TMS, Dr Smash and Vantage?',
        answer:
          'We support the computers, network, user access and backups those systems run on. ' +
          vendorLine('Audatex, TMS, Dr Smash and Vantage'),
      },
      {
        question: 'What IT do I need for RMI or SAMBRA accreditation?',
        answer:
          'The IT basics are a computer with internet, a digital camera or smartphone for photos, a colour printer and, optionally, a website. ' +
          'We can supply and set up the computer, internet connection and printer, and build the website.',
      },
      {
        question: 'Can you build job card or workshop management software?',
        answer:
          'Yes. We build custom job card and workshop software. After scoping you get a fixed-price quote, a ' +
          `${softwarePricing.depositPercent}% deposit starts the build, and it’s delivered in milestones. You own the code and data once ` +
          'the project is paid in full.',
      },
      {
        question: 'Can you install Wi-Fi and cabling in our workshop?',
        answer:
          `Yes. Every job is quoted after a site visit, which is free within ${siteVisitRadiusText} of either branch. ` +
          `Installation work carries a ${projectTerms.workmanshipGuaranteeDays}-day workmanship guarantee.`,
      },
    ],
    services: ['managed-it-support', 'hardware-network', 'structured-cabling', 'business-connectivity', 'custom-software'],
  },
};