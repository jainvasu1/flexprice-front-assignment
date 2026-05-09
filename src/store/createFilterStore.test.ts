import { describe, it, expect, beforeEach } from 'vitest';
import { createFilterStore, djb2 } from './createFilterStore';

interface InvoiceFilters extends Record<string, unknown> {
	status: 'all' | 'paid' | 'failed';
	search: string;
	sortDir: 'asc' | 'desc';
}

const INITIAL: InvoiceFilters = { status: 'all', search: '', sortDir: 'desc' };

describe('createFilterStore', () => {
	beforeEach(() => {
		window.sessionStorage.clear();
	});

	it('starts with the supplied initial filters', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		expect(useStore.getState().filters).toEqual(INITIAL);
	});

	it('updates a single key with setFilter', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		useStore.getState().setFilter('status', 'paid');
		expect(useStore.getState().filters.status).toBe('paid');
		expect(useStore.getState().filters.search).toBe('');
	});

	it('persists to sessionStorage under the route key', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		useStore.getState().setFilter('search', 'acme');
		const raw = window.sessionStorage.getItem('filters:invoices');
		expect(raw).toBeTruthy();
		expect(JSON.parse(raw!).search).toBe('acme');
	});

	it('rehydrates from sessionStorage on a new store instance', () => {
		window.sessionStorage.setItem(
			'filters:invoices',
			JSON.stringify({ status: 'failed', search: 'linear', sortDir: 'asc' }),
		);
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		expect(useStore.getState().filters).toEqual({ status: 'failed', search: 'linear', sortDir: 'asc' });
	});

	it('isolates filters by route key', () => {
		const invoices = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		const customers = createFilterStore<InvoiceFilters>('customers', INITIAL);
		invoices.getState().setFilter('search', 'acme');
		expect(customers.getState().filters.search).toBe('');
	});

	it('resetFilters returns to the original initial values', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		useStore.getState().setFilter('search', 'noisy query');
		useStore.getState().setFilter('status', 'paid');
		useStore.getState().resetFilters();
		expect(useStore.getState().filters).toEqual(INITIAL);
	});

	it('fingerprint is stable for the same filters', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		const a = useStore.getState().fingerprint();
		const b = useStore.getState().fingerprint();
		expect(a).toBe(b);
	});

	it('fingerprint changes when any filter changes', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		const before = useStore.getState().fingerprint();
		useStore.getState().setFilter('status', 'paid');
		const after = useStore.getState().fingerprint();
		expect(after).not.toBe(before);
	});

	it('fingerprint stays the same for object key reorder (stable serialisation)', () => {
		const useStore = createFilterStore<InvoiceFilters>('invoices', INITIAL);
		const original = useStore.getState().fingerprint();
		// Re-set with a literal that has the same values but different key order
		useStore.getState().setFilters({ sortDir: 'desc', search: '', status: 'all' });
		expect(useStore.getState().fingerprint()).toBe(original);
	});
});

describe('djb2', () => {
	it('produces the same hash for the same input', () => {
		expect(djb2('hello')).toBe(djb2('hello'));
	});

	it('produces different hashes for different inputs', () => {
		expect(djb2('foo')).not.toBe(djb2('bar'));
	});

	it('returns a non-empty alphanumeric string', () => {
		const out = djb2('flexprice');
		expect(out).toMatch(/^[0-9a-z]+$/);
	});
});
