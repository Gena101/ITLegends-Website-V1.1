// src/data/services.ts
// The 10 services in three pillars. Phase 2 extends Service with full page content
// (direct-answer intro, features, FAQs, meta) for the data-driven ServicePage template.

export type PillarId = 'managed-it' | 'infrastructure' | 'digital';

export type ServiceSlug =
  | 'managed-it-support'
  | 'helpdesk'
  | 'cybersecurity'
  | 'cloud-backup'
  | 'server-maintenance'
  | 'hardware-network'
  | 'structured-cabling'
  | 'business-connectivity'
  | 'website-design'
  | 'custom-software';

export interface Pillar {
  id: PillarId;
  name: string;
  summary: string;
}

export interface Service {
  slug: ServiceSlug;
  pillar: PillarId;
  /** Must match the service name used on Google Business Profile */
  name: string;
  /** One sentence, used in nav, cards and the services hub */
  summary: string;
}

export const pillars: Pillar[] = [
  {
    id: 'managed-it',
    name: 'Managed IT',
    summary: 'Day-to-day support, security and backups for your business.',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    summary: 'The hardware, cabling and connectivity your business runs on.',
  },
  {
    id: 'digital',
    name: 'Digital',
    summary: 'Websites and software built around how your business works.',
  },
];

export const services: Service[] = [
  // Managed IT
  {
    slug: 'managed-it-support',
    pillar: 'managed-it',
    name: 'Managed IT Support',
    summary:
      'Proactive monitoring, maintenance and support, acting as your outsourced IT department for a predictable monthly cost.',
  },
  {
    slug: 'helpdesk',
    pillar: 'managed-it',
    name: 'Helpdesk & Remote Assistance',
    summary: 'Remote help for everyday IT problems, logged and tracked through our helpdesk.',
  },
  {
    slug: 'cybersecurity',
    pillar: 'managed-it',
    name: 'Cybersecurity & Protection',
    summary:
      'Endpoint protection, email filtering, firewall management and user awareness against ransomware and phishing.',
  },
  {
    slug: 'cloud-backup',
    pillar: 'managed-it',
    name: 'Cloud & Backup Solutions',
    summary:
      'Microsoft 365 and Google Workspace, cloud migrations, automated offsite backups and disaster recovery planning.',
  },
  {
    slug: 'server-maintenance',
    pillar: 'managed-it',
    name: 'Server Maintenance & Monitoring',
    summary: 'Continuous server health monitoring, patch management and preventative maintenance.',
  },

  // Infrastructure
  {
    slug: 'hardware-network',
    pillar: 'infrastructure',
    name: 'Hardware & Network Setup',
    summary: 'Supply, installation and configuration of computers, routers, switches and Wi-Fi access points.',
  },
  {
    slug: 'structured-cabling',
    pillar: 'infrastructure',
    name: 'Structured Cabling & Cable Management',
    summary: 'Structured network cabling and tidy, labelled cable management for offices and server cabinets.',
  },
  {
    slug: 'business-connectivity',
    pillar: 'infrastructure',
    name: 'Business Connectivity',
    summary: 'Business internet of any type, including fibre, fixed LTE and air fibre, sourced from upstream providers.',
  },

  // Digital
  {
    slug: 'website-design',
    pillar: 'digital',
    name: 'Website Design & Development',
    summary: 'Fast, search-optimised business websites, designed and built in-house.',
  },
  {
    slug: 'custom-software',
    pillar: 'digital',
    name: 'Custom Software Development',
    summary:
      'Bespoke business software and web apps for local and international clients, built around your processes.',
  },
];

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: PillarId): Service[] {
  return services.filter((s) => s.pillar === pillar);
}