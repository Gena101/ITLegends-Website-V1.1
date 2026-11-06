// src/data/faq-page.ts
// /faq copy: every question, grouped by topic. FAQ page only (kept out of the shared bundle).
// The visible FAQs AND the FAQPage schema both come from faqCategories (never duplicate the text).
// Every price, term and radius is interpolated from pricing.ts / company.ts.
// Backup answers deliberately avoid "stored in South Africa" / "locked against deletion"
// (those claims live on the Cloud & Backup page until the backup chain test passes).

import { company } from './company';
import { openHoursText } from './contact-page';
import { homeFaqs, type FaqItem } from './faqs';
import {
  assessmentRadiusText,
  cloudBackup,
  contractTerms,
  formatRand,
  getPlan,
  onboarding,
  onsiteRadiusText,
  outOfScopeHourly,
  plans,
  projectTerms,
  siteVisitRadiusText,
  softwarePricing,
  VAT_NOTE,
  websitePricing,
  workspaceBackup,
} from './pricing';
import { servicePath } from './services';
import { countWord, joinList } from '../lib/text';

export interface FaqCategory {
  /** Anchor on /faq (e.g. /faq#managed-it) and prefix for the heading id */
  id: string;
  title: string;
  /** Pages with the full detail on this topic */
  links: { label: string; href: string }[];
  items: FaqItem[];
}

const managed = getPlan('managed');
const complete = getPlan('complete');
if (!complete.pricePerServer) throw new Error('Complete Care needs pricePerServer in pricing.ts');
const serverPrice = complete.pricePerServer;

const { criticalResponse, criticalAfterHours } = company.support;

/** "one a month on Essential Care, two a month on Managed Care and two a month on Complete Care" */
const visitsPerPlan = joinList(plans.map((p) => `${countWord(p.onsiteVisitsPerMonth)} a month on ${p.name}`));

