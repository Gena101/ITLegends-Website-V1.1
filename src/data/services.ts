// src/data/services.ts
// The six managed-IT services (02 §1 SERVICE LINES, line 1 only - custom dev,
// LTE resale and structured cabling get no pages).
//
// One entry per service page. `summary` is the homepage card line and must
// stay claim-free: it says what the service IS, never what IT Legends
// guarantees. Every figure, response time and inclusion comes from
// company.ts, on the page, never from here.
//
// `path` must exist in routes.json. Order is the display order on the
// homepage and in the nav: managed IT first, it is the commercial focus.
import {
  Cloud,
  Headphones,
  LifeBuoy,
  Network,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export type ServiceId =
  | 'managed-it-support'
  | 'cybersecurity'
  | 'cloud-backup'
  | 'server-maintenance'
  | 'helpdesk'
  | 'hardware-network';

export type Service = {
  id: ServiceId;
  /** Must match a path in routes.json. */
  path: string;
  /** Card heading and nav label. */
  name: string;
  /** Homepage card line. Claim-free: what it is, not what we promise. */
  summary: string;
  icon: LucideIcon;
};

export const services: readonly Service[] = [
  {
    id: 'managed-it-support',
    path: '/services/managed-it-support',
    name: 'Managed IT Support',
    summary:
      'Day-to-day IT handles on one fixed monthly fee, instead of a call-out every time something breaks.',
    icon: LifeBuoy,
  },
  {
    id: 'cybersecurity',
    path: '/services/cybersecurity',
    name: 'Cybersecurity',
    summary:
      'Protection against ransomware and phising, and the security controls POPIA expects of a business holding client data.',
    icon: ShieldCheck,
  },
  {
    id: 'cloud-backup',
    path: '/services/cloud-backup',
    name: 'Cloud Backup',
    summary:
      'Business data copied off-site, so a failed drive on a ransomware hit is an inconvenience rather than a closure.',
    icon: Cloud,
  },
  {
    id: 'server-maintenance',
    path: '/services/server-maintenance',
    name: 'Server Maintenance',
    summary:
      'Keeping the server your business runs on patched and healthy, with a plan for when it needs replacing.',
    icon: Server,
  },
  {
    id: 'helpdesk',
    path: '/services/helpdesk',
    name: 'IT Helpdesk',
    summary:
      'One place for your staff to log a problem, with a response time written into your agreement.',
    icon: Headphones,
  },
  {
    id: 'hardware-network',
    path: '/services/hardware-network',
    name: 'Hardware and Network',
    summary:
      'Specifying, supplying and setting up the workstations, switches, Wi-Fi and cabling your office runs on.',
    icon: Network,
  },
];

/** Nav-shaped links, so navigation.ts and this file cannot drift apart. */
export const serviceNavLinks = services.map((s) => ({ label: s.name, to: s.path }));

export function serviceByPath(path: string): Service | undefined {
  return services.find((s) => s.path === path);
}