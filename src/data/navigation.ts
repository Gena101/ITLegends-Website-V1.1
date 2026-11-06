// src/data/navigation.ts
// Navbar, mobile nav and footer all read from here. Built from the other data files,
// so adding a service, industry or location updates every menu automatically.

import { pillars, servicesByPillar, servicePath } from './services';
import { industries, industryPath } from './industries';
import { locations, locationPath } from './locations';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  description?: string;
  links: NavLink[];
}

export type PrimaryNavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'mega'; label: string; href: string; groups: NavGroup[] }
  | { kind: 'dropdown'; label: string; links: NavLink[] };

/** Service groups by pillar (mega-menu and footer) */
export const serviceGroups: NavGroup[] = pillars.map((p) => ({
  label: p.name,
  description: p.summary,
  links: servicesByPillar(p.id).map((s) => ({ label: s.name, href: servicePath(s.slug) })),
}));

export const primaryNav: PrimaryNavItem[] = [
  { kind: 'mega', label: 'Services', href: '/services', groups: serviceGroups },
  {
    kind: 'dropdown',
    label: 'Industries',
    links: industries.map((i) => ({ label: i.name, href: industryPath(i.slug) })),
  },
  { kind: 'link', label: 'Pricing', href: '/pricing' },
  { kind: 'link', label: 'Our work', href: '/work' },
  { kind: 'link', label: 'About', href: '/about' },
  { kind: 'link', label: 'Blog', href: '/blog' },
];

export const primaryCta: NavLink = { label: 'Contact us', href: '/contact' };

export const footerNav = {
  services: serviceGroups,
  company: {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our work', href: '/work' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  } satisfies NavGroup,
  areas: {
    label: 'Areas we serve',
    links: locations.map((l) => ({ label: `IT support ${l.name}`, href: locationPath(l.slug) })),
  } satisfies NavGroup,
  legal: {
    label: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms of use', href: '/terms' },
      { label: 'Cookie policy', href: '/cookie-policy' },
      { label: 'PAIA manual', href: '/paia' },
    ],
  } satisfies NavGroup,
};