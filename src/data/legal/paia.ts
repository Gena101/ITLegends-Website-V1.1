// src/data/legal/paia.ts
// PAIA manual (section 51), structured on the Information Regulator's template for private bodies.
// Fees: Annexure B to the PAIA Regulations, 2021 (GN R.757, GG 45057, 27 Aug 2021): request fee R140 (checked Nov 2026).
// Information Officer registered with the Regulator on eServices (06 Nov 2026); details in shared.ts.
// PAIA annual report due to the Regulator by 30 June each year. Reviewed by an attorney: NO (Nov 2026).
import { company, formatAddress, getBranch } from '../company';
import { formatDate } from '../../lib/text';
import { informationOfficer, operators, securityMeasures } from './shared';
import type { LegalDoc } from './types';

const headOffice = getBranch('johannesburg');
const email = `[${company.email}](mailto:${company.email})`;
const phone = `[${company.phone.display}](${company.phone.href})`;
const regulator = '[Information Regulator website](https://inforegulator.org.za)';

/** Request fee for a private body (Annexure B, PAIA Regulations 2021) */
const REQUEST_FEE = 'R140';

export const paiaManual: LegalDoc = {
  title: 'PAIA manual',
  metaTitle: 'PAIA Manual | IT Legends',
  metaDescription:
    'IT Legends PAIA manual: the records we hold, how to request access, fees, our Information Officer and how we process personal information under POPIA.',
  intro:
    'This manual explains how to request access to records held by IT Legends under the Promotion of Access to Information Act (PAIA): ' +
    'which records we hold, which are freely available, how to make a request, the fees involved, and how we process personal information under POPIA.',
  lastUpdated: '2026-11-10',
  sections: [
    {
      id: 'about',
      heading: 'About this manual',
      blocks: [
        {
          kind: 'p',
          text:
            `This manual is published by ${company.legalName} (registration number ${company.registrationNumber}), a private body under PAIA, ` +
            'in terms of section 51 of PAIA. It was compiled on 6 November 2026 and is reviewed whenever our records or processes change.',
        },
      ],
    },
    {
      id: 'contact-details',
      heading: 'Contact details',
      blocks: [
        {
          kind: 'table',
          head: ['Detail', ''],
          rows: [
            ['Head of the private body and Information Officer', `${informationOfficer.name} (${informationOfficer.title})`],
            ['Registered with the Information Regulator', `Yes, registration number ${informationOfficer.registrationNumber} (${formatDate(informationOfficer.registeredOn)})`],
            ['Deputy Information Officer', 'None designated'],
            ['Email', email],
            ['Phone', phone],
            ['Physical and postal address', formatAddress(headOffice.address)],
            ['Website', `[${company.url.replace(/^https?:\/\//, '')}](${company.url})`],
          ],
        },
      ],
    },
    {
      id: 'guide',
      heading: 'The Information Regulator’s guide to PAIA',
      blocks: [
        {
          kind: 'p',
          text:
            'The Information Regulator publishes a guide on how to use PAIA and POPIA. It explains your rights, how to make a request, ' +
            'the help available from the Regulator and the remedies available if a request is refused. ' +
            `The guide is available in all official languages and in braille, on the ${regulator} and from the Regulator’s offices.`,
        },
      ],
    },
    {
      id: 'available-records',
      heading: 'Records available without a request',
      blocks: [
        {
          kind: 'p',
          text: 'The following information is freely available on this website, without a formal request:',
        },
        {
          kind: 'list',
          items: [
            'information about our services, industries and service areas;',
            'our managed IT plans, standard prices and terms ([pricing](/pricing));',
            'company information, including our B-BBEE level ([about](/about));',
            'our [privacy policy](/privacy-policy), [cookie policy](/cookie-policy), [terms of use](/terms) and this manual.',
          ],
        },
      ],
    },
    {
      id: 'legislation',
      heading: 'Records kept in terms of other laws',
      blocks: [
        {
          kind: 'p',
          text: 'We keep records as required by the following laws, where they apply to us:',
        },
        {
          kind: 'list',
          items: [
            'Companies Act 71 of 2008',
            'Tax Administration Act 28 of 2011',
            'Income Tax Act 58 of 1962',
            'Value-Added Tax Act 89 of 1991',
            'Basic Conditions of Employment Act 75 of 1997',
            'Employment Equity Act 55 of 1998',
            'Labour Relations Act 66 of 1995',
            'Unemployment Insurance Act 63 of 2001',
            'Compensation for Occupational Injuries and Diseases Act 130 of 1993',
            'Occupational Health and Safety Act 85 of 1993',
            'Skills Development Levies Act 9 of 1999',
            'Broad-Based Black Economic Empowerment Act 53 of 2003',
            'Consumer Protection Act 68 of 2008',
            'Electronic Communications and Transactions Act 25 of 2002',
            'Protection of Personal Information Act 4 of 2013',
            'Promotion of Access to Information Act 2 of 2000',
          ],
        },
      ],
    },
    {
      id: 'records-held',
      heading: 'Categories of records we hold',
      blocks: [
        {
          kind: 'table',
          head: ['Subject', 'Records'],
          rows: [
            ['Company', 'Incorporation documents, CIPC records, share register, directors’ records, B-BBEE certificate'],
            ['Finance and tax', 'Accounting records, invoices, statements, tax and VAT returns, banking records'],
            ['Clients', 'Quotations, accepted terms, service level agreements, correspondence, service and support records, asset registers, site reports'],
            ['Suppliers and service providers', 'Agreements, orders, invoices and correspondence'],
            ['Employment', 'Employment contracts, payroll and statutory records for staff and contractors, where applicable'],
            ['Information technology', 'Internal policies, system documentation and security records'],
            ['Marketing', 'Website content and enquiries received through the website'],
          ],
        },
        {
          kind: 'p',
          text:
            'Listing a category does not mean every record in it will be released. Access may be refused on the grounds set out in PAIA, ' +
            'for example to protect another person’s privacy, a third party’s commercial information or confidential information.',
        },
      ],
    },
    {
      id: 'request-procedure',
      heading: 'How to request access',
      blocks: [
        {
          kind: 'list',
          items: [
            `Complete Form 2 (Request for Access to Record), available on the ${regulator}.`,
            `Send it to our Information Officer at ${email}, or deliver it to the address above.`,
            'Describe the record you want in enough detail for us to find it, the form of access you want (for example a copy or an inspection), ' +
              'and the right you want to exercise or protect, with reasons why the record is needed for it.',
            'If you are requesting on behalf of someone else, include proof of your authority to do so.',
            'Include proof of identity.',
          ],
        },
        {
          kind: 'p',
          text:
            'We will decide on your request within 30 days and tell you the outcome. PAIA allows this period to be extended once, by up to 30 days, ' +
            'in specific circumstances; if that happens, we will tell you why. If you are not satisfied with our decision, you may complain to the ' +
            'Information Regulator or apply to court, within the time limits set by PAIA.',
        },
      ],
    },
    {
      id: 'fees',
      heading: 'Fees',
      blocks: [
        {
          kind: 'p',
          text:
            `A request fee of ${REQUEST_FEE} applies to a request for records, except when you request records containing your own personal information. ` +
            'If access is granted, an access fee may apply for searching for, preparing and copying the records. ' +
            'All fees are prescribed in Annexure B to the PAIA Regulations, 2021, and we will tell you what is payable before we process a request.',
        },
      ],
    },
    {
      id: 'personal-information',
      heading: 'How we process personal information',
      blocks: [
        {
          kind: 'p',
          text:
            'We process personal information to respond to enquiries, provide and bill for our services, keep the records the law requires, ' +
            'measure website use with consent, and keep our website and systems secure. Our [privacy policy](/privacy-policy) has the full details.',
        },
        { kind: 'p', text: 'Categories of people whose information we process:' },
        {
          kind: 'list',
          items: [
            'clients and the people we deal with at our clients;',
            'people who enquire through our website, by phone, email or WhatsApp;',
            'suppliers and service providers, and their contact people;',
            'staff and contractors, where applicable;',
            'visitors to this website.',
          ],
        },
        {
          kind: 'p',
          text:
            'The information includes names, contact details, company details, billing and contract information, service records, ' +
            'enquiry content and website usage data. We do not ask for special personal information.',
        },
        { kind: 'p', text: 'Recipients: we share information with these service providers, and with our accountant, bank and authorities where required:' },
        {
          kind: 'table',
          head: ['Provider', 'What they do', 'Where'],
          rows: operators.map((o) => [o.name, o.role, o.where]),
        },
        {
          kind: 'p',
          text:
            'Cross-border transfers: some of these providers process information outside South Africa, mainly in the United States, ' +
            'under terms that include data protection commitments. Security: ' +
            securityMeasures.charAt(0).toLowerCase() +
            securityMeasures.slice(1),
        },
      ],
    },
    {
      id: 'availability',
      heading: 'Availability of this manual',
      blocks: [
        {
          kind: 'p',
          text:
            'This manual is available on this website and for inspection at our head office during business hours. ' +
            'Copies can also be requested from our Information Officer.',
        },
      ],
    },
  ],
};