export const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: 'About IT Legends',
    links: [
      { label: 'About IT Legends', href: '/about' },
      { label: 'All services', href: '/services' },
    ],
    items: homeFaqs,
  },
  {
    id: 'managed-it',
    title: 'Managed IT support and plans',
    links: [
      { label: 'Plans and pricing', href: '/pricing' },
      { label: 'Managed IT Support', href: servicePath('managed-it-support') },
    ],
    items: [
      {
        question: 'What is included in a managed IT plan?',
        answer:
          'Every plan includes a remote helpdesk by phone, email and WhatsApp during business hours, automated monitoring and alerts, ' +
          'operating system and third-party patching, Microsoft Defender set up and monitored, multi-factor authentication and staff awareness training. ' +
          `${managed.name} adds proactive maintenance, Webroot, email filtering, firewall management and monthly reporting. ` +
          `${complete.name} adds server care, quarterly security reviews, quarterly IT planning and disaster recovery planning. ` +
          `On-site visits are included: ${visitsPerPlan}, within ${onsiteRadiusText} of either branch.`,
      },
      {
        question: 'Do I have to sign a long contract?',
        answer:
          'No. You can choose month-to-month or a 12-month agreement. ' +
          `A 12-month agreement saves ${contractTerms.annualDiscountPercent}% on the total contract value and needs at least ` +
          `${contractTerms.annualMinDevices} devices; smaller setups can be arranged.`,
      },
      {
        question: 'Do you offer 24/7 IT support?',
        answer:
          'No. Automated monitoring of managed devices runs around the clock, and our team responds during business hours ' +
          `(${openHoursText}). We acknowledge critical issues ${criticalResponse}. ${criticalAfterHours}`,
      },
      {
        question: 'How do I get started with IT Legends?',
        answer:
          `Book a free IT assessment; it's free within ${assessmentRadiusText} of either branch. ` +
          `We send a written report within ${countWord(onboarding.reportBusinessDays)} business days, then recommend a plan and send a formal quotation. ` +
          'Once you accept and sign the service level agreement, we install our management agents within ' +
          `${countWord(onboarding.deploymentBusinessDays)} business days.`,
      },
      {
        question: 'Do phones and tablets count as devices?',
        answer:
          'No. Plans are priced per PC or laptop; phones and tablets are not counted. ' +
          `Servers are covered on ${complete.name} at ${formatRand(serverPrice)} per server per month (${VAT_NOTE}).`,
      },
      {
        question: 'What is not included in the managed IT plans?',
        answer:
          'Hardware, software licences, installation and development projects, and printer servicing are quoted separately. ' +
          `Other work outside your plan's scope is ${formatRand(outOfScopeHourly)} per hour (${VAT_NOTE}).`,
      },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    links: [{ label: 'Cybersecurity & Protection', href: servicePath('cybersecurity') }],
    items: [
      {
        question: 'Is my small business really a target for cybercriminals?',
        answer:
          'Yes. Most attacks are automated and aimed at whoever is easiest to get into, not only at big companies. ' +
          'Small businesses often have fewer defences, and one phishing email or reused password can be enough. ' +
          'That is why multi-factor authentication, patching and staff awareness matter as much as antivirus.',
      },
      {
        question: 'How can I protect my business from cyberattacks?',
        answer:
          'Start with the measures that stop most attacks: endpoint protection on every device, multi-factor authentication on email and other accounts, ' +
          'regular patching, email filtering, a firewall, backups kept off-site, and training staff to recognise phishing. ' +
          'IT Legends sets up and manages all of these; we usually deploy Webroot for endpoint protection.',
      },
      {
        question: 'What should I do if my business has been hacked?',
        answer:
          'Disconnect affected devices from the network (unplug the cable or turn off Wi-Fi), but do not switch them off or delete anything. ' +
          `Change passwords from a device you know is clean and call us on ${company.phone.display}. ` +
          `A suspected breach is a critical issue: we acknowledge it ${criticalResponse}. Do not pay a ransom before getting advice. ` +
          'If personal information may have been accessed, POPIA requires you to notify the Information Regulator and the people affected; ' +
          'we help with the technical side, not legal advice.',
      },
      {
        question: 'Can IT Legends help my business with POPIA?',
        answer:
          'Yes, with the technical safeguards: access control, multi-factor authentication, encryption, backups, patching and staff awareness. ' +
          'We do not give legal advice, so policies, consent and your Information Officer’s duties stay with you and your legal adviser.',
      },
    ],
  },
  {
    id: 'backup',
    title: 'Cloud and backup',
    links: [{ label: 'Cloud & Backup Solutions', href: servicePath('cloud-backup') }],
    items: [
      {
        question: 'How much does cloud backup cost?',
        answer:
          `Device and server backup is ${formatRand(cloudBackup.pricePerDevice)} per device per month, with ` +
          `${cloudBackup.includedStorageGbPerDevice} GB per device pooled across your site and ${cloudBackup.includedRetentionDays} days of retention. ` +
          `Microsoft 365 and Google Workspace backup is ${formatRand(workspaceBackup.pricePerUser)} per user per month, ` +
          `with ${workspaceBackup.includedRetentionDays} days of retention. All prices are ${VAT_NOTE}. ` +
          'Backup can be added to any managed IT plan or taken on its own.',
      },
      {
        question: 'What is the difference between cloud backup and cloud storage?',
        answer:
          'Cloud storage such as OneDrive, Google Drive or Dropbox is for working on and sharing files, and it syncs every change, ' +
          'including deletions and files scrambled by ransomware. Cloud backup keeps separate, dated copies of your data, ' +
          'so you can restore files or whole systems as they were before something went wrong.',
      },
      {
        question: 'Do Microsoft 365 and Google Workspace need a separate backup?',
        answer:
          'Yes. Microsoft and Google keep the service running, but deleted or overwritten data can only be recovered for a limited time from their recycle bins. ' +
          `A separate backup lets you restore mail, OneDrive or Drive files, calendars and contacts from up to ${workspaceBackup.includedRetentionDays} days back.`,
      },
      {
        question: 'How often is business data backed up?',
        answer:
          'At least daily, and close to real time for files that change constantly. ' +
          'We test restores every quarter, because a backup only counts if it can be restored.',
      },
      {
        question: 'Can you move us to Microsoft 365 or Google Workspace?',
        answer:
          'Yes. We migrate your email and files to Microsoft 365 or Google Workspace, set up the user accounts and mailboxes, ' +
          'and manage them for you as part of a managed IT plan.',
      },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Hardware, cabling and internet',
    links: [
      { label: 'Hardware & Network Setup', href: servicePath('hardware-network') },
      { label: 'Structured Cabling', href: servicePath('structured-cabling') },
      { label: 'Business Connectivity', href: servicePath('business-connectivity') },
    ],
    items: [
      {
        question: 'Can IT Legends supply business computers and laptops?',
        answer:
          'Yes. We supply Dell, HP and Lenovo computers and laptops, set up ready to work with user accounts, email and your business software, ' +
          'as well as switches, Wi-Fi access points, firewalls, printers, VoIP phones and UPS units.',
      },
      {
        question: 'How can I fix poor Wi-Fi in my office?',
        answer:
          'Weak office Wi-Fi usually comes from too few access points, poor placement, or a home router doing a business job. ' +
          'We look at your layout and how many devices connect, then install business Wi-Fi access points where they are needed, ' +
          'cabled back to your network where possible.',
      },
      {
        question: 'Does IT Legends install office network cabling?',
        answer:
          'Yes. We install Cat5e, Cat6 and Cat6a cabling, fibre uplinks between switches, cabinets and patch panels, and label everything. ' +
          'Every cable is tested pair by pair. ' +
          `Jobs are quoted after a site visit, which is free within ${siteVisitRadiusText} of either branch, ` +
          `and installation work carries a ${projectTerms.workmanshipGuaranteeDays}-day workmanship guarantee.`,
      },
      {
        question: 'What business internet options do you offer?',
        answer:
          'Fibre, fixed LTE, 5G, air fibre (fixed wireless) and microwave links from South African network providers, ' +
          'plus a backup connection that takes over if your main line fails. We check what is available at your address, install and set up the router, ' +
          'and we are your point of contact when the line goes down. Contracts are usually a minimum of 12 months, depending on the provider.',
      },
    ],
  },
  {
    id: 'websites-software',
    title: 'Websites and custom software',
    links: [
      { label: 'Website Design & Development', href: servicePath('website-design') },
      { label: 'Custom Software Development', href: servicePath('custom-software') },
    ],
    items: [
      {
        question: 'How much does a business website cost?',
        answer:
          `A basic website is ${formatRand(websitePricing.basicPrice)} (${VAT_NOTE}): up to ${countWord(websitePricing.basicMaxPages)} pages or sections, ` +
          'a contact form, WhatsApp button, Google Maps, mobile-friendly design and basic on-page SEO. ' +
          'Domain and hosting are not included. Larger sites and online stores are quoted at a fixed project price.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'A basic website usually takes about a month. The timeline depends on how quickly you send feedback and sign off the design, ' +
          `which includes up to ${countWord(websitePricing.revisionRounds)} rounds of revisions.`,
      },
      {
        question: 'Do you look after the website after it goes live?',
        answer:
          `Yes. Website management is ${formatRand(websitePricing.managementMonthly)} per month (${VAT_NOTE}): ` +
          'domain and hosting, monitoring, backups and bug fixes on existing features. New features are quoted separately.',
      },
      {
        question: 'How does custom software pricing work?',
        answer:
          'Each project is scoped with you, then quoted at a fixed price, not billed by the hour. ' +
          `A ${softwarePricing.depositPercent}% deposit starts the build, and the work is delivered in milestones. ` +
          'Once the project is paid in full, the code written for your project and all your data belong to your business. ' +
          `Ongoing support is ${formatRand(softwarePricing.supportMonthly)} per month (${VAT_NOTE}).`,
      },
    ],
  },
];

/** Every question on /faq, in page order (for the FAQPage schema) */
export const allFaqs: FaqItem[] = faqCategories.flatMap((c) => c.items);

// Duplicate questions would mean duplicate keys in FaqList and a repeated Question in the schema
const seen = new Set<string>();
for (const { question } of allFaqs) {
  if (seen.has(question)) throw new Error(`Duplicate question on /faq: ${question}`);
  seen.add(question);
}