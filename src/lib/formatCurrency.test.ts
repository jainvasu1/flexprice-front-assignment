import { describe, it, expect } from 'vitest';
import { formatCurrency, formatCurrencyCompact } from './formatCurrency';

describe('formatCurrency', () => {
	it('formats USD with two decimals by default', () => {
		expect(formatCurrency(1234.5)).toBe('$1,234.50');
	});

	it('rounds to two decimals', () => {
		expect(formatCurrency(99.999)).toBe('$100.00');
	});

	it('handles zero', () => {
		expect(formatCurrency(0)).toBe('$0.00');
	});

	it('handles negative values', () => {
		expect(formatCurrency(-50)).toBe('-$50.00');
	});

	it('returns em dash for non-finite numbers', () => {
		expect(formatCurrency(NaN)).toBe('—');
		expect(formatCurrency(Infinity)).toBe('—');
	});

	it('supports INR with the rupee symbol', () => {
		const out = formatCurrency(2500, 'INR', 'en-IN');
		expect(out).toContain('₹');
		expect(out).toContain('2,500');
	});
});

describe('formatCurrencyCompact', () => {
	it('uses K notation for thousands', () => {
		expect(formatCurrencyCompact(1500)).toMatch(/\$1\.5K/);
	});

	it('uses M notation for millions', () => {
		expect(formatCurrencyCompact(2_400_000)).toMatch(/\$2\.4M/);
	});

	it('returns em dash for non-finite numbers', () => {
		expect(formatCurrencyCompact(NaN)).toBe('—');
	});
});
