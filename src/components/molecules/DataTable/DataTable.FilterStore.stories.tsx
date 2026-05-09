import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo } from 'react';
import DataTable, { Column } from './DataTable';
import StatusBadge, { StatusKind } from '@/components/atoms/StatusBadge/StatusBadge';
import SearchBar from '../SearchBar/SearchBar';
import Button from '@/components/atoms/Button/Button';
import { createFilterStore, syncFingerprintToUrl } from '@/store/createFilterStore';

/**
 * Challenge A demo — DataTable wired to a Zustand filter store.
 * Filters persist in sessionStorage across page reloads (try it!) and
 * a short fingerprint is written to the URL hash so the URL stays clean.
 */
const meta = {
	title: 'Showcase/Challenge A — Filter Store',
	parameters: { layout: 'fullscreen', backgrounds: { default: 'app' } },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ---------- Mock data ----------
interface Invoice {
	id: string;
	customer: string;
	plan: 'Free' | 'Pro' | 'Growth' | 'Enterprise';
	amount: number;
	status: StatusKind;
	date: string;
}

const STATUSES: StatusKind[] = ['paid', 'pending', 'processing', 'failed', 'draft', 'refunded'];
const CUSTOMERS = ['Acme Corp', 'Linear Labs', 'Vercel Studios', 'Notion Inc.', 'Figma OSS', 'Raycast Inc.', 'Stripe Inc.'];
const PLANS: Invoice['plan'][] = ['Free', 'Pro', 'Growth', 'Enterprise'];

const ALL_INVOICES: Invoice[] = Array.from({ length: 80 }, (_, i) => ({
	id: `INV-2026-${String(i + 1).padStart(5, '0')}`,
	customer: CUSTOMERS[i % CUSTOMERS.length],
	plan: PLANS[i % PLANS.length],
	amount: Math.round((100 + Math.sin(i) * 90 + i * 5) * 100) / 100,
	status: STATUSES[i % STATUSES.length],
	date: `2026-05-${String((i % 28) + 1).padStart(2, '0')}`,
}));

// ---------- Filter store ----------
interface InvoiceFilters extends Record<string, unknown> {
	status: 'all' | StatusKind;
	plan: 'all' | Invoice['plan'];
	search: string;
}

const initial: InvoiceFilters = { status: 'all', plan: 'all', search: '' };
const useInvoiceFilters = createFilterStore<InvoiceFilters>('invoices-demo', initial);

// ---------- Story body ----------
const Demo = () => {
	const filters = useInvoiceFilters((s) => s.filters);
	const setFilter = useInvoiceFilters((s) => s.setFilter);
	const resetFilters = useInvoiceFilters((s) => s.resetFilters);
	const fingerprint = useInvoiceFilters((s) => s.fingerprint());

	useEffect(() => {
		// Sync the small fingerprint hash to location.hash on every change.
		// Reload the Storybook iframe and the filters survive (sessionStorage).
		return syncFingerprintToUrl(useInvoiceFilters);
	}, []);

	const visible = useMemo(() => {
		const q = filters.search.trim().toLowerCase();
		return ALL_INVOICES.filter((inv) => {
			if (filters.status !== 'all' && inv.status !== filters.status) return false;
			if (filters.plan !== 'all' && inv.plan !== filters.plan) return false;
			if (q && !inv.customer.toLowerCase().includes(q) && !inv.id.toLowerCase().includes(q)) return false;
			return true;
		});
	}, [filters]);

	const columns: Column<Invoice>[] = [
		{ key: 'id',       header: 'Invoice', sortable: true, accessor: (r) => r.id, render: (r) => <span className='font-mono text-[#092E44] font-medium'>{r.id}</span> },
		{ key: 'customer', header: 'Customer', sortable: true, accessor: (r) => r.customer, render: (r) => <span className='font-medium'>{r.customer}</span> },
		{ key: 'plan',     header: 'Plan', sortable: true, accessor: (r) => r.plan, render: (r) => <span className='text-[#71717A]'>{r.plan}</span> },
		{ key: 'amount',   header: 'Amount', sortable: true, align: 'right', accessor: (r) => r.amount, render: (r) => <span className='font-mono'>${r.amount.toFixed(2)}</span> },
		{ key: 'status',   header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
		{ key: 'date',     header: 'Date', sortable: true, accessor: (r) => r.date, render: (r) => <span className='text-[#71717A]'>{r.date}</span> },
	];

	return (
		<div style={{ background: '#FAFAFA', minHeight: '100vh', padding: 32 }}>
			<div style={{ maxWidth: 1100, margin: '0 auto' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
					<div>
						<div style={{ fontSize: 12, letterSpacing: 1.5, color: '#71717A', marginBottom: 4 }}>CHALLENGE A</div>
						<h1 style={{ fontSize: 24, fontWeight: 600, color: '#092E44', margin: 0 }}>Invoices · Zustand filter store</h1>
						<p style={{ fontSize: 13, color: '#71717A', margin: '4px 0 0 0' }}>
							Filters persist to <code>sessionStorage</code> · URL fingerprint:{' '}
							<code style={{ background: '#fff', padding: '2px 6px', borderRadius: 4, border: '1px solid #E4E4E7' }}>
								#fp={fingerprint}
							</code>
						</p>
					</div>
					<Button variant='outline' size='sm' onClick={resetFilters}>Reset filters</Button>
				</div>

				{/* Filter bar */}
				<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
					<SearchBar
						placeholder='Search by invoice ID or customer…'
						defaultValue={filters.search}
						onSearch={(q) => setFilter('search', q)}
						debounceMs={250}
					/>
					<select
						value={filters.status}
						onChange={(e) => setFilter('status', e.target.value as InvoiceFilters['status'])}
						style={{ padding: '0 12px', height: 40, border: '1px solid #E4E4E7', borderRadius: 8, background: 'white', fontSize: 14 }}>
						<option value='all'>All statuses</option>
						{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
					</select>
					<select
						value={filters.plan}
						onChange={(e) => setFilter('plan', e.target.value as InvoiceFilters['plan'])}
						style={{ padding: '0 12px', height: 40, border: '1px solid #E4E4E7', borderRadius: 8, background: 'white', fontSize: 14 }}>
						<option value='all'>All plans</option>
						{PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
					</select>
				</div>

				<div style={{ fontSize: 12, color: '#71717A', marginBottom: 8 }}>
					{visible.length} of {ALL_INVOICES.length} invoices match
				</div>

				<DataTable<Invoice>
					columns={columns}
					data={visible}
					rowKey='id'
					emptyState={
						<>
							<div className='text-sm font-semibold text-[#18181B]'>No matches</div>
							<p className='text-xs text-[#71717A] mt-1'>Try clearing a filter.</p>
						</>
					}
				/>

				<div style={{ marginTop: 24, padding: 16, border: '1px solid #E4E4E7', borderRadius: 8, background: 'white', fontSize: 12, color: '#71717A' }}>
					<strong style={{ color: '#18181B' }}>Try this:</strong> change a filter, then reload the iframe (right-click → Reload Frame, or open the story in a new tab).
					Filters survive the reload via <code>sessionStorage</code>. The URL hash also updates with a short fingerprint that changes only when filters change.
				</div>
			</div>
		</div>
	);
};

export const InvoicesWithFilterStore: Story = {
	render: () => <Demo />,
};
