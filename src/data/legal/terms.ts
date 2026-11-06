// src/data/legal/terms.ts
// Website terms of use (NOT service terms: those are the quotation, the Standard Terms and Conditions
// of Service and the SLA). Consistent with the T&Cs: SA law, Gauteng Division (cl. 13.3); banking fraud (cl. 14).
// Reviewed by an attorney: NO (Nov 2026).
import { company, formatAddress, getBranch } from '../company';
import { VAT_NOTE } from '../pricing';
import { informationOfficer } from './shared';
import type { LegalDoc } from './types';

const headOffice = getBranch('johannesburg');
const email = `[${company.email}](mailto:${company.email})`;
const phone = `[${company.phone.display}](${company.phone.href})`;

export const termsOfUse: LegalDoc = {
  title: 'Terms of use',
  metaTitle: 'Website Terms of Use | IT Legends',
  metaDescription:
    'The terms for using the IT Legends website: how you may use it, what its information is for, our company details, and where our service terms are set out.',
  intro:
    'These terms apply when you use the IT Legends website. They cover how you may use the site and its content, what the information on it is for, and who we are. ' +
    'Our services themselves are governed by your quotation, our Standard Terms and Conditions of Service and, for managed IT, a signed service level agreement.',
  lastUpdated: '2026-11-06',
  sections: [
    {
      id: 'about',
      heading: 'About these terms',
      blocks: [
        {
          kind: 'p',
          text:
            `This website is operated by ${company.legalName}. By using it, you agree to these terms. If you do not agree, please do not use the website.`,
        },
      ],
    },
    {
      id: 'service-terms',
      heading: 'Our services are covered by separate terms',
      blocks: [
        {
          kind: 'p',
          text:
            'These terms only cover your use of the website. Any work we do for you is governed by the written quotation you accept, ' +
            'our Standard Terms and Conditions of Service and, for managed IT, a signed service level agreement. We send these with every quotation.',
        },
        {
          kind: 'p',
          text:
            `Prices on this website are ${VAT_NOTE} and describe our standard offers. The price that applies to you is the one on your written quotation. ` +
            'Prices and service details may change, and submitting a form or sending a message does not create a contract.',
        },
      ],
    },
    {
      id: 'information',
      heading: 'Information on this website',
      blocks: [
        {
          kind: 'p',
          text:
            'Our pages, blog posts and FAQs give general information about IT and our services. They are not advice for your specific situation, ' +
            'and anything we say about laws such as POPIA describes technical measures, not legal advice. ' +
            'We work to keep the website accurate and up to date, but it may contain errors, so please confirm anything important with us before you rely on it.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Using this website',
      blocks: [
        { kind: 'p', text: 'You may use this website for lawful purposes. You may not:' },
        {
          kind: 'list',
          items: [
            'try to gain unauthorised access to the website, its hosting or any connected system;',
            'interfere with how the website works, or overload it with automated requests;',
            'upload or send malicious code, spam or unlawful content, including through the contact form;',
            'pretend to be someone else when you contact us.',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      blocks: [
        {
          kind: 'p',
          text:
            `The text, design, graphics, code and logo on this website belong to ${company.legalName} or are used with permission. ` +
            'You may link to our pages and quote short extracts with a credit and a link back. Please ask us before reusing anything else.',
        },
        {
          kind: 'p',
          text:
            'Product and company names mentioned on this website, such as Microsoft, Google and the clients shown on our work page, belong to their owners. ' +
            'Client names are shown with their permission.',
        },
      ],
    },
    {
      id: 'links',
      heading: 'Links to other websites',
      blocks: [
        {
          kind: 'p',
          text:
            'We link to other websites, such as the sources in our blog posts. We are not responsible for their content or for how they handle your information.',
        },
      ],
    },
    {
      id: 'availability-liability',
      heading: 'Availability and liability',
      blocks: [
        {
          kind: 'p',
          text:
            'We aim to keep the website available, but cannot promise it will always be uninterrupted or free of errors. ' +
            'To the extent the law allows, we are not liable for any loss arising from your use of the website or from relying on its general information. ' +
            'Nothing in these terms limits any liability that cannot lawfully be limited, including under the Consumer Protection Act where it applies.',
        },
      ],
    },
    {
      id: 'banking-fraud',
      heading: 'Payments and banking fraud',
      blocks: [
        {
          kind: 'p',
          text:
            'Our banking details only appear on official invoices and deposit requests, never on this website. We will never ask you by email, WhatsApp or SMS ' +
            `to pay into a different or updated bank account. If you receive such a request, call us on ${phone} before you pay.`,
        },
      ],
    },
    {
      id: 'privacy',
      heading: 'Privacy and cookies',
      blocks: [
        {
          kind: 'p',
          text:
            'Our [privacy policy](/privacy-policy) explains how we handle personal information, and our [cookie policy](/cookie-policy) lists the cookies this website uses.',
        },
      ],
    },
    {
      id: 'company-information',
      heading: 'Company information',
      blocks: [
        {
          kind: 'table',
          head: ['Detail', ''],
          rows: [
            ['Legal name', company.legalName],
            ['Legal status', 'Private company registered in South Africa'],
            ['Registration number', company.registrationNumber],
            ['Director', informationOfficer.name],
            ['Address for legal notices', formatAddress(headOffice.address)],
            ['Email', email],
            ['Phone', phone],
            ['Website', `[${company.url.replace(/^https?:\/\//, '')}](${company.url})`],
          ],
        },
      ],
    },
    {
      id: 'law',
      heading: 'Governing law',
      blocks: [
        {
          kind: 'p',
          text:
            'These terms are governed by the laws of the Republic of South Africa. Disputes fall under the jurisdiction of the Magistrate’s Court ' +
            'or the High Court of South Africa, Gauteng Division, as applicable.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      blocks: [
        {
          kind: 'p',
          text: 'We may update these terms from time to time. The date at the top shows when they last changed.',
        },
      ],
    },
  ],
};