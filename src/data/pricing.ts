// src/data/pricing.ts
// Managed IT plans (all prices excl. VAT). Phase 3 adds inclusions per plan for /pricing.

export type PlanId = 'essential' | 'managed' | 'complete';

export interface Plan {
  id: PlanId;
  name: string;
  /** Rand per device per month, excl. VAT */
  pricePerDevice: number;
  /** Rand per server per month, excl. VAT (only where offered) */
  pricePerServer?: number;
}

export const plans: Plan[] = [
  { id: 'essential', name: 'Essential Care', pricePerDevice: 449 },
  { id: 'managed', name: 'Managed Care', pricePerDevice: 699 },
  { id: 'complete', name: 'Complete Care', pricePerDevice: 949, pricePerServer: 1495 },
];

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