import type { UseQueryOptions } from '@tanstack/react-query';

/**
 * Centralised TanStack Query caching presets — one place to think about
 * staleTime / gcTime instead of sprinkling magic numbers across `useQuery`
 * call sites.
 *
 * Defaults applied via `defaultOptions` on the `QueryClient`:
 *   staleTime: 5 minutes  (data is "fresh" for 5 min)
 *   gcTime:    10 minutes (unused queries garbage-collected after 10 min)
 *
 * Per-call override via spread:
 *   useQuery({ queryKey: [...], queryFn, ...REALTIME })
 *   useQuery({ queryKey: [...], queryFn, ...STATIC })
 */

const MIN = 60 * 1000;

/** App-wide defaults — pass to `new QueryClient({ defaultOptions: { queries: GLOBAL_DEFAULTS } })` */
export const GLOBAL_DEFAULTS = {
	staleTime: 5 * MIN,
	gcTime: 10 * MIN,
	refetchOnWindowFocus: false,
	retry: 1,
} as const;

/** Real-time data — usage events, current invoice totals, live counts */
export const REALTIME = {
	staleTime: 0,
	gcTime: 1 * MIN,
	refetchInterval: 5 * 1000,
	refetchOnWindowFocus: true,
} as const;

/** Sensible default — covers most queries */
export const DEFAULT = {
	staleTime: 5 * MIN,
	gcTime: 10 * MIN,
} as const;

/** Static-ish reference data — currency list, plan definitions, country codes */
export const STATIC = {
	staleTime: 30 * MIN,
	gcTime: 60 * MIN,
	refetchOnWindowFocus: false,
} as const;

export type QueryPreset = typeof REALTIME | typeof DEFAULT | typeof STATIC;

/**
 * Build a per-query config by merging a preset with overrides.
 * Useful when you mostly want a preset but need to tweak one field.
 *
 * Example:
 *   useQuery(createQueryConfig(STATIC, { queryKey: ['plans'], queryFn }))
 */
export function createQueryConfig<TData = unknown, TError = Error>(
	preset: QueryPreset,
	overrides: Partial<UseQueryOptions<TData, TError>>,
): Partial<UseQueryOptions<TData, TError>> {
	return { ...preset, ...overrides };
}
