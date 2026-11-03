// src/data/faqs.ts
// Visible FAQs AND FAQPage schema are generated from these arrays (never duplicate the text).
// Answers are plain text, written as direct answers (AEO).
import { company } from './company';
import { formatRand, getPlan, VAT_NOTE } from './pricing';

export interface FaqItem {
  question: string;
  answer: string;
}

const essential = getPlan('essential');
const managed = getPlan('managed');
const complete = getPlan('complete');

export const homeFaqs: FaqItem[] = [
  {
    question: 'What IT services does IT Legends offer?',
    answer:
      'IT Legends provides managed IT support, helpdesk and remote assistance, cybersecurity, cloud and backup, server maintenance, hardware and network setup, structured cabling and business connectivity, plus website design and custom software development for small and medium businesses.',
  },
  {
    question: 'Which areas does IT Legends serve?',
    answer:
      'IT Legends supports businesses across Gauteng, including Johannesburg, Roodepoort, Sandton, Midrand, Centurion and Pretoria, from branches in Roodepoort and Centurion. Website design and custom software projects are also delivered for international clients.',
  },
  {
    question: 'How much does managed IT support cost?',
    answer:
      `Managed IT plans start at ${formatRand(essential.pricePerDevice)} per device per month on ${essential.name}. ` +
      `${managed.name} is ${formatRand(managed.pricePerDevice)} and ${complete.name} is ${formatRand(complete.pricePerDevice)} per device per month, ` +
      `with servers on ${complete.name} at ${formatRand(complete.pricePerServer ?? 0)} per server per month. All prices are ${VAT_NOTE}.`,
  },
  {
    question: 'How quickly does IT Legends respond to support requests?',
    answer:
      `We acknowledge standard support requests ${company.support.standardResponse} and critical issues ${company.support.criticalResponse}. ` +
      `${company.support.criticalAfterHours} ` +
      'These are response times, meaning how quickly a technician acknowledges your request, not the time it takes to fully resolve it.',
  },
  {
    question: 'What is a managed IT services provider (MSP)?',
    answer:
      'A managed IT services provider acts as your outsourced IT department. Instead of paying per call-out, you pay a predictable monthly fee and the provider handles proactive monitoring, maintenance, security, helpdesk support and backups, so problems are prevented or fixed before they stop your team working.',
  },
  {
    question: 'Which industries does IT Legends work with?',
    answer:
      'IT Legends works with accounting firms, law firms, medical practices, insurance businesses and automotive businesses, as well as general small and medium businesses. Each of these industries has its own software, compliance and data-protection needs, which shape how we set up support and security.',
  },
  {
    question: 'Can IT Legends help protect my business against power outages and load shedding?',
    answer:
      'Yes. We help businesses stay running through power outages and load shedding with UPS sizing and installation, surge protection, reliable backup internet, cloud backups and disaster recovery planning, so a power cut does not mean lost data or damaged equipment.',
  },
  {
    question: 'Does IT Legends build websites and custom software?',
    answer:
      'Yes. Alongside managed IT, we design and build fast, search-optimised business websites and custom software built around how your business works. Website and development projects are quoted at a fixed project price agreed upfront, not billed by the hour.',
  },
];