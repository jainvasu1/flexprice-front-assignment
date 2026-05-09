import { describe, it, expect } from 'vitest';
import { GLOBAL_DEFAULTS, REALTIME, DEFAULT, STATIC, createQueryConfig } from './queryConfig';

const MIN = 60 * 1000;

describe('queryConfig', () => {
	describe('GLOBAL_DEFAULTS', () => {
		it('caches data for 5 minutes', () => {
			expect(GLOBAL_DEFAULTS.staleTime).toBe(5 * MIN);
		});

		it('garbage-collects unused queries after 10 minutes', () => {
			expect(GLOBAL_DEFAULTS.gcTime).toBe(10 * MIN);
		});

		it('does not refetch on window focus by default', () => {
			expect(GLOBAL_DEFAULTS.refetchOnWindowFocus).toBe(false);
		});
	});

	describe('REALTIME preset', () => {
		it('treats data as always stale', () => {
			expect(REALTIME.staleTime).toBe(0);
		});

		it('polls every 5 seconds', () => {
			expect(REALTIME.refetchInterval).toBe(5_000);
		});

		it('refetches on window focus to catch updates fast', () => {
			expect(REALTIME.refetchOnWindowFocus).toBe(true);
		});
	});

	describe('DEFAULT preset', () => {
		it('matches global staleTime', () => {
			expect(DEFAULT.staleTime).toBe(GLOBAL_DEFAULTS.staleTime);
		});

		it('matches global gcTime', () => {
			expect(DEFAULT.gcTime).toBe(GLOBAL_DEFAULTS.gcTime);
		});
	});

	describe('STATIC preset', () => {
		it('caches static reference data for 30 minutes', () => {
			expect(STATIC.staleTime).toBe(30 * MIN);
		});

		it('keeps unused queries around for an hour', () => {
			expect(STATIC.gcTime).toBe(60 * MIN);
		});

		it('STATIC has a longer staleTime than DEFAULT', () => {
			expect(STATIC.staleTime).toBeGreaterThan(DEFAULT.staleTime);
		});

		it('REALTIME has a shorter staleTime than DEFAULT', () => {
			expect(REALTIME.staleTime).toBeLessThan(DEFAULT.staleTime);
		});
	});

	describe('createQueryConfig', () => {
		it('merges preset with overrides', () => {
			const cfg = createQueryConfig(STATIC, { queryKey: ['plans'], retry: 3 });
			expect(cfg.staleTime).toBe(STATIC.staleTime);
			expect(cfg.gcTime).toBe(STATIC.gcTime);
			expect(cfg.queryKey).toEqual(['plans']);
			expect(cfg.retry).toBe(3);
		});

		it('overrides win when keys collide', () => {
			const cfg = createQueryConfig(REALTIME, { staleTime: 999 });
			expect(cfg.staleTime).toBe(999);
		});
	});
});
