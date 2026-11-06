// src/data/about.ts
// About page content. About page only. Only facts supplied by Eugene (see 02-company-facts.md).

import { company, getBranch } from './company';
import type { FaqItem } from './faqs';
import { industries } from './industries';
import { locationsForBranch } from './locations';
import { assessmentRadiusText, contractTerms, onboarding } from './pricing';
import { services } from './services';
import { countWord, joinList } from '../lib/text';

const headOffice = getBranch('johannesburg');
const centurion = getBranch('pretoria');
const head = headOffice.address.locality;
const second = centurion.address.locality;

/** B-BBEE status. Update level and expiry when the certificate is renewed. */
export const bbbee = { level: 4, expires: '2027-11-04' } as const;

// Build-time reminder (runs in Node during prerender; never in the browser)
if (typeof window === 'undefined') {
  const daysLeft = Math.floor((Date.parse(bbbee.expires) - Date.now()) / 86_400_000);
  if (daysLeft < 0) console.warn(`⚠ B-BBEE certificate expired ${-daysLeft} days ago: update or remove it (src/data/about.ts)`);
  else if (daysLeft <= 60) console.warn(`⚠ B-BBEE certificate expires in ${daysLeft} days (src/data/about.ts)`);
}

export const aboutIntro =
  `IT Legends is a Gauteng IT company founded in ${company.foundingYear}, with branches in ${head} (head office) and ${second}. ` +
  'One local team gives small and medium businesses managed IT support, office networks and connectivity, websites and custom software, ' +
  'with published prices and month-to-month contracts.';

export const factStrip: { value: string; label: string }[] = [
  { value: String(company.foundingYear), label: 'Founded' },
  { value: String(2), label: 'Branches' },
  { value: String(services.length), label: 'Services' },
  { value: String(industries.length), label: 'Industries served' },
];

export const story =
  'IT Legends started because businesses were waiting days for a technician, however serious the problem, and then getting a workaround instead of a fix. ' +
  'A few weeks later the same issue was back. We set out to respond quickly and to fix problems at the cause, so they stay fixed.';

export const timeline: { date: string; title: string; text: string }[] = [
  {
    date: String(company.foundingYear),
    title: 'IT Legends founded',
    text: `Founded in ${head}, offering managed IT support, structured cabling and business connectivity.`,
  },
  {
    date: 'May 2025',
    title: `${second} branch opens`,
    text: `Our second branch opens in ${second}, serving ${joinList(locationsForBranch(centurion.id).map((l) => l.name))}.`,
  },
  {
    date: 'Nov 2025',
    title: 'Websites and custom software',
    text: 'Website design and custom software development are added for clients in South Africa and abroad.',
  },
  {
    date: 'Jul 2026',
    title: 'SiteNexus goes live',
    text: 'SiteNexus, our own field and asset management app, goes into daily use by our technicians.',
  },
];

export const principles: { title: string; text: string; href?: string }[] = [
  {
    title: 'Prices upfront',
    text: 'Managed IT plans and add-ons are published, and installation, website and software projects are quoted at a fixed price before work starts.',
    href: '/pricing',
  },
  {
    title: 'No lock-in',
    text: `Choose month-to-month, or a 12-month agreement if you want ${contractTerms.annualDiscountPercent}% off.`,
  },
  {
    title: 'One local team',
    text: `Support, networks, cabling, connectivity, websites and software from one team based in ${head} and ${second}.`,
  },
  {
    title: 'A free IT assessment',
    text:
      `We assess your setup for free within ${assessmentRadiusText} of either branch and send a report within ` +
      `${countWord(onboarding.reportBusinessDays)} business days. It's yours to keep, whether or not you sign.`,
  },
  {
    title: 'Your backups stay in South Africa',
    text: 'Backups are encrypted before they leave your office and stored in South African data centres in Johannesburg and Cape Town.',
  },
  {
    title: 'We build our own tools',
    text: 'SiteNexus, our own field and asset management app, gives every device a QR asset label and every visit a PDF site report.',
  },
];

/** Listed as team qualifications (no names on the site). Text only: never publish the certificates (they show ID numbers). */
export const qualifications: { name: string; issuer: string; year: string }[] = [
  { name: 'National Certificate: IT Systems Support (NQF Level 5)', issuer: 'MICT SETA', year: '2020' },
  { name: 'Microsoft Certified Professional', issuer: 'Microsoft', year: '2018' },
  { name: '3CX Basic and Intermediate certification', issuer: '3CX', year: '2019–2020' },
  { name: 'Introduction to Cybersecurity (course)', issuer: 'Cisco Networking Academy', year: '2026' },
];

const areas = joinList(company.serviceArea.filter((a) => a !== 'Gauteng'));
const industryList = joinList(industries.map((i) => i.name.toLowerCase()));

export const aboutFaqs: FaqItem[] = [
  {
    question: 'When was IT Legends founded?',
    answer: `${company.legalName} was founded in ${company.foundingYear} in ${head} (registration number ${company.registrationNumber}).`,
  },
  {
    question: 'Where is IT Legends based?',
    answer:
      `Our head office is in ${head} (${headOffice.name}), and our ${second} branch (${centurion.name}) opened in May 2025. ` +
      `Together they serve ${areas} and the rest of Gauteng.`,
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      `Small and medium businesses, including ${industryList} firms. ` +
      'Website design and custom software projects are also available to clients elsewhere in South Africa and internationally.',
  },
  {
    question: 'What qualifications does your team hold?',
    answer: `${joinList(qualifications.map((q) => q.name))}.`,
  },
  {
    question: 'What is your B-BBEE level?',
    answer: `IT Legends is a Level ${bbbee.level} B-BBEE contributor.`,
  },
];