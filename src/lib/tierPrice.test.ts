import { describe, it, expect } from 'vitest';
import { calculateTierPrice, PricingTier } from './tierPrice';

const TIERS: PricingTier[] = [
	{ from: 1, to: 1000, unitPrice: 0.01 },
	{ from: 1001, to: 10000, unitPrice: 0.005 },
	{ from: 10001, to: null, unitPrice: 0.001 },
];

describe('calculateTierPrice', () => {
	it('returns 0 for zero usage', () => {
		expect(calculateTierPrice(0, TIERS)).toBe(0);
	});

	it('returns 0 for negative usage', () => {
		expect(calculateTierPrice(-100, TIERS)).toBe(0);
	});

	it('returns 0 when no tiers are configured', () => {
		expect(calculateTierPrice(500, [])).toBe(0);
	});

	describe('graduated mode (default)', () => {
		it('charges first-tier rate when usage stays inside it', () => {
			// 500 units * $0.01 = $5.00
			expect(calculateTierPrice(500, TIERS)).toBe(5);
		});

		it('crosses two tiers correctly', () => {
			// First 1000 * $0.01 = $10  +  next 1000 * $0.005 = $5  =>  $15
			expect(calculateTierPrice(2000, TIERS)).toBe(15);
		});

		it('crosses all three tiers correctly', () => {
			// 1000 * 0.01 = 10
			// 9000 * 0.005 = 45
			// 5000 * 0.001 = 5
			// total = 60
			expect(calculateTierPrice(15000, TIERS)).toBe(60);
		});

		it('honors flat fees per tier', () => {
			const tiers: PricingTier[] = [
				{ from: 1, to: 100, unitPrice: 0.1, flatFee: 5 },
				{ from: 101, to: null, unitPrice: 0.05, flatFee: 10 },
			];
			// 50 units in tier 1: 50*0.1 + 5 = 10
			expect(calculateTierPrice(50, tiers)).toBe(10);
			// 200 units: tier1(100*0.1 + 5) + tier2(100*0.05 + 10) = 15 + 15 = 30
			expect(calculateTierPrice(200, tiers)).toBe(30);
		});
	});

	describe('volume mode', () => {
		it('prices all units at the highest tier reached', () => {
			// 2000 units land in tier 2 -> 2000 * $0.005 = $10
			expect(calculateTierPrice(2000, TIERS, 'volume')).toBe(10);
		});

		it('uses the unbounded tier for very high usage', () => {
			// 50000 units in tier 3 -> 50000 * 0.001 = 50
			expect(calculateTierPrice(50000, TIERS, 'volume')).toBe(50);
		});
	});

	it('rounds to two decimal places', () => {
		const tiers: PricingTier[] = [{ from: 1, to: null, unitPrice: 0.0333 }];
		expect(calculateTierPrice(10, tiers)).toBe(0.33);
	});
});
