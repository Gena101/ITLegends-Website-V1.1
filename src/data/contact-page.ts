// src/data/contact-page.ts
// Contact page copy (FAQs). Contact page only. Every value comes from company.ts / pricing.ts.

import { branches, company, formatHours, openingHours } from './company';
import type { FaqItem } from './faqs';
import { assessmentRadiusText, onsiteRadiusText } from './pricing';
import { joinList } from '../lib/text';

const { standardResponse, criticalResponse, criticalAfterHours } = company.support;

/** "Mon–Fri 09:00–17:00 and Sat 09:00–13:00" (open days only) */
export const openHoursText = joinList(
  openingHours.filter((h) => h.opens && h.closes).map((h) => `${h.label} ${formatHours(h)}`),
);

/** "Roodepoort and Centurion" */
export const branchTowns = joinList(branches.map((b) => b.address.locality));

const areas = joinList(company.serviceArea.filter((a) => a !== 'Gauteng'));

export const contactFaqs: FaqItem[] = [
  {
    question: 'What are your business hours?',
    answer: `Both branches, in ${branchTowns}, are open ${openHoursText}.`,
  },
  {
    question: 'How quickly will you respond?',
    answer:
      `We respond to standard requests ${standardResponse} and to critical issues, including a suspected security breach, ${criticalResponse}. ` +
      'These are times to acknowledge your request, not to resolve it.',
  },
  {
    question: 'What if something critical happens outside business hours?',
    answer:
      `Call or WhatsApp us on ${company.phone.display}. ${criticalAfterHours} ` +
      'For managed IT clients, automated monitoring runs around the clock.',
  },
  {
    question: 'Do you come to our office?',
    answer:
      `Yes. Managed IT plans include on-site visits within ${onsiteRadiusText} of either branch, ` +
      `and the first IT assessment is free within ${assessmentRadiusText}. Further away, a call-out fee applies.`,
  },
  {
    question: 'Which areas do you serve?',
    answer:
      `${areas} and the rest of Gauteng, from our branches in ${branchTowns}. ` +
      'Website design and custom software projects are also available to clients elsewhere in South Africa and internationally.',
  },
];