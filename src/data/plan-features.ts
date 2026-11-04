// src/data/plan-features.ts
// What each managed IT plan includes. Pricing page only: keep it out of shared components.
// Plan cards ("Everything in X, plus…") and the comparison table are both generated from this list.

import { company } from './company';
import { getPlan, onsite, planAddOns, formatRand, type PlanId, plans } from './pricing';
import { countWord } from '../lib/text';

export type FeatureValue =
  | { kind: 'included'; detail?: string }
  | { kind: 'addOn'; detail: string }
  | { kind: 'none' };

const yes: FeatureValue = { kind: 'included' };
const no: FeatureValue = { kind: 'none' };
const detail = (text: string): FeatureValue => ({ kind: 'included', detail: text });
const addOn = (text: string): FeatureValue => ({ kind: 'addOn', detail: text });

export type FeatureGroupId = 'support' | 'maintenance' | 'accounts' | 'security' | 'planning';

export interface PlanFeature {
  id: string;
  group: FeatureGroupId;
  /** Row label in the table; card text when the value has no detail */
  label: string;
  values: Record<PlanId, FeatureValue>;
}

export const featureGroups: { id: FeatureGroupId; label: string }[] = [
  { id: 'support', label: 'Support' },
  { id: 'maintenance', label: 'Monitoring and maintenance' },
  { id: 'accounts', label: 'Accounts and Microsoft 365 / Google Workspace' },
  { id: 'security', label: 'Security' },
  { id: 'planning', label: 'Reporting and planning' },
];

const all = (v: FeatureValue): Record<PlanId, FeatureValue> => ({ essential: v, managed: v, complete: v });
const from = (first: PlanId): Record<PlanId, FeatureValue> => {
  const start = plans.findIndex((p) => p.id === first);
  return Object.fromEntries(plans.map((p, i) => [p.id, i >= start ? yes : no])) as Record<PlanId, FeatureValue>;
};

const visits = (id: PlanId) => `${countWord(getPlan(id).onsiteVisitsPerMonth)} a month`;
const complete = getPlan('complete');
if (!complete.pricePerServer) throw new Error('Complete Care needs pricePerServer in pricing.ts');
const webrootAddOn = `Webroot, ${formatRand(planAddOns.webroot.pricePerDevice)} per device a month`;
const drAddOn = `${formatRand(planAddOns.disasterRecoveryPlan.onceOff)} once-off`;

export const planFeatures: PlanFeature[] = [
  // Support
  {
    id: 'helpdesk',
    group: 'support',
    label: 'Remote helpdesk by phone, email and WhatsApp during business hours',
    values: all(yes),
  },
  {
    id: 'critical-response',
    group: 'support',
    label: `Critical issues acknowledged ${company.support.criticalResponse}`,
    values: all(yes),
  },
  {
    id: 'printers',
    group: 'support',
    label: 'Remote printer troubleshooting',
    values: all(yes),
  },
  {
    id: 'onsite',
    group: 'support',
    label: `On-site visits within ${onsite.radiusKm} km of either branch`,
    values: {
      essential: detail(visits('essential')),
      managed: detail(visits('managed')),
      complete: detail(visits('complete')),
    },
  },

  // Monitoring and maintenance
  {
    id: 'monitoring',
    group: 'maintenance',
    label: 'Automated device monitoring and alerts',
    values: all(yes),
  },
  {
    id: 'patching',
    group: 'maintenance',
    label: 'Operating system and third-party app patching',
    values: all(yes),
  },
  {
    id: 'asset-register',
    group: 'maintenance',
    label: 'Asset register kept up to date',
    values: all(yes),
  },
  {
    id: 'proactive-maintenance',
    group: 'maintenance',
    label: 'Proactive maintenance: health checks and fixing issues before your team notices',
    values: from('managed'),
  },
  {
    id: 'server-care',
    group: 'maintenance',
    label: 'Server care',
    values: {
      essential: no,
      managed: no,
      complete: detail(`${formatRand(complete.pricePerServer)} per server a month`),
    },
  },

  // Accounts
  {
    id: 'user-admin',
    group: 'accounts',
    label: 'User accounts and mailboxes: new users, leavers and password resets',
    values: all(yes),
  },
  {
    id: 'tenant-admin',
    group: 'accounts',
    label: 'Tenant administration: licences, security settings, SharePoint, Teams and shared drives',
    values: from('managed'),
  },

  // Security
  {
    id: 'endpoint-protection',
    group: 'security',
    label: 'Endpoint protection',
    values: {
      essential: detail('Microsoft Defender, configured and monitored'),
      managed: detail('Webroot'),
      complete: detail('Webroot'),
    },
  },
  {
    id: 'webroot-addon',
    group: 'security',
    label: 'Webroot on Essential Care',
    values: { essential: addOn(webrootAddOn), managed: no, complete: no },
  },
  {
    id: 'mfa',
    group: 'security',
    label: 'Multi-factor authentication (MFA) set up and enforced',
    values: all(yes),
  },
  {
    id: 'awareness-training',
    group: 'security',
    label: 'Staff security awareness training',
    values: all(yes),
  },
  {
    id: 'popia',
    group: 'security',
    label: 'Help with POPIA technical safeguards',
    values: all(yes),
  },
  {
    id: 'email-filtering',
    group: 'security',
    label: 'Email filtering',
    values: from('managed'),
  },
  {
    id: 'firewall',
    group: 'security',
    label: 'Firewall management, where you have one',
    values: from('managed'),
  },
  {
    id: 'security-reviews',
    group: 'security',
    label: 'Quarterly security reviews: close calls and suspicious software on your devices',
    values: from('complete'),
  },

  // Reporting and planning
  {
    id: 'monthly-reporting',
    group: 'planning',
    label: 'Monthly reporting',
    values: from('managed'),
  },
  {
    id: 'it-planning',
    group: 'planning',
    label: 'Quarterly IT planning, on-site or online',
    values: from('complete'),
  },
  {
    id: 'vendor-liaison',
    group: 'planning',
    label: 'Liaison with your other IT vendors and internet providers',
    values: from('complete'),
  },
  {
    id: 'dr-planning',
    group: 'planning',
    label: 'Disaster recovery planning',
    values: { essential: addOn(drAddOn), managed: addOn(drAddOn), complete: yes },
  },
];

/** Card line: "Endpoint protection: Webroot", or the label when there is no detail */
export function featureText(feature: PlanFeature, id: PlanId): string {
  const v = feature.values[id];
  return v.kind === 'included' && v.detail ? `${feature.label}: ${v.detail}` : feature.label;
}

/** Items a plan adds over the plan below it (all items for the first plan) */
export function planCardItems(id: PlanId): string[] {
  const index = plans.findIndex((p) => p.id === id);
  const previous = index > 0 ? plans[index - 1].id : null;
  return planFeatures
    .filter((f) => {
      const v = f.values[id];
      if (v.kind !== 'included') return false;
      if (!previous) return true;
      const p = f.values[previous];
      return p.kind !== 'included' || p.detail !== v.detail;
    })
    .map((f) => featureText(f, id));
}

/** Always quoted separately, on every plan */
export const notIncluded: string[] = [
  'Hardware and software licences (we can supply them, quoted separately)',
  'Installation and development projects',
  'Printer servicing and maintenance',
];