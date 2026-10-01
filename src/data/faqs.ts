// src/data/faqs.ts
// FAQ content for the Phase 3 pages. FaqList renders the visible Q&A AND the
// FAQOPage schema from this data, so the two can never drift (08 §12, D03).
//
// RULES - 04-AEO-PLAYBOOK §6. Every answer must:
//   - open with the direct answer, no lead-in
//   - stand alone, making sense with nothing but its own question
//   - run 40-80 words
//   - contain at least one specific figure, name or condition
//   - come only from 02-PROJECT-KNOWLEDGE §1-§2. Never invent or round.
// No two pages may carry the same question. Keep the sets below distinct.
//
// Phase 6 expands /faq to 25+ questions in five categories and will reuse
// `category` to group them.

export type FaqCategory = 'pricing' | 'response' | 'coverage' | 'company' | 'service';

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

// ----------------------------------------------------------------- home

export const homeFaqs: readonly Faq[] = [
  {
    id: 'home-cost',
    category: 'pricing',
    question: 'How much does IT support cost in Gauteng?',
    answer:
      'IT Legends managed IT support starts at R449 per device per month excluding VAT for Essential Care, R699 for Managed Care and R949 for Complete Care. A minimum monthly fee of R2,245 excluding VAT applies, equivalent to five devices. Sign an annual SLA and you get 10% off, with your rate locked for 12 months.',
  },
  {
    id: 'home-response',
    category: 'response',
    question: 'How quickly does IT Legends respond to a problem?',
    answer:
      'Standard requests get a response within 24 business hours. Critical issues, meaning a server down, an office offline or a suspected breach, are faster and depend on your plan: same business day on Essential Care, within 4 business hours on Managed Care, and within 2 business hours on Complete Care.',
  },
  {
    id: 'home-areas',
    category: 'coverage',
    question: 'Which areas in Gauteng does IT Legends cover?',
    answer:
      'IT Legends supports businesses in Johannesburg, Pretoria, Centurion, Midrand, Sandton and Roodepoort from two branches: 715 Elm Street, Grobler Park, Roodepoort, and 265 Theuns Van Niekerk Street, Wierdapark, Centurion. Most work is done remotely, with on-site attendance where it is needed. An on-site call-out is R650 excluding VAT within 20km of the nearest branch, including the first hour.',
  },
  {
    id: 'home-hours',
    category: 'response',
    question: 'What are IT Legends support hours?',
    answer:
      'Support runs Monday to Friday from 07:30 to 17:00 and Saturday from 08:00 to 13:00. Sunday is closed with emergency support only, and public holidays are treated as Sunday. IT Legends does not offer 24/7 monitoring, and the response times in your agreement apply during these business hours.',
  },
  {
    id: 'home-minimum',
    category: 'pricing',
    question: 'Is there a minimum number of devices?',
    answer:
      'Yes. IT Legends bills a minimum fee of R2,245 excluding VAT, which is the equivalent of five devices on Essential Care. A business with fewer than five devices pays the minimum. Above five, you pay per device on your  chosen plan: R449 on Essential Care, R669 of Managed Care and R 949 on Complete Care.',
  },
  {
    id: 'home-history',
    category: 'company',
    question: 'How long has IT Legends been in business?',
    answer:
      'IT Legends (Pty) Ltd has operated as a managed IT service provider since March 2020, registered in South Africa as company 2020/147010/07. The business runs two branches in Gauteng, in Roodepoort and in Wierdapark, Centurion, and is led by its director, Eugene Morton. Both branches are listed on Google Business Profile.',
  },
];

// ----------------------------------------------------------------- pricing

