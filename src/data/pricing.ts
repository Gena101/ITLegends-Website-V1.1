// src/data/pricing.ts
// Managed IT plans and commercial terms (all prices excl. VAT).
// Pages interpolate these values; never type a price or term into copy. Phase 3 adds full plan inclusions.

export type PlanId = 'essential' | 'managed' | 'complete';

export interface Plan {
  id: PlanId;
  name: string;
  /** Rand per device per month, excl. VAT */
  pricePerDevice: number;
  /** Rand per server per month, excl. VAT (Complete Care only) */
  pricePerServer?: number;
  /** On-site visits included per month, within onsite.radiusKm of either branch */
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

/** Month-to-month or 12 months, the client's choice */
export const contractTerms = {
  annualDiscountPercent: 10,
  /** Minimum devices for a 12-month agreement (smaller setups by arrangement) */
  annualMinDevices: 5,
} as const;

export const VAT_NOTE = 'excl. VAT';

/** 1495 → "R1,495". Manual grouping: Intl output can differ between Node and browsers (hydration). */
export function formatRand(amount: number): string {
  return `R${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export const startingPrice = Math.min(...plans.map((p) => p.pricePerDevice));