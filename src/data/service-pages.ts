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
  projectTerms,
  softwarePricing,
  startingPrice,
  VAT_NOTE,
  websitePricing,
} from './pricing';
import type { ServiceSlug } from './services';
import { countWord, joinList } from '../lib/text';
import { managedOnboarding } from './onboarding';

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

const freeSiteVisit = `free within ${projectTerms.freeSiteVisitRadiusKm} km of either branch`;

const workmanshipGuarantee =
  `Installation work carries a ${projectTerms.workmanshipGuaranteeDays}-day workmanship guarantee. ` +
  'It covers faults in our workmanship, not damage caused after installation, for example when another contractor moves or cuts a cable. ' +
  'Full terms are in your quotation.';

const basicWebsite = formatRand(websitePricing.basicPrice);
const websiteManagement = formatRand(websitePricing.managementMonthly);
const softwareSupport = formatRand(softwarePricing.supportMonthly);

// ---------- Pages ----------

// Record, not Partial: TypeScript fails the build if any service is missing its page content.
export const servicePages: Record<ServiceSlug, ServicePageContent> = {
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

  'cloud-backup': {
    metaTitle: 'Cloud Backup Stored in South Africa | IT Legends',
    metaDescription:
      'Encrypted, automated backups of Microsoft 365, Google Workspace, servers and PCs, stored in South Africa and restore-tested quarterly, plus disaster recovery.',
    headline: 'Cloud backup and disaster recovery',
    intro:
      'IT Legends backs up your Microsoft 365 or Google Workspace data, servers and computers automatically, at least once a day. ' +
      'Backups are encrypted before they leave your office, stored in South African data centres and locked against deletion, ' +
      'and we test restores every quarter. We also plan your disaster recovery and move email and files to the cloud.',
    included: [
      {
        title: 'Microsoft 365 and Google Workspace backup',
        text: 'Mail, OneDrive, SharePoint and Teams, or Gmail and Google Drive including shared drives, backed up separately from Microsoft and Google.',
      },
      {
        title: 'Servers and computers',
        text: 'Windows Server, Hyper-V and VMware virtual machines, Windows computers and files on Mac, backed up at least daily and more often for files that change constantly.',
      },
      {
        title: 'Stored in South Africa',
        text: 'Your backups are kept off-site in South African data centres in Johannesburg and Cape Town, and never leave the country.',
      },
      {
        title: 'Encrypted and locked',
        text: 'Data is encrypted before it leaves your premises, and backup copies are locked for a set period so ransomware or an accidental delete can’t remove them.',
      },
      {
        title: 'Restores tested every quarter',
        text: 'We test restores every quarter, so you know your backups work before the day you need them.',
      },
      {
        title: 'Disaster recovery planning',
        text: 'We agree with you what gets restored first, and how, if you lose a server, a laptop or access to your office.',
      },
    ],
    process: [
      {
        title: 'Agree what to protect',
        text: 'We work out with you which accounts, servers and computers hold the data your business can’t lose.',
      },
      {
        title: 'Set up encrypted backups',
        text: 'We configure automated, encrypted backups to South African storage on a schedule that fits how your data changes.',
      },
      {
        title: 'Watch every backup',
        text: 'Failed or missed backups alert us, so we can fix them before they leave a gap.',
      },
      {
        title: 'Test restores quarterly',
        text: 'Every quarter we restore sample data to prove your backups can be recovered.',
      },
    ],
    faqs: [
      {
        question: 'Where is my backup data stored?',
        answer:
          'In South Africa. IT Legends stores backups in data centres in Johannesburg and Cape Town, encrypted before they leave your premises, ' +
          'so your data stays in the country.',
      },
      {
        question: 'Doesn’t Microsoft 365 or Google Workspace already back up my data?',
        answer:
          'Not in the way most businesses assume. Microsoft and Google keep their services running, but recovering data you lose through deletion, ransomware ' +
          'or a departing employee is your responsibility, and their built-in recovery options are limited. A separate backup lets you restore mail and files whenever you need to.',
      },
      {
        question: 'How often are backups taken?',
        answer:
          'At least once a day, automatically. Files that change constantly can be backed up more often, close to real time, so you lose as little work as possible.',
      },
      {
        question: 'Can you keep a local backup as well as the cloud copy?',
        answer:
          'Yes. Depending on your needs, we can quote and install a local backup device, which gives you fast restores on site alongside the off-site copy in South Africa.',
      },
      {
        question: 'Can you migrate our email and files to Microsoft 365 or Google Workspace?',
        answer: 'Yes. IT Legends migrates email and files to Microsoft 365 or Google Workspace and sets up backups for them from day one.',
      },
    ],
    related: ['cybersecurity', 'server-maintenance', 'managed-it-support'],
  },

  // ---------- Infrastructure ----------

  'hardware-network': {
    metaTitle: 'Hardware & Network Setup for Businesses | IT Legends',
    metaDescription:
      'Dell, HP and Lenovo computers, switches, Wi-Fi, firewalls, printers, VoIP and UPS for Gauteng offices, supplied, installed and configured by IT Legends.',
    headline: 'Business hardware and network setup',
    intro:
      'IT Legends supplies, installs and configures the hardware your office runs on: Dell, HP and Lenovo computers and laptops, ' +
      'switches, Wi-Fi access points, firewalls, printers and VoIP phone systems. ' +
      "We also size and install UPS and surge protection and set up backup internet, so power outages and load shedding don't stop your business.",
    included: [
      {
        title: 'Computers and laptops',
        text: 'Dell, HP and Lenovo machines supplied and set up ready to work, with user accounts, email and your business software.',
      },
      {
        title: 'Switches and Wi-Fi',
        text: 'A wired and wireless network designed around your office, so every desk and meeting room has a reliable connection.',
      },
      {
        title: 'Firewalls',
        text: 'Business firewalls installed and configured to protect your network from the internet.',
      },
      {
        title: 'Printers and VoIP phones',
        text: 'Printers and VoIP phone systems connected to your network and set up for your team.',
      },
      {
        title: 'UPS and surge protection',
        text: 'UPS units sized for the equipment that must keep running, plus surge protection against power spikes when the power returns.',
      },
      {
        title: 'Backup internet',
        text: 'A second connection that takes over when your main line or the power goes down.',
      },
    ],
    process: [
      {
        title: 'Site visit',
        text: `We visit your office to see what you have and what you need, ${freeSiteVisit}.`,
      },
      {
        title: 'Quotation',
        text: 'You get a written quotation for the hardware and installation before any work starts.',
      },
      {
        title: 'Supply and install',
        text: 'We supply the equipment, install it and configure it for your network and your team.',
      },
      {
        title: 'Handover',
        text: 'We test everything, show your team what changed and leave your network ready to work.',
      },
    ],
    faqs: [
      {
        question: 'Which computer brands does IT Legends supply?',
        answer: 'We supply Dell, HP and Lenovo computers and laptops, set up ready to work, as well as switches, Wi-Fi access points, firewalls, printers and VoIP phones.',
      },
      {
        question: 'Can you help our office keep working during load shedding?',
        answer:
          'Yes. We size and install UPS units for the equipment that must stay on, add surge protection, and set up a backup internet connection. ' +
          'Combined with cloud backups, a power cut doesn’t have to mean lost work or damaged equipment.',
      },
      {
        question: 'Do you set up printers and phone systems?',
        answer: 'Yes. We connect printers and VoIP phone systems to your network and set them up for your team.',
      },
      {
        question: 'Is there a guarantee on installation work?',
        answer: workmanshipGuarantee,
      },
    ],
    related: ['structured-cabling', 'business-connectivity', 'managed-it-support'],
  },

  'structured-cabling': {
    metaTitle: 'Structured Cabling & Cable Management | IT Legends',
    metaDescription:
      'Office network cabling in Gauteng: Cat5e, Cat6 and Cat6a, fibre uplinks, cabinets, patch panels and labelling. ' +
      `Every cable tested. Free site visit within ${projectTerms.freeSiteVisitRadiusKm} km.`,
    headline: 'Structured cabling and cable management',
    intro:
      'IT Legends installs structured network cabling for offices across Gauteng: Cat5e, Cat6 and Cat6a Ethernet, ' +
      'fibre drop cable between switches for uplinks, patch panels, cabinets and trunking. ' +
      'Every cable is labelled and tested at both ends, and we tidy up existing messy cabling. ' +
      `Each job is quoted after a site visit, ${freeSiteVisit}.`,
    included: [
      {
        title: 'Ethernet cabling',
        text: 'Cat5e, Cat6 and Cat6a runs to desks, printers and Wi-Fi access points, chosen for the speeds your office needs.',
      },
      {
        title: 'Fibre uplinks',
        text: 'Fibre drop cable between switches, for fast, interference-free links between floors, rooms or buildings.',
      },
      {
        title: 'Cabinets and patch panels',
        text: 'Network cabinets, patch panels and trunking that keep cabling organised, protected and easy to work on.',
      },
      {
        title: 'Labelled and tested',
        text: 'Every cable is labelled at both ends and tested with a cable tester that checks every pair is wired correctly.',
      },
      {
        title: 'Cable management',
        text: 'We tidy up existing messy cabling and cabinets, so faults are quicker to find and changes are easier to make.',
      },
      {
        title: `${projectTerms.workmanshipGuaranteeDays}-day workmanship guarantee`,
        text: 'Our installation work is guaranteed against workmanship faults, with full terms in your quotation.',
      },
    ],
    process: [
      {
        title: 'Site visit',
        text: `We walk your office to plan cable routes and points, ${freeSiteVisit}.`,
      },
      {
        title: 'Quotation',
        text: 'You get a written quotation for the materials and installation before any work starts.',
      },
      {
        title: 'Install, label and test',
        text: 'We run and terminate the cables, label both ends and test every run.',
      },
      {
        title: 'Handover',
        text: 'We walk you through the finished installation, covered by our workmanship guarantee.',
      },
    ],
    faqs: [
      {
        question: 'How much does structured cabling cost?',
        answer:
          'It depends on the number of points, the cable distances and the building, so every job is quoted after a site visit. ' +
          `The site visit is ${freeSiteVisit}.`,
      },
      {
        question: 'Which network cables do you install?',
        answer:
          'IT Legends installs Cat5e, Cat6 and Cat6a Ethernet cabling, and fibre drop cable between switches for uplinks, ' +
          'together with patch panels, cabinets and trunking.',
      },
      {
        question: 'Is every network cable tested?',
        answer: 'Yes. Every cable run is labelled at both ends and tested with a cable tester that checks each pair is wired correctly.',
      },
      {
        question: 'Can you tidy up our existing messy cabling?',
        answer:
          'Yes. We re-route, label and organise existing cabling and cabinets, which makes faults quicker to find and future changes easier.',
      },
      {
        question: 'What does the workmanship guarantee cover?',
        answer: workmanshipGuarantee,
      },
    ],
    related: ['hardware-network', 'business-connectivity', 'server-maintenance'],
  },

  'business-connectivity': {
    metaTitle: 'Business Internet: Fibre, LTE, 5G & Air Fibre | IT Legends',
    metaDescription:
      'Business fibre, fixed LTE, 5G, air fibre and microwave links for Gauteng businesses, plus backup connections, installed, set up and supported by IT Legends.',
    headline: 'Business internet and connectivity',
    intro:
      'IT Legends supplies business internet of every type, including fibre, fixed LTE, 5G, air fibre (fixed wireless) and microwave links, ' +
      "sourced from South African network providers. We check what's available at your address, install and set up your router, " +
      'and stay your point of contact if the line goes down. A backup connection keeps you online during outages.',
    included: [
      {
        title: 'Every connection type',
        text: 'Fibre, fixed LTE, 5G, air fibre (fixed wireless) and microwave links, so we can recommend what works best at your address.',
      },
      {
        title: 'Availability check',
        text: 'We check which connections and providers are available at your premises before you commit to anything.',
      },
      {
        title: 'Installation and router setup',
        text: 'We arrange the installation and set up your router so the connection works with your office network from day one.',
      },
      {
        title: 'One point of contact',
        text: 'If the line goes down, you call us, not a call centre. We deal with the network provider for you.',
      },
      {
        title: 'Backup connections',
        text: 'A second connection, such as LTE or 5G alongside fibre, takes over when the main line fails.',
      },
    ],
    process: [
      {
        title: 'Tell us what you need',
        text: 'How many people, what you run online, and how critical uptime is for your business.',
      },
      {
        title: 'We check availability',
        text: 'We check which connection types and providers are available at your address.',
      },
      {
        title: 'Quotation and agreement',
        text: 'You get a quotation for the connection, and the agreement follows the provider’s contract terms.',
      },
      {
        title: 'Installation and go-live',
        text: 'We arrange the installation, set up your router and confirm everything works.',
      },
    ],
    faqs: [
      {
        question: 'What types of business internet does IT Legends offer?',
        answer:
          'Fibre, fixed LTE, 5G, air fibre (fixed wireless) and microwave links, sourced from South African network providers. ' +
          'We check what’s available at your address and recommend the best fit.',
      },
      {
        question: 'Who do I contact when our internet goes down?',
        answer:
          `You contact us: call or WhatsApp ${company.phone.display}, or email ${company.email}. ` +
          `We deal with the network provider for you. Standard requests are acknowledged ${standardResponse} and critical issues ${criticalResponse}.`,
      },
      {
        question: 'Can we have a backup internet connection for outages and load shedding?',
        answer:
          'Yes. A second connection, such as LTE or 5G alongside fibre, takes over when the main line fails. ' +
          'Add a UPS for the router and network equipment, and your office stays online through a power cut.',
      },
      {
        question: 'How long is a business internet contract?',
        answer: 'Usually a minimum of 12 months, depending on the network provider’s contract terms. Every connection is quoted before you sign.',
      },
    ],
    related: ['hardware-network', 'structured-cabling', 'managed-it-support'],
  },

  // ---------- Digital ----------

  'website-design': {
    metaTitle: `Website Design & Development from ${basicWebsite} | IT Legends`,
    metaDescription:
      `Hand-coded, fast, mobile-friendly websites from ${basicWebsite} ${VAT_NOTE}: up to ${websitePricing.basicMaxPages} pages, contact form, WhatsApp and Google Maps. ` +
      'Fixed price, live in about a month.',
    headline: 'Website design and development',
    intro:
      'IT Legends designs and hand-codes fast, mobile-friendly websites for businesses in South Africa and abroad. ' +
      `A basic website starts at ${basicWebsite} (${VAT_NOTE}) for up to ${countWord(websitePricing.basicMaxPages)} pages with a contact form, ` +
      'WhatsApp button, Google Maps and basic on-page SEO, at a fixed price agreed upfront and usually live in about a month.',
    included: [
      {
        title: `Up to ${countWord(websitePricing.basicMaxPages)} pages`,
        text: `The basic website covers up to ${countWord(websitePricing.basicMaxPages)} pages or sections, such as home, services, about and contact.`,
      },
      {
        title: 'Hand-coded, fast and mobile-friendly',
        text: 'No page builders or heavy templates: every site is hand-coded, so it loads quickly and works on any screen size.',
      },
      {
        title: 'Contact form, WhatsApp and Google Maps',
        text: 'Visitors can send an enquiry, message you on WhatsApp or find your office in one tap.',
      },
      {
        title: 'Basic on-page SEO',
        text: 'Page titles, descriptions, headings and a clean page structure, so search engines understand what your business does.',
      },
      {
        title: `${websitePricing.revisionRounds} rounds of revisions`,
        text: `You review the design and request changes in up to ${countWord(websitePricing.revisionRounds)} rounds before signing it off.`,
      },
      {
        title: 'One fixed price',
        text: 'Every website is quoted at a fixed project price agreed upfront, not billed by the hour.',
      },
    ],
    process: [
      {
        title: 'Brief and quote',
        text: 'We agree what your website needs and quote a fixed price before any work starts.',
      },
      {
        title: 'Design',
        text: `We design the look and layout, with up to ${countWord(websitePricing.revisionRounds)} rounds of revisions until you sign it off.`,
      },
      {
        title: 'Build',
        text: 'We hand-code the site with your content, forms and basic on-page SEO, and test it on phones and computers.',
      },
      {
        title: 'Launch',
        text: 'We put your website live. With website management, we keep it hosted, monitored and backed up from then on.',
      },
    ],
    faqs: [
      {
        question: 'How much does a website cost?',
        answer:
          `A basic website costs ${basicWebsite} (${VAT_NOTE}) for up to ${countWord(websitePricing.basicMaxPages)} pages or sections, ` +
          'with a contact form, WhatsApp button, Google Maps and basic on-page SEO. ' +
          'Larger websites and online stores are quoted per project, always at a fixed price agreed upfront.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'A basic website usually takes about a month. The timeline depends on how quickly you send feedback and sign off the final design.',
      },
      {
        question: 'Are domain and hosting included?',
        answer:
          `Not in the website price. Website management at ${websiteManagement} per month (${VAT_NOTE}) includes your domain and hosting, ` +
          'website monitoring, backups and bug fixes on existing features. New features are quoted separately.',
      },
      {
        question: 'What do I need to provide for my website?',
        answer:
          'The text, photos and logo for your pages. We turn them into a designed, hand-coded website. ' +
          'Online stores and extra features are quoted separately.',
      },
      {
        question: 'Do you build online stores and larger websites?',
        answer: 'Yes. E-commerce and larger websites are quoted per project at a fixed price agreed upfront.',
      },
    ],
    related: ['custom-software', 'managed-it-support'],
    areaServed: ['South Africa'],
  },

  'custom-software': {
    metaTitle: 'Custom Software Development in South Africa | IT Legends',
    metaDescription:
      'Bespoke web apps, client portals, internal systems, dashboards and mobile apps, built with React, TypeScript and Supabase. Fixed price, and you own the code.',
    headline: 'Custom software development',
    intro:
      'IT Legends builds custom software around how your business works: web apps, client portals, internal business systems, dashboards and mobile apps, ' +
      'for clients in South Africa and abroad. We scope each project with you, quote a fixed price and deliver in milestones, ' +
      'using React, TypeScript and Supabase. Once the project is paid, you own the code and your data.',
    included: [
      {
        title: 'Web apps and client portals',
        text: 'Browser-based systems your team and your clients can use from anywhere, on any device.',
      },
      {
        title: 'Internal business systems',
        text: 'Job cards, workshop management, field service and asset tracking, built around the way your business already works.',
      },
      {
        title: 'Dashboards and reporting',
        text: 'Your data in one place, with the reports and PDFs your business needs.',
      },
      {
        title: 'Mobile apps',
        text: 'Apps for staff in the field or for your customers, connected to the same system as your office.',
      },
      {
        title: 'A modern, proven stack',
        text: 'React and TypeScript on the front end, Supabase and PostgreSQL behind it: fast, secure and easy to extend.',
      },
      {
        title: 'You own it',
        text: 'Once the project is paid in full, the code and your data belong to you.',
      },
    ],
    process: [
      {
        title: 'Discovery and scoping',
        text: 'We map out your processes, users and requirements, and agree exactly what will be built.',
      },
      {
        title: 'Fixed-price quote',
        text: `You get a fixed price for the agreed scope. A ${softwarePricing.depositPercent}% deposit starts the build.`,
      },
      {
        title: 'Build in milestones',
        text: 'You see working software at each milestone and give feedback as the project progresses.',
      },
      {
        title: 'Launch and support',
        text: 'We launch the system and, with monthly support, keep it running and fix any bugs.',
      },
    ],
    faqs: [
      {
        question: 'How much does custom software cost?',
        answer:
          'Every project is scoped with you first and then quoted at a fixed price for the agreed scope, not billed by the hour. ' +
          `A ${softwarePricing.depositPercent}% deposit starts the build.`,
      },
      {
        question: 'Who owns the code IT Legends builds?',
        answer: 'You do. Once the project is paid in full, the code and all your data belong to your business.',
      },
      {
        question: 'Which technologies does IT Legends use?',
        answer:
          'We build with React and TypeScript, with Supabase and PostgreSQL for the database, authentication and storage. ' +
          'It’s a modern, widely used stack, so your system is fast, secure and easy to extend.',
      },
      {
        question: 'Do you support software after launch?',
        answer:
          `Yes. Monthly support costs ${softwareSupport} (${VAT_NOTE}) and covers bug fixes on live features plus ` +
          `${countWord(softwarePricing.supportRevisionsPerMonth)} small revisions a month, such as wording or colour changes. ` +
          'Changes to how a feature works, and new features, are quoted separately as projects.',
      },
      {
        question: 'What kind of software has IT Legends built?',
        answer:
          'Business systems such as job-card and workshop management, field service and asset tracking. ' +
          'Our own SiteNexus app, used daily by IT Legends technicians, manages clients, sites and assets, times jobs, prints QR asset labels and produces PDF site reports.',
      },
    ],
    related: ['website-design', 'managed-it-support'],
    areaServed: ['South Africa'],
  },
};

export function getServicePage(slug: ServiceSlug): ServicePageContent {
  return servicePages[slug];
}