export const pricingFaqs: readonly Faq[] = [
  {
    id: 'pricing-vat',
    category: 'pricing',
    question: 'Do IT Legends prices include VAT?',
    answer:
      'No. Every price IT Legends publishes excludes VAT. Essential Care is R449 per device per month, Managed Care is R699 and Complete Care is R949, all excluding VAT. The minimum monthly fee of R2,245 and the server add-on at R1,495 per server per month also excludes VAT.',
  },
  {
    id: 'pricing-travel',
    category: 'pricing',
    question: 'What does IT Legends charge for on-site call-outs?',
    answer:
      'An on-site call-out is R650 within 20km of the nearest branch, and that includes the first hour of work from the time the technician arrives. Time after the first hour is billed at R450 per hour, in 30-minutes increments rounded-up. Sites beyond 20km add R4.50 per kilometre, measured one way. All figures exclude VAT.',
  },
  {
    id: 'pricing-annual',
    category: 'pricing',
    question: 'Is there a discount for signing an annual agreement?',
    answer:
      'Yes. SIgn an annual SLA and IT Legends takes 10% off, with your rate locked for 12 months, so there is no increase during the term. The discount applies to the monthly per-device fee on any plan: Essential Care at R449, Managed Care at R699 or Complete Care at R949, all excl VAT.',
  },
  {
    id: 'pricing assessment',
    category: 'pricing',
    question: 'Is the IT Assessment really free?',
    answer:
      'Yes, within 20km of either branch. Further out but still Gauteng, the assessment is a flat R650 excluding VAT with no per-kilometre charge, and that R650 is credited against your first invoice if you sign. Outside Gauteng, travel is quoted per site. The assessment lists every device and shows what is exposed.',
  },
  {
    id: 'pricing-servers',
    category: 'pricing',
    question: 'Do I pay extra for servers?',
    answer:
      'Yes. Servers are billed separately at R 1,495 per server per month excluding VAT, in addition to the per-device fee for workstations. A business running five workstations on Managed Care and one server pays R3,495 for the devices plus R1,495 for the server, both excluding VAT.',
  },
];

// ----------------------------------------------------------------- contact

export const contactFaqs: readonly Faq[] = [
  {
    id: 'contact-reach',
    category: 'company',
    question: 'How do I get hold of IT Legends?',
    answer:
      'Call or WhatsApp +27 84 634 8144, email info@itlegends.co.za, or use the contact form on this page. Phones are answered Monday to Friday from 07:30 to 17:00 and Saturday from 08:00 to 13:00. Sunday is closed apart from emergency support, and public holidays are treated as Sunday.',
  },
  {
    id: 'contact-offices',
    category: 'coverage',
    question: 'Where are the IT Legends offices?',
    answer:
      'IT Legends has two branches in Gauteng. IT Legends - Johannesburg is at 715 Elm Street, Grobler Park, Roodepoort, 1724. IT Legends - Pretoria is at 265 Theuns Van Niekerk Street, Wierdapark, Centurion, 0157. Both are listed on Google Maps, and most support is delivered remotely rather than from either office.',
  },
  {
    id: 'contact-onsite',
    category: 'coverage',
    question: 'Will someone come out to my office?',
    answer:
      'Yes, where a problem needs someone on site. Most support is delivered remotely, which resolves the majority of issues faster than a call-out would. When someone does come out, the call-out is R650 excluding VAT within 20km and covers the first hour, with R450 per hour after that and R4.50 per kilometre beyond 20km.',
  },
];

// ----------------------------------------------------------------- about

export const aboutFaqs: readonly Faq[] = [
  {
    id: 'about-owner',
    category: 'company',
    question: 'Who owns IT Legends?',
    answer:
      'IT Legends (Pty) Ltd is owned and run by its director, Eugene Morton. The company was founded in March 2020 and is registered in South Africa under company number 2020/147010/07 and VAT number 4920295864. It operates two branches in Gauteng, one in Roodepoort and one in Wierdapark, Centurion.',
  },
  {
    id: 'about-clients',
    category: 'company',
    question: 'What kind of businesses does IT Legends work with?',
    answer:
      'IT Legends supports small and medium businesses across Gauteng, working mainly with accounting firms, law firms, medical practices, insurance brokers and the automotive trade. Support is billed per device from R449 per month excluding VAT, with a minimum monthly fee of R2,245, so the model suits businesses running about five devices or more.',
  },
  {
    id: 'about-other-services',
    category: 'service',
    question: 'Does IT Legends do anything besides managed IT support?',
    answer:
      'Yes. Alongside managed IT services, IT Legends builds custom software and websites, resells fixed LTE connectivity sourced from upstream providers, and installs structured cabling. Managed IT support is the main focus and the only service with pages on this site. Ask about the others on +27 84 634 8144.',
  },
];

/** Every Phase 3 FAQ, for the Phase 6 /faq build and duplicate checking. */
export const phase13Faqs: readonly Faq[] = [
  ...homeFaqs,
  ...pricingFaqs,
  ...contactFaqs,
  ...aboutFaqs,
];