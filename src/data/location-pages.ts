// src/data/location-pages.ts
// Content for the location pages, read by the LocationPage template.
// Kept OUT of locations.ts on purpose: that file ships in the main bundle (footer, schema graph),
// this file only ships in the location-page chunk.
// Confirmed facts only (Nov 2026): Eugene has clients in every listed area; areas are served from
// their nearestBranch; the 20 km radius is measured BY ROAD from either branch.
// No local claims beyond that (no suburbs, landmarks or travel times until Eugene supplies them).
// NAP, hours, prices, radii and response times are interpolated, never typed into the copy.
import { company, getBranch, openingHours, formatHours, type Branch, type BranchId } from './company';
import type { FaqItem } from './faqs';
import { childLocations, locations, type LocationSlug, type ServiceLocation } from './locations';
import { formatRand, onboarding, onsite, plans, startingPrice, VAT_NOTE } from './pricing';
import { countWord, joinList } from '../lib/text';

export interface LocationPageContent {
  /** Full <title>, ≤ 60 characters */
  metaTitle: string;
  /** ≤ 160 characters */
  metaDescription: string;
  /** The page's H1 */
  headline: string;
  /** 40–60 word direct answer under the H1 (AEO); also the Service schema description */
  intro: string;
  /** Visible FAQ list AND FAQPage schema (same array) */
  faqs: FaqItem[];
}

// ---------- Shared values ----------

const { standardResponse, criticalResponse, criticalAfterHours } = company.support;
const callout = formatRand(onsite.calloutFee);
const perKm = formatRand(onsite.travelPerKm);
const radius = `${onsite.radiusKm} km by road`;

/** "Mon–Fri 09:00–17:00 and Sat 09:00–13:00" */
export const openHoursText = joinList(
  openingHours.filter((h) => h.opens && h.closes).map((h) => `${h.label} ${formatHours(h)}`),
);

/** How each branch is described in copy */
const branchRole: Record<BranchId, string> = {
  johannesburg: 'head office',
  pretoria: 'branch',
};

/** "our head office in Roodepoort" / "our branch in Centurion" */
export function branchPhrase(branch: Branch): string {
  return `our ${branchRole[branch.id]} in ${branch.address.locality}`;
}

/** "715 Elm Street, Grobler Park" */
const street = (b: Branch) => `${b.address.streetAddress}, ${b.address.suburb}`;

/** Shown on every location page (approved wording, Nov 2026) */
export const coverageText =
  `Included on-site visits and the free IT assessment cover addresses within ${radius} of either branch. ` +
  `Beyond that, travel is ${perKm} per km, and the assessment is a ${callout} call-out.`;

/** "Essential Care R449, Managed Care R699 and Complete Care R949" */
const planPrices = joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`));

const services = 'managed IT, cybersecurity, cloud backup, networks and connectivity';

// ---------- Builder ----------

function buildPage(loc: ServiceLocation): LocationPageContent {
  const branch = getBranch(loc.nearestBranch);
  const town = branch.address.locality;
  const hasOffice = town === loc.name;
  const children = childLocations(loc.slug).map((c) => c.name);

  // Where we serve the area from
  const from = hasOffice ? `our ${branchRole[branch.id]} at ${street(branch)}` : branchPhrase(branch);
  const scope = children.length > 0 ? `across ${loc.name}, including ${joinList(children)},` : `in ${loc.name}`;

  const intro =
    `IT Legends supports businesses ${scope} from ${from}, with ${services}. ` +
    `We already look after clients in ${loc.name}, help them by phone, email and WhatsApp, visit on site, ` +
    `and acknowledge critical issues ${criticalResponse}.`;

  const officeFaq: FaqItem = hasOffice
    ? {
        question: `Where is your ${loc.name} office?`,
        answer:
          `Our ${loc.name} ${branchRole[branch.id]} (${branch.name}) is at ${street(branch)}, ${town}, ${branch.address.postalCode}. ` +
          `It is open ${openHoursText}.`,
      }
    : {
        question: `Do you have an office in ${loc.name}?`,
        answer:
          `Businesses in ${loc.name} are served from ${branchPhrase(branch)} (${branch.name}), at ${street(branch)}, ${town}. ` +
          `Much of our support is remote, by phone, email and WhatsApp, and we come on site when needed. We're open ${openHoursText}.`,
      };

  return {
    metaTitle: `IT Support in ${loc.name} | Managed IT | ${company.name}`,
    metaDescription:
      `IT support in ${loc.name}: managed IT, cybersecurity, cloud backup and networks from ${branchPhrase(branch)}. ` +
      `Plans from ${formatRand(startingPrice)} per device, ${VAT_NOTE}.`,
    headline: `IT support in ${loc.name}`,
    intro,
    faqs: [
      officeFaq,
      {
        question: `Do you come on site in ${loc.name}?`,
        answer:
          `Yes. Managed IT plans include on-site visits within ${radius} of either branch; beyond that, travel is ${perKm} per km. ` +
          `Extra visits are a ${callout} call-out, including the first hour of work. Many issues can be solved remotely, ` +
          'by phone, email and WhatsApp.',
      },
      {
        question: `How quickly do you respond to businesses in ${loc.name}?`,
        answer:
          `We acknowledge standard requests ${standardResponse} and critical issues, including a suspected security breach, ${criticalResponse}. ` +
          `${criticalAfterHours} These are times to acknowledge a request, not to resolve it. ` +
          'Automated monitoring runs around the clock.',
      },
      {
        question: `Is the IT assessment free in ${loc.name}?`,
        answer:
          `It's free within ${radius} of either branch. Further away in Gauteng it's a ${callout} call-out, credited against your first invoice ` +
          `if you sign a 12-month agreement. You get a written report within ${countWord(onboarding.reportBusinessDays)} business days, ` +
          'and it’s yours to keep either way.',
      },
      {
        question: `How much does IT support cost in ${loc.name}?`,
        answer:
          `Managed IT is priced per device (PC or laptop) per month: ${planPrices}, ${VAT_NOTE}. The price is the same across Gauteng; ` +
          'only on-site travel beyond the included radius is extra.',
      },
    ],
  };
}

export const locationPages: Record<LocationSlug, LocationPageContent> = Object.fromEntries(
  locations.map((l) => [l.slug, buildPage(l)]),
) as Record<LocationSlug, LocationPageContent>;