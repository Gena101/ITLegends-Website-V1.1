// src/data/pricing-page.ts
// Pricing page copy: plan terms and FAQs. Pricing page only (kept out of the shared bundle).
// Every figure is interpolated from pricing.ts / company.ts; never type one into a sentence.

import { company } from './company';
import type { FaqItem } from './faqs';
import { notIncluded } from './plan-features';
import {
  cloudBackup,
  contractTerms,
  formatRand,
  getPlan,
  onboarding,
  onsite,
  outOfScopeHourly,
  plans,
  VAT_NOTE,
  workspaceBackup,
} from './pricing';
import { countWord, joinList } from '../lib/text';

const complete = getPlan('complete');
if (!complete.pricePerServer) throw new Error('Complete Care needs pricePerServer in pricing.ts');

const serverPrice = formatRand(complete.pricePerServer);
const planPrices = joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`));
const callout = formatRand(onsite.calloutFee);
const perKm = formatRand(onsite.travelPerKm);
const deviceBackup = formatRand(cloudBackup.pricePerDevice);
const userBackup = formatRand(workspaceBackup.pricePerUser);
const annualMin = countWord(contractTerms.annualMinDevices);
const { standardResponse, criticalResponse, criticalAfterHours } = company.support;

/** "Hardware, software licences, installation and development projects and printer servicing" */
const quotedSeparately = joinList(notIncluded.map((item, i) => (i === 0 ? item : item.toLowerCase())));

export const planTerms: { title: string; text: string }[] = [
  {
    title: 'Per device, one plan',
    text:
      `Prices are per device per month, ${VAT_NOTE}. A device is a PC or laptop, and every device in your business is on the same plan. ` +
      `Servers are covered on ${complete.name} at ${serverPrice} per server per month.`,
  },
  {
    title: 'Month-to-month or 12 months',
    text:
      `Choose month-to-month, or a 12-month agreement with ${contractTerms.annualDiscountPercent}% off the total contract value. ` +
      `12-month agreements need at least ${annualMin} devices; smaller setups by arrangement.`,
  },
  {
    title: 'On-site visits',
    text:
      `Included visits are within ${onsite.radiusKm} km of either branch and don't roll over to the next month. ` +
      `Extra visits are ${callout} per call-out, including the first hour of labour, plus ${perKm} per km beyond ${onsite.radiusKm} km. ` +
      'Regular extra visits can be built into your plan at an agreed rate.',
  },
  {
    title: 'Outside your plan',
    text: `Work outside your plan's scope is ${formatRand(outOfScopeHourly)} per hour. ${quotedSeparately} are quoted separately.`,
  },
  {
    title: 'Response times',
    text:
      `We acknowledge standard requests ${standardResponse} and critical issues ${criticalResponse}. ${criticalAfterHours} ` +
      'These are times to respond, not to resolve.',
  },
];

export const pricingFaqs: FaqItem[] = [
  {
    question: 'How much does managed IT support cost?',
    answer:
      `${planPrices} per device per month, ${VAT_NOTE}. Servers are covered on ${complete.name} at ${serverPrice} per server per month. ` +
      `Backup is an add-on: ${deviceBackup} per backed-up device, and ${userBackup} per user for Microsoft 365 or Google Workspace.`,
  },
  {
    question: 'What counts as a device?',
    answer:
      `A device is a PC or laptop with our monitoring agent installed. Servers are covered separately on ${complete.name}. ` +
      'Remote printer troubleshooting is included on every plan; printer servicing is not.',
  },
  {
    question: 'Can we put different devices on different plans?',
    answer: 'No. Every device in your business is on the same plan, so support, security and reporting are consistent across your team.',
  },
  {
    question: 'Do we have to sign a 12-month contract?',
    answer:
      `No. You can go month-to-month or sign for 12 months. A 12-month agreement gets ${contractTerms.annualDiscountPercent}% off ` +
      `the total contract value and needs at least ${annualMin} devices; smaller setups can be arranged.`,
  },
  {
    question: 'What if we need more on-site visits than our plan includes?',
    answer:
      `Extra visits cost ${callout} per call-out (${VAT_NOTE}) within ${onsite.radiusKm} km of either branch, including the first hour of labour; ` +
      `travel beyond that is ${perKm} per km. Unused visits don't roll over. If you regularly need more, we can build extra visits into your plan at an agreed rate.`,
  },
  {
    question: 'Is backup included in the plans?',
    answer:
      `No, backup is an add-on on any plan. Device and server backup is ${deviceBackup} per device per month, with ` +
      `${cloudBackup.includedStorageGbPerDevice} GB per device pooled across your site. Microsoft 365 and Google Workspace backup is ` +
      `${userBackup} per user per month. You choose which devices and users to back up.`,
  },
  {
    question: 'Is the IT assessment free?',
    answer:
      `Yes, within ${onboarding.freeAssessmentRadiusKm} km of either branch. Further away in Gauteng it's a ${callout} call-out; ` +
      `outside Gauteng it's ${callout} plus ${perKm} per km beyond the first ${onsite.radiusKm} km. The call-out is credited against your ` +
      `first invoice if you sign a 12-month agreement. You get the report within ${countWord(onboarding.reportBusinessDays)} business days, and it's yours to keep.`,
  },
  {
    question: 'How quickly do you respond?',
    answer:
      `We acknowledge standard requests ${standardResponse} and critical issues, including a suspected security breach, ${criticalResponse}. ` +
      `${criticalAfterHours} Automated monitoring runs around the clock; our team responds during business hours.`,
  },
];