/**
 * Tiered pricing calculator — the core math used across Flexprice
 * usage-based billing.
 *
 * Two tier modes:
 *  - 'graduated' : the user pays the per-unit rate of *each* tier they cross
 *                  (most common; like income tax brackets)
 *  - 'volume'    : the entire usage is priced at the rate of the highest
 *                  tier reached (cheaper at scale)
 */

export interface PricingTier {
	/** Inclusive lower bound of this tier (units). */
	from: number;
	/** Inclusive upper bound. `null` means infinity. */
	to: number | null;
	/** Per-unit price within this tier. */
	unitPrice: number;
	/** Optional flat fee charged when usage falls anywhere in this tier. */
	flatFee?: number;
}

export type TierMode = 'graduated' | 'volume';

/**
 * Calculate the total price for a given usage volume.
 * Returns 0 for zero or negative usage.
 */
export function calculateTierPrice(usage: number, tiers: PricingTier[], mode: TierMode = 'graduated'): number {
	if (!Number.isFinite(usage) || usage <= 0 || tiers.length === 0) return 0;

	const sorted = [...tiers].sort((a, b) => a.from - b.from);

	if (mode === 'volume') {
		// Find the tier that contains `usage` and price everything at that rate.
		const tier = sorted.find((t) => usage >= t.from && (t.to === null || usage <= t.to));
		if (!tier) return 0;
		return round2(usage * tier.unitPrice + (tier.flatFee ?? 0));
	}

	// graduated
	let total = 0;
	for (const tier of sorted) {
		if (usage < tier.from) break;
		const upper = tier.to === null ? usage : Math.min(usage, tier.to);
		const unitsInTier = Math.max(0, upper - tier.from + 1);
		total += unitsInTier * tier.unitPrice;
		if (tier.flatFee) total += tier.flatFee;
		if (tier.to !== null && usage <= tier.to) break;
	}
	return round2(total);
}

const round2 = (n: number): number => Math.round(n * 100) / 100;
