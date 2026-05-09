import { create, StoreApi, UseBoundStore } from 'zustand';

/**
 * Per-route filter store factory backed by `sessionStorage`.
 *
 * Why a factory and not a single global store: each page (Invoices,
 * Customers, Subscriptions) has its own filter shape and lifecycle.
 * Persisting under a `filters:<route>` key keeps them isolated and
 * lets the user navigate away and back without losing state.
 *
 * Why a small fingerprint in the URL instead of every filter key:
 * a graduated invoice filter set ({ status, plan, dateFrom, dateTo,
 * search, sortBy, sortDir }) becomes a 200-char URL once serialised.
 * That bloats the URL bar, hurts shareability, and triggers full
 * URL parsing on every navigation. Instead we hash the filter object
 * to a 32-bit integer (~6 chars) and write it to `location.hash` —
 * the page stays bookmarkable, but the URL is short.
 *
 * Caveat: a fingerprint alone can't reconstruct the filters from a
 * cold link (the recipient just sees `#a3f9c2`). The full state lives
 * in `sessionStorage` for the same tab; for cross-device shareability
 * a separate "share view" flow would persist filters to the backend
 * and round-trip a short slug. That's noted in the README under
 * "What I'd add with another day".
 */

interface FilterStoreState<T extends Record<string, unknown>> {
	/** Current filter values */
	filters: T;
	/** Update a single filter key */
	setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
	/** Replace the entire filter object */
	setFilters: (next: Partial<T>) => void;
	/** Reset to the initial values supplied to the factory */
	resetFilters: () => void;
	/** Snapshot read — useful in event handlers that don't subscribe */
	getFilters: () => T;
	/** Stable short hash that changes whenever filters change */
	fingerprint: () => string;
}

/** djb2 — small, fast, non-cryptographic. Good enough for change detection. */
export function djb2(input: string): string {
	let hash = 5381;
	for (let i = 0; i < input.length; i++) {
		hash = (hash * 33) ^ input.charCodeAt(i);
	}
	// Coerce to unsigned 32-bit and return base-36 (compact alphanumeric)
	return (hash >>> 0).toString(36);
}

/** Stable JSON.stringify with sorted keys so fingerprints don't churn on key reorder. */
function stableStringify(value: unknown): string {
	if (value === null || typeof value !== 'object') return JSON.stringify(value);
	if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
	const keys = Object.keys(value as Record<string, unknown>).sort();
	return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify((value as Record<string, unknown>)[k])}`).join(',')}}`;
}

const STORAGE_PREFIX = 'filters';

function readFromStorage<T>(routeKey: string, fallback: T): T {
	if (typeof window === 'undefined') return fallback;
	try {
		const raw = window.sessionStorage.getItem(`${STORAGE_PREFIX}:${routeKey}`);
		if (!raw) return fallback;
		const parsed = JSON.parse(raw);
		return { ...fallback, ...parsed } as T;
	} catch {
		return fallback;
	}
}

function writeToStorage<T>(routeKey: string, filters: T): void {
	if (typeof window === 'undefined') return;
	try {
		window.sessionStorage.setItem(`${STORAGE_PREFIX}:${routeKey}`, JSON.stringify(filters));
	} catch {
		// quota exceeded etc. — non-fatal
	}
}

/**
 * Create a Zustand hook scoped to a particular route's filters.
 *
 * @example
 *   export const useInvoiceFilters = createFilterStore('invoices', {
 *     status: 'all', plan: 'all', search: '', sortBy: 'date', sortDir: 'desc',
 *   });
 */
export function createFilterStore<T extends Record<string, unknown>>(
	routeKey: string,
	initial: T,
): UseBoundStore<StoreApi<FilterStoreState<T>>> {
	const persisted = readFromStorage(routeKey, initial);

	return create<FilterStoreState<T>>((set, get) => ({
		filters: persisted,

		setFilter: (key, value) =>
			set((state) => {
				const next = { ...state.filters, [key]: value };
				writeToStorage(routeKey, next);
				return { filters: next };
			}),

		setFilters: (partial) =>
			set((state) => {
				const next = { ...state.filters, ...partial };
				writeToStorage(routeKey, next);
				return { filters: next };
			}),

		resetFilters: () => {
			writeToStorage(routeKey, initial);
			set({ filters: initial });
		},

		getFilters: () => get().filters,

		fingerprint: () => djb2(stableStringify(get().filters)),
	}));
}

/**
 * Imperative helper to sync a store's fingerprint to `location.hash`.
 * Call inside an effect so it runs once after the store is created.
 *
 * @example
 *   useEffect(() => syncFingerprintToUrl(useInvoiceFilters), []);
 */
export function syncFingerprintToUrl<T extends Record<string, unknown>>(
	useStore: UseBoundStore<StoreApi<FilterStoreState<T>>>,
): () => void {
	if (typeof window === 'undefined') return () => {};
	const update = () => {
		const fp = useStore.getState().fingerprint();
		const desired = `#fp=${fp}`;
		if (window.location.hash !== desired) {
			// Use history.replaceState to avoid spamming the browser back stack
			window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${desired}`);
		}
	};
	update();
	const unsub = useStore.subscribe(update);
	return unsub;
}
