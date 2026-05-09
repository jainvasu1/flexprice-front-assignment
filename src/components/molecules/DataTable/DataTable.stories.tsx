import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import DataTable, { Column } from './DataTable';
import StatusBadge, { StatusKind } from '@/components/atoms/StatusBadge/StatusBadge';
import Button from '@/components/atoms/Button/Button';
import { Plus } from 'lucide-react';

/**
 * Generic sortable / virtualizable / paginated table.
 * The 10k row story demonstrates Challenge B from the assignment.
 */
const meta = {
	title: 'Molecules/DataTable',
	component: DataTable,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof DataTable>;

// ---------- Mock invoice type ----------
interface Invoice {
	id: string;
	customer: string;
	plan: string;
	amount: number;
	status: StatusKind;
	date: string;
}

const STATUSES: StatusKind[] = ['paid', 'pending', 'processing', 'failed', 'draft', 'refunded'];
const CUSTOMERS = ['Acme Corp', 'Linear Labs', 'Vercel Studios', 'Notion Inc.', 'Figma OSS', 'Raycast Inc.', 'Stripe Inc.', 'Vercel', 'Cloudflare'];
const PLANS = ['Free', 'Pro', 'Growth', 'Enterprise'];

const makeInvoice = (i: number): Invoice => ({
	id: `INV-2026-${String(i).padStart(5, '0')}`,
	customer: CUSTOMERS[i % CUSTOMERS.length],
	plan: PLANS[i % PLANS.length],
	amount: Math.round((100 + Math.sin(i) * 90 + i * 3) * 100) / 100,
	status: STATUSES[i % STATUSES.length],
	date: `2026-05-${String((i % 28) + 1).padStart(2, '0')}`,
});

const invoiceColumns: Column<Invoice>[] = [
	{
		key: 'id',
		header: 'Invoice',
		sortable: true,
		accessor: (r) => r.id,
		render: (r) => <span className='font-mono text-[#092E44] font-medium'>{r.id}</span>,
	},
	{
		key: 'customer',
		header: 'Customer',
		sortable: true,
		accessor: (r) => r.customer,
		render: (r) => <span className='font-medium'>{r.customer}</span>,
	},
	{
		key: 'plan',
		header: 'Plan',
		sortable: true,
		accessor: (r) => r.plan,
		render: (r) => <span className='text-[#71717A]'>{r.plan}</span>,
	},
	{
		key: 'amount',
		header: 'Amount',
		sortable: true,
		align: 'right',
		accessor: (r) => r.amount,
		render: (r) => <span className='font-mono'>${r.amount.toFixed(2)}</span>,
	},
	{
		key: 'status',
		header: 'Status',
		render: (r) => <StatusBadge status={r.status} />,
	},
	{
		key: 'date',
		header: 'Date',
		sortable: true,
		accessor: (r) => r.date,
		render: (r) => <span className='text-[#71717A]'>{r.date}</span>,
	},
];

// ---------- Stories ----------

export const Default: Story = {
	render: () => {
		const data = useMemo(() => Array.from({ length: 8 }, (_, i) => makeInvoice(i + 1)), []);
		return <DataTable<Invoice> columns={invoiceColumns} data={data} rowKey='id' />;
	},
};

export const Sortable: Story = {
	render: () => {
		const data = useMemo(() => Array.from({ length: 12 }, (_, i) => makeInvoice(i + 1)), []);
		return (
			<div>
				<p style={{ fontSize: 13, color: '#71717A', marginBottom: 12 }}>
					Click any column header with the chevron icon to sort. Click again to reverse, third time clears.
				</p>
				<DataTable<Invoice> columns={invoiceColumns} data={data} rowKey='id' />
			</div>
		);
	},
};

export const Loading: Story = {
	render: () => <DataTable<Invoice> columns={invoiceColumns} data={[]} rowKey='id' loading skeletonRows={6} />,
};

export const Empty: Story = {
	render: () => (
		<DataTable<Invoice>
			columns={invoiceColumns}
			data={[]}
			rowKey='id'
			emptyState={
				<>
					<div className='text-sm font-semibold text-[#18181B]'>No invoices yet</div>
					<p className='text-xs text-[#71717A] mt-1 max-w-xs'>Invoices will appear here once a subscription's billing cycle begins.</p>
					<div className='mt-4'>
						<Button size='sm' prefixIcon={<Plus />}>Create invoice</Button>
					</div>
				</>
			}
		/>
	),
};

export const RowClick: Story = {
	render: () => {
		const [selected, setSelected] = useState<Invoice | null>(null);
		const data = useMemo(() => Array.from({ length: 6 }, (_, i) => makeInvoice(i + 1)), []);
		return (
			<div>
				<p style={{ fontSize: 13, color: '#71717A', marginBottom: 12 }}>
					{selected ? <>Selected: <strong>{selected.id}</strong> · {selected.customer}</> : 'Click a row.'}
				</p>
				<DataTable<Invoice> columns={invoiceColumns} data={data} rowKey='id' onRowClick={setSelected} />
			</div>
		);
	},
};

export const Paginated: Story = {
	render: () => {
		const all = useMemo(() => Array.from({ length: 87 }, (_, i) => makeInvoice(i + 1)), []);
		const [page, setPage] = useState(1);
		const pageSize = 10;
		const slice = all.slice((page - 1) * pageSize, page * pageSize);
		return (
			<DataTable<Invoice>
				columns={invoiceColumns}
				data={slice}
				rowKey='id'
				page={page}
				pageSize={pageSize}
				totalRows={all.length}
				onPageChange={setPage}
			/>
		);
	},
};

// ---------- CHALLENGE B: 10,000 ROWS, VIRTUALIZED ----------

export const Virtualized10k: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'**Challenge B** — 10,000 mock rows rendered with `@tanstack/react-virtual`. Only the rows in the viewport (plus an 8-row overscan buffer) are mounted to the DOM. Scroll should stay buttery smooth.',
			},
		},
	},
	render: () => {
		const data = useMemo(() => Array.from({ length: 10_000 }, (_, i) => makeInvoice(i + 1)), []);
		return (
			<div>
				<p style={{ fontSize: 13, color: '#71717A', marginBottom: 12 }}>
					<strong>10,000 rows</strong> · virtualized with <code>@tanstack/react-virtual</code> · only ~12 rows in DOM at any time.
				</p>
				<DataTable<Invoice>
					columns={invoiceColumns}
					data={data}
					rowKey='id'
					virtualized
					estimatedRowHeight={52}
					maxHeight={520}
				/>
			</div>
		);
	},
};
