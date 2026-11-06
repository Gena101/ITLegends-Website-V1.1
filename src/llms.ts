// src/llms.ts
// Build-time only (exported through entry-server.tsx, never shipped to browsers).
// Generates dist/llms.txt (https://llmstxt.org) from src/data, so names, NAP, prices, response times
// and page URLs can't drift from the site. Replaces the hand-written public/llms.txt.
// Only pages that exist are listed; prerender.mjs fails the build if a listed URL wasn't rendered.
import { absoluteUrl } from './components/seo/url';
import { branches, company, formatAddress, getBranch } from './data/company';
import { industries, industryPath } from './data/industries';
import { industryPages } from './data/industry-pages';
import { branchPhrase, openHoursText } from './data/location-pages';
import { locationPath, locations } from './data/locations';
import {
  cloudBackup,
  contractTerms,
  assessmentRadiusText,
  formatRand,
  onboarding,
  plans,
  softwarePricing,
  VAT_NOTE,
  websitePricing,
  workspaceBackup,
} from './data/pricing';
import { pillars, servicePath, servicesByPillar } from './data/services';
import { countWord, joinList } from './lib/text';

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;

export function buildLlmsTxt(): string {
  const towns = joinList(branches.map((b) => b.address.locality));
  const areas = company.serviceArea.filter((a) => a !== 'Gauteng').join(', ');
  const planList = joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`));
  const { standardResponse, criticalResponse } = company.support;

  const lines: string[] = [
    `# ${company.name}`,
    '',
    `> ${company.legalName} is a managed IT services provider (MSP) for small and medium businesses in Gauteng, South Africa, ` +
      `with branches in ${towns}. It provides managed IT support, cybersecurity, cloud backup, server care, hardware and networks, ` +
      'structured cabling and business connectivity, plus website design and custom software development.',
    '',
    '## Key facts',
    '',
    `- Founded in ${company.foundingYear}. Company registration number ${company.registrationNumber}.`,
    ...branches.map((b) => `- ${b.name}: ${formatAddress(b.address)}.`),
    `- Hours (both branches): ${openHoursText}.`,
    `- Service area: ${areas} and the rest of Gauteng. Website design and custom software also serve clients elsewhere in South Africa and internationally.`,
    `- Support by phone, email and WhatsApp during business hours. Standard requests are acknowledged ${standardResponse}; ` +
      `critical issues ${criticalResponse}. These are acknowledgement times, not resolution times. ` +
      'Automated monitoring runs around the clock; people respond during business hours.',
    `- Managed IT plans, per device (PC or laptop) per month, ${VAT_NOTE}: ${planList}. Each plan includes everything in the plan before it. ` +
      `Month-to-month or 12 months (${contractTerms.annualDiscountPercent}% off, minimum ${contractTerms.annualMinDevices} devices).`,
    `- Cloud backup: ${formatRand(cloudBackup.pricePerDevice)} per backed-up device per month; Microsoft 365 / Google Workspace backup: ` +
      `${formatRand(workspaceBackup.pricePerUser)} per user per month (${VAT_NOTE}). Available with or without a managed IT plan. ` +
      'Backups are stored in South African data centres.',
    `- Free IT assessment within ${assessmentRadiusText} of either branch, with a written report within ` +
      `${countWord(onboarding.reportBusinessDays)} business days.`,
    `- Websites: basic website from ${formatRand(websitePricing.basicPrice)} (fixed price, ${VAT_NOTE}); website management ` +
      `${formatRand(websitePricing.managementMonthly)} per month. Custom software: fixed price after scoping, ` +
      `${softwarePricing.depositPercent}% deposit, support ${formatRand(softwarePricing.supportMonthly)} per month.`,
    `- Contact: ${company.phone.display} (phone and WhatsApp), ${company.email}.`,
    '',
    '## Services',
    '',
  ];

  for (const pillar of pillars) {
    for (const s of servicesByPillar(pillar.id)) {
      lines.push(link(s.name, servicePath(s.slug), `${pillar.name}. ${s.summary}`));
    }
  }

  lines.push('', '## Industries', '');
  for (const i of industries) {
    const page = industryPages[i.slug];
    lines.push(link(page.headline, industryPath(i.slug), page.metaDescription));
  }

  lines.push('', '## Locations', '');
  for (const l of locations) {
    const branch = getBranch(l.nearestBranch);
    lines.push(link(`IT support in ${l.name}`, locationPath(l.slug), `served from ${branchPhrase(branch).replace(/^our /, 'the ')} (${branch.name})`));
  }

  lines.push(
    '',
    '## Company',
    '',
    link('Pricing', '/pricing', 'managed IT plans, add-ons, backup and terms'),
    link('About', '/about', 'company story, timeline, team qualifications, B-BBEE level'),
    link('Contact', '/contact', 'branches, hours, contact form'),
    link('Services', '/services', 'all services by pillar'),
    link('FAQ', '/faq'),
    '',
    '## Optional',
    '',
    link('Blog', '/blog'),
    link('Privacy policy', '/privacy-policy'),
    '',
  );

  return lines.join('\n');
}