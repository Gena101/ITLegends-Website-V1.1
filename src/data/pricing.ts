// src/data/pricing.ts
// Managed IT plans and commercial terms (all prices excl. VAT).
// Pages interpolate these values; never type a price or term into copy.
// What each plan includes lives in plan-features.ts (pricing page only, kept out of the shared bundle).

export type PlanId = 'essential' | 'managed' | 'complete';

export interface Plan {
  id: PlanId;
  name: string;
  /** Rand per device (PC or laptop) per month, excl. VAT */
  pricePerDevice: number;
  /** Rand per server per month, excl. VAT (Complete Care only) */
  pricePerServer?: number;
  /** On-site visits included per month, within onsite.radiusKm of either branch. Unused visits do not roll over. */
  onsiteVisitsPerMonth: number;
}

export const plans: Plan[] = [
  { id: 'essential', name: 'Essential Care', pricePerDevice: 449, onsiteVisitsPerMonth: 1 },
  { id: 'managed', name: 'Managed Care', pricePerDevice: 699, onsiteVisitsPerMonth: 2 },
  { id: 'complete', name: 'Complete Care', pricePerDevice: 949, pricePerServer: 1495, onsiteVisitsPerMonth: 2 },
];

/** On-site support beyond the visits included in a plan */
export const onsite = {
  /** Included visits and the call-out fee cover this distance from either branch; beyond it, travel is per km */
  radiusKm: 20,
  /** Per additional visit within radiusKm, excl. VAT; includes the first hour of labour */
  calloutFee: 650,
  /** Travel beyond radiusKm, Rand per km, excl. VAT */
  travelPerKm: 4.5,
} as const;

/** Work outside the plan's scope, Rand per hour, excl. VAT */
export const outOfScopeHourly = 450;

/** Optional extras on the managed IT plans, excl. VAT */
export const planAddOns = {
  /** Webroot on Essential Care (Managed and Complete Care include it), per device per month */
  webroot: { pricePerDevice: 13, availableOn: ['essential'] as PlanId[] },
  /** Disaster recovery plan, once-off (included in Complete Care) */
  disasterRecoveryPlan: { onceOff: 799, includedIn: ['complete'] as PlanId[] },
} as const;

/**
 * Cloud backup add-on, available on any plan. The client chooses which devices are backed up;
 * a server counts as one backup device. Not included in the server care fee.
 */
export const cloudBackup = {
  /** Per backed-up device (PC, laptop or server) per month, excl. VAT */
  pricePerDevice: 249,
  /** Storage included per backed-up device, pooled across the client's site (4 devices = 1,000 GB) */
  includedStorageGbPerDevice: 250,
  /** Storage beyond the pool, Rand per GB per month, excl. VAT (also applies to extra data from longer retention) */
  overagePerGb: 0.5,
  /** Retention included in the price */
  includedRetentionDays: 30,
  /** Longer retention, per site per month, excl. VAT */
  retentionOptions: [
    { days: 60, pricePerSite: 350 },
    { days: 90, pricePerSite: 650 },
    { days: 180, pricePerSite: 1400 },
    { days: 365, pricePerSite: 2900 },
  ],
} as const;

/**
 * Microsoft 365 / Google Workspace backup add-on, per user, available on any plan.
 * Covers mail, OneDrive or Drive, calendars and contacts.
 * SharePoint, Teams and shared drives need a per-tenant licence: quoted.
 */
export const workspaceBackup = {
  /** Per backed-up user per month, excl. VAT */
  pricePerUser: 99,
  /** Storage included per user, pooled across the client's tenant; beyond it, cloudBackup.overagePerGb */
  includedStorageGbPerUser: 50,
  /** Retention included (longer than Microsoft's and Google's own recycle bins) */
  includedRetentionDays: 365,
} as const;

/** From first contact to live support */
export const onboarding = {
  /** The IT assessment is free within this distance of either branch; beyond it the call-out fee applies */
  freeAssessmentRadiusKm: 20,
  /** Assessment report sent within this many business days of the visit */
  reportBusinessDays: 2,
  /** Agents deployed within this many business days of accepting the quote */
  deploymentBusinessDays: 5,
} as const;

/**
 * The radius is always measured BY ROAD from either branch. Use these in copy
 * instead of `${onsite.radiusKm} km`, so the wording can't drift: "20 km by road".
 */
export const onsiteRadiusText = `${onsite.radiusKm} km by road`;
export const assessmentRadiusText = `${onboarding.freeAssessmentRadiusKm} km by road`;

/** Month-to-month or 12 months, the client's choice */
export const contractTerms = {
  annualDiscountPercent: 10,
  /** Minimum devices for a 12-month agreement (smaller setups by arrangement); month-to-month has no minimum */
  annualMinDevices: 5,
} as const;

/** Installation projects (hardware, cabling, connectivity): always quoted after a site visit */
export const projectTerms = {
  /** The site visit before a quote is free within this distance of either branch */
  freeSiteVisitRadiusKm: 20,
  /** Workmanship guarantee on installation work (excludes later damage by third parties; full T&Cs on the quote) */
  workmanshipGuaranteeDays: 30,
} as const;

/** Website design & development: fixed project prices agreed upfront */
export const websitePricing = {
  /** Basic website, excl. VAT */
  basicPrice: 6500,
  basicMaxPages: 6,
  /** Rounds of design revisions included */
  revisionRounds: 3,
  /** Monthly website management, excl. VAT: domain, hosting, monitoring, backups, bug fixes on existing features */
  managementMonthly: 600,
} as const;

/** Custom software: fixed price after scoping */
export const softwarePricing = {
  /** Deposit to start a project, as % of the fixed price */
  depositPercent: 50,
  /** Monthly support, excl. VAT: bug fixes on live features plus small revisions */
  supportMonthly: 850,
  /** Small revisions (wording, colours; no change to how a feature works) included per month */
  supportRevisionsPerMonth: 2,
} as const;

export const VAT_NOTE = 'excl. VAT';

/**
 * 1495 → "R1,495", 0.4 → "R0.40", 4.5 → "R4.50".
 * Manual formatting: Intl output can differ between Node and browsers (hydration).
 */
export function formatRand(amount: number): string {
  const [whole, cents] = amount.toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return cents === '00' ? `R${grouped}` : `R${grouped}.${cents}`;
}

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export const startingPrice = Math.min(...plans.map((p) => p.pricePerDevice));