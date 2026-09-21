// src/data/navigation.ts
// Navigation structure - 08-REDESIGN-BRIEF §5.
// Every link is filtered against routes.json: a link renders only once its
// page exists, and a group with no live links is omitted. So pages appear in
// the header and footer automatically in the phase that builds them.
// CRAWLER RULE: Header, MobileNav and Footer must render every returned link
// in the HTML at all times (visually hidden when closed), never mounted on
// hover or click.
import routesData from './routes.json';

export type NavLink = { label: string; to: string };

export type NavGroup = {
  id: 'services' | 'industries' | 'locations';
  label: string;
  items: NavLink[];
};

const livePaths = new Set(routesData.routes.map((r) => r.path));

export function isLive(path: string): boolean {
  return livePaths.has(path);
}

function live(links: NavLink[]): NavLink[] {
  return links.filter((l) => isLive(l.to));
}

// ----------------------------------------------------------------- link sets

const services: NavLink[] = [
  { label: 'Managed IT Support', to: '/services/managed-it-support' },
  { label: 'Cybersecurity', to: '/services/cybersecurity' },
  { label: 'Cloud Backup', to: '/services/cloud-backup' },
  { label: 'Server Maintenance', to: '/services/server-maintenance' },
  { label: 'IT Helpdesk', to: '/services/helpdesk' },
  { label: 'Hardware and Network', to: '/services/hardware-network' },
];

const industries: NavLink[] = [
  { label: 'Accountants', to: '/it-support-for-accountants' },
  { label: 'Law firms', to: '/it-support-for-law-firms' },
  { label: 'Medical practices', to: '/it-support-for-medical-practices' },
  { label: 'Insurance brokers', to: '/it-support-for-insurance-brokers' },
  // Slug held until the automotive client type is chosen in Phase 5.
  { label: 'Automotive', to: '/it-support-for-automotive' },
];

const areasHub: NavLink = { label: 'All areas', to: '/it-support-gauteng' };

const areas: NavLink[] = [
  { label: 'Johannesburg', to: '/it-support-johannesburg' },
  { label: 'Pretoria', to: '/it-support-pretoria' },
  { label: 'Roodepoort', to: '/it-support-roodepoort' },
  { label: 'Centurion', to: '/it-support-centurion' },
  { label: 'Midrand' , to: '/it-support-midrand' },
  { label: 'Sandton', to: '/it-support-sandton' },
];

const company: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy policy', to: '/privacy-policy' },
];

// ----------------------------------------------------------------- header
// Order: Services ▾ · Pricing · Industries ▾ · Locations ▾ · About · Contact
// Services and Industries have no index page: the top item is a button.

export type HeaderItem =
  | { kind: 'group'; group: NavGroup }
  | { kind: 'link'; link: NavLink };

function group(id: NavGroup['id'], label: string, items: NavLink[]): HeaderItem | null {
  const liveItems = live(items);
  return liveItems.length ? { kind: 'group', group: { id, label, items: liveItems } } : null;
}

function link(l: NavLink): HeaderItem | null {
  return isLive(l.to) ? { kind: 'link', link: l } : null;
}

export const headerNav: HeaderItem[] = [
  group('services', 'Services', services),
  link({ label: 'Pricing', to: '/pricing' }),
  group('industries', 'Industries', industries),
  group('locations', 'Locations', [areasHub, ...areas]),
  link({ label: 'About', to: '/about' }),
  link({ label: 'Contact', to: '/contact' }),
].filter((i): i is HeaderItem => i !== null);

/** Red header button. Null until /contact is live (Phase 3). */
export const headerCta: NavLink | null = isLive('/contact')
  ? { label: 'Contact us', to: '/contact' }
  : null;

// ----------------------------------------------------------------- footer
// Five columns: Brand (rendered by Footer) · Services · Industries · Areas · Company

export type FooterColumn = { id: string; heading: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  { id: 'services', heading: 'Services', links: live(services) },
  { id: 'industries', heading: 'Industries', links: live(industries) },
  { id: 'areas', heading: 'Areas', links: live([areasHub, ...areas]) },
  { id: 'company', heading: 'Company', links: live(company) },
].filter((c) => c.links.length > 0);