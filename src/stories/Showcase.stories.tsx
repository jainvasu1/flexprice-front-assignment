import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, Search, Plus, Filter, Download, MoreHorizontal } from 'lucide-react';

import Button from '@/components/atoms/Button/Button';
import CtaButton from '@/components/atoms/Button/CtaButton';
import Card, { CardHeader } from '@/components/atoms/Card/Card';
import PolishedToggle from '@/components/atoms/Toggle/PolishedToggle';
import StatusBadge, { StatusKind } from '@/components/atoms/StatusBadge/StatusBadge';
import Progress from '@/components/atoms/Progress/Progress';
import AnimatedCounter from '@/components/atoms/AnimatedCounter/AnimatedCounter';
import AnimatedProgress from '@/components/atoms/Progress/AnimatedProgress';
import AnimatedStepper from '@/components/atoms/Stepper/AnimatedStepper';
import AnimatedCheckbox from '@/components/atoms/Checkbox/AnimatedCheckbox';

const meta = {
	title: 'Showcase/Dashboard Scenes',
	parameters: {
		layout: 'fullscreen',
		backgrounds: { default: 'app' },
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ---------- Invoice Row Showcase ----------

interface InvoiceRow {
	id: string;
	customer: string;
	plan: string;
	amount: number;
	status: StatusKind;
	date: string;
	daysAgo: number;
}

const ALL_INVOICES: InvoiceRow[] = [
	{ id: 'INV-2026-0142', customer: 'Acme Corp',         plan: 'Growth',     amount: 1240.00, status: 'paid',       date: 'May 9, 2026',  daysAgo: 0 },
	{ id: 'INV-2026-0141', customer: 'Linear Labs',       plan: 'Enterprise', amount: 8920.00, status: 'pending',    date: 'May 9, 2026',  daysAgo: 0 },
	{ id: 'INV-2026-0140', customer: 'Vercel Studios',    plan: 'Pro',        amount: 420.00,  status: 'processing', date: 'May 8, 2026',  daysAgo: 1 },
	{ id: 'INV-2026-0139', customer: 'Notion Inc.',       plan: 'Growth',     amount: 1240.00, status: 'failed',     date: 'May 8, 2026',  daysAgo: 1 },
	{ id: 'INV-2026-0138', customer: 'Figma OSS',         plan: 'Free',       amount: 0.00,    status: 'draft',      date: 'May 7, 2026',  daysAgo: 2 },
	{ id: 'INV-2026-0137', customer: 'Raycast Inc.',      plan: 'Pro',        amount: 420.00,  status: 'refunded',   date: 'May 7, 2026',  daysAgo: 2 },
	{ id: 'INV-2026-0125', customer: 'Stripe Inc.',       plan: 'Enterprise', amount: 12500.00,status: 'paid',       date: 'Apr 28, 2026', daysAgo: 11 },
	{ id: 'INV-2026-0118', customer: 'Cloudflare',        plan: 'Growth',     amount: 1240.00, status: 'paid',       date: 'Apr 22, 2026', daysAgo: 17 },
	{ id: 'INV-2026-0102', customer: 'Acme Corp',         plan: 'Growth',     amount: 1240.00, status: 'paid',       date: 'Apr 9, 2026',  daysAgo: 30 },
	{ id: 'INV-2026-0089', customer: 'Linear Labs',       plan: 'Enterprise', amount: 8920.00, status: 'paid',       date: 'Mar 28, 2026', daysAgo: 42 },
	{ id: 'INV-2026-0072', customer: 'Vercel Studios',    plan: 'Pro',        amount: 420.00,  status: 'paid',       date: 'Mar 12, 2026', daysAgo: 58 },
];

const STATUS_OPTIONS: ('all' | StatusKind)[] = ['all', 'paid', 'pending', 'processing', 'failed', 'draft', 'refunded'];
const STATUS_LABEL: Record<'all' | StatusKind, string> = {
	all: 'All statuses', paid: 'Paid', pending: 'Pending', processing: 'Processing',
	failed: 'Failed', draft: 'Draft', refunded: 'Refunded',
};

const DATE_OPTIONS: { value: number; label: string }[] = [
	{ value: 7,    label: 'Last 7 days' },
	{ value: 30,   label: 'Last 30 days' },
	{ value: 90,   label: 'Last 90 days' },
	{ value: 9999, label: 'All time' },
];

const InvoicesPageScene = () => {
	const [search, setSearch] = useState('');
	const [dateRange, setDateRange] = useState(30);
	const [status, setStatus] = useState<'all' | StatusKind>('all');

	const visible = ALL_INVOICES.filter((inv) => {
		if (inv.daysAgo > dateRange) return false;
		if (status !== 'all' && inv.status !== status) return false;
		if (search) {
			const q = search.toLowerCase();
			if (!inv.id.toLowerCase().includes(q) && !inv.customer.toLowerCase().includes(q)) return false;
		}
		return true;
	});

	const total = visible.reduce((sum, inv) => sum + inv.amount, 0);

	return (
		<div style={{ background: '#FAFAFA', minHeight: '100vh', padding: 32 }}>
			<div style={{ maxWidth: 1100, margin: '0 auto' }}>
				{/* Header */}
				<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
					<div>
						<div style={{ fontSize: 12, letterSpacing: 1.5, color: '#71717A', marginBottom: 4 }}>BILLING</div>
						<h1 style={{ fontSize: 28, fontWeight: 600, color: '#092E44', margin: 0 }}>Invoices</h1>
						<p style={{ fontSize: 14, color: '#71717A', margin: '4px 0 0 0' }}>
							{visible.length} of {ALL_INVOICES.length} shown · ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
						</p>
					</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<Button variant='outline' size='sm' prefixIcon={<Filter size={14} />}>Filter</Button>
						<Button variant='outline' size='sm' prefixIcon={<Download size={14} />}>Export</Button>
						<CtaButton size='sm' icon={<Plus size={14} />}>New invoice</CtaButton>
					</div>
				</div>

				{/* Search + filters */}
				<div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
					<div style={{ flex: 1, position: 'relative' }}>
						<Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }} />
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search invoices, customers...'
							style={{
								width: '100%', padding: '10px 12px 10px 38px',
								border: '1px solid #E4E4E7', borderRadius: 8,
								fontSize: 14, outline: 'none', background: 'white',
							}}
						/>
					</div>

					{/* Date range select */}
					<select
						value={dateRange}
						onChange={(e) => setDateRange(parseInt(e.target.value, 10))}
						style={{
							padding: '0 36px 0 12px', height: 40,
							border: '1px solid #E4E4E7', borderRadius: 8,
							background: 'white', fontSize: 13, color: '#18181B',
							cursor: 'pointer', appearance: 'none',
							backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717A%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>")',
							backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
						}}>
						{DATE_OPTIONS.map((o) => (
							<option key={o.value} value={o.value}>{o.label}</option>
						))}
					</select>

					{/* Status select */}
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value as 'all' | StatusKind)}
						style={{
							padding: '0 36px 0 12px', height: 40,
							border: '1px solid #E4E4E7', borderRadius: 8,
							background: 'white', fontSize: 13, color: '#18181B',
							cursor: 'pointer', appearance: 'none',
							backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717A%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>")',
							backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
						}}>
						{STATUS_OPTIONS.map((s) => (
							<option key={s} value={s}>{STATUS_LABEL[s]}</option>
						))}
					</select>

					{(search || status !== 'all' || dateRange !== 30) && (
						<button
							onClick={() => { setSearch(''); setStatus('all'); setDateRange(30); }}
							style={{
								height: 40, padding: '0 12px', border: '1px solid #E4E4E7',
								borderRadius: 8, background: 'white', fontSize: 12, color: '#71717A',
								cursor: 'pointer',
							}}>
							Reset
						</button>
					)}
				</div>

				{/* Table */}
				<Card noPadding>
					<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
						<thead>
							<tr style={{ background: '#FAFAFA', textAlign: 'left' }}>
								{['Invoice', 'Customer', 'Plan', 'Amount', 'Status', 'Date', ''].map((h) => (
									<th
										key={h}
										style={{
											padding: '12px 16px', fontWeight: 500, color: '#71717A',
											fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase',
											borderBottom: '1px solid #E4E4E7',
										}}>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{visible.map((inv, i) => (
								<motion.tr
									key={inv.id}
									initial={{ opacity: 0, y: 4 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.25 }}
									style={{ borderBottom: i === visible.length - 1 ? 'none' : '1px solid #F4F4F5' }}>
									<td style={{ padding: '14px 16px', fontFamily: 'JetBrains Mono, monospace', color: '#092E44', fontWeight: 500 }}>
										{inv.id}
									</td>
									<td style={{ padding: '14px 16px', color: '#18181B', fontWeight: 500 }}>{inv.customer}</td>
									<td style={{ padding: '14px 16px', color: '#71717A' }}>{inv.plan}</td>
									<td style={{ padding: '14px 16px', color: '#18181B', fontFamily: 'JetBrains Mono, monospace' }}>
										${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
									</td>
									<td style={{ padding: '14px 16px' }}>
										<StatusBadge status={inv.status} />
									</td>
									<td style={{ padding: '14px 16px', color: '#71717A' }}>{inv.date}</td>
									<td style={{ padding: '14px 16px' }}>
										<button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717A', padding: 4 }}>
											<MoreHorizontal size={16} />
										</button>
									</td>
								</motion.tr>
							))}
							{visible.length === 0 && (
								<tr>
									<td colSpan={7} style={{ padding: '48px 16px', textAlign: 'center' }}>
										<div style={{ fontSize: 14, fontWeight: 600, color: '#18181B' }}>No invoices match your filters</div>
										<div style={{ fontSize: 12, color: '#71717A', marginTop: 4 }}>
											Try widening the date range or clearing the status filter.
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Card>
			</div>
		</div>
	);
};

export const InvoicesPage: Story = {
	render: () => <InvoicesPageScene />,
};

// ---------- Billing Card Showcase ----------

const BillingCardScene = () => {
	const [autoRenew, setAutoRenew] = useState(true);
	const [usageAlerts, setUsageAlerts] = useState(false);

	return (
		<div style={{ background: '#FAFAFA', minHeight: '100vh', padding: 48 }}>
			<div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
				<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
					<Card variant='elevated'>
						<CardHeader
							title='Current plan'
							subtitle='Growth · Billed monthly'
							cta={
								<CtaButton size='sm' variant='outline' icon={<ArrowUpRight size={14} />}>
									Upgrade
								</CtaButton>
							}
						/>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 16 }}>
							<div>
								<div style={{ fontSize: 12, color: '#71717A', marginBottom: 4 }}>Monthly cost</div>
								<div style={{ fontSize: 24, fontWeight: 600, color: '#092E44' }}>$249</div>
							</div>
							<div>
								<div style={{ fontSize: 12, color: '#71717A', marginBottom: 4 }}>Renews on</div>
								<div style={{ fontSize: 16, fontWeight: 500, color: '#18181B' }}>Jun 1, 2026</div>
							</div>
							<div>
								<div style={{ fontSize: 12, color: '#71717A', marginBottom: 4 }}>Status</div>
								<StatusBadge status='paid' />
							</div>
						</div>
					</Card>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
					<Card>
						<CardHeader title='Usage this month' subtitle='Resets on the 1st' />
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
							<Progress value={42} label='API calls — 420K of 1M' />
							<Progress value={78} label='Storage — 3.9 GB of 5 GB' indicatorColor='bg-amber-500' labelColor='text-amber-700' />
							<Progress value={95} label='Bandwidth — 9.5 GB of 10 GB' indicatorColor='bg-red-500' labelColor='text-red-700' />
						</div>
					</Card>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}>
					<Card>
						<CardHeader title='Preferences' />
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
							<PolishedToggle
								checked={autoRenew}
								onChange={setAutoRenew}
								label='Auto-renew subscription'
								description='Automatically charge your card on the 1st of every month.'
							/>
							<PolishedToggle
								checked={usageAlerts}
								onChange={setUsageAlerts}
								label='Usage alerts'
								description='Email me when I cross 80% of any quota.'
							/>
						</div>
					</Card>
				</motion.div>
			</div>
		</div>
	);
};

export const BillingPage: Story = {
	render: () => <BillingCardScene />,
};

// ---------- Empty Hero ----------

export const EmptyDashboard: Story = {
	render: () => (
		<div
			style={{ background: '#FAFAFA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
			<motion.div
				initial={{ opacity: 0, scale: 0.96 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				style={{ maxWidth: 480, textAlign: 'center' }}>
				<div
					style={{
						width: 72,
						height: 72,
						margin: '0 auto 20px',
						background: 'linear-gradient(135deg, #092E44 0%, #1A4A6B 100%)',
						borderRadius: 20,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 8px 24px rgba(9, 46, 68, 0.25)',
					}}>
					<Plus size={32} color='white' />
				</div>
				<h2 style={{ fontSize: 24, fontWeight: 600, color: '#092E44', margin: '0 0 8px 0' }}>Create your first plan</h2>
				<p style={{ fontSize: 14, color: '#71717A', margin: '0 0 24px 0', lineHeight: 1.6 }}>
					Plans define how you charge customers. Set base price, usage tiers, entitlements and trials — all from one place.
				</p>
				<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
					<Button variant='outline' size='sm'>
						View docs
					</Button>
					<CtaButton size='sm' icon={<Plus size={14} />}>
						Create plan
					</CtaButton>
				</div>
			</motion.div>
		</div>
	),
};

// ---------- Metrics Dashboard ----------

export const MetricsDashboard: Story = {
	render: () => (
		<div style={{ background: '#FAFAFA', minHeight: '100vh', padding: 32 }}>
			<div style={{ maxWidth: 1100, margin: '0 auto' }}>
				<div style={{ marginBottom: 24 }}>
					<div style={{ fontSize: 12, letterSpacing: 1.5, color: '#71717A', marginBottom: 4 }}>OVERVIEW</div>
					<h1 style={{ fontSize: 28, fontWeight: 600, color: '#092E44', margin: 0 }}>Dashboard</h1>
					<p style={{ fontSize: 14, color: '#71717A', margin: '4px 0 0 0' }}>Last 30 days</p>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
					<Card>
						<AnimatedCounter value={48720} label='Revenue' prefix='$' decimals={0} delta={18} deltaLabel='vs last 30d' />
					</Card>
					<Card>
						<AnimatedCounter value={142} label='Active subscriptions' delta={9} deltaLabel='MoM' />
					</Card>
					<Card>
						<AnimatedCounter value={2.34} label='Avg invoice' prefix='$' suffix='K' decimals={2} delta={-3} />
					</Card>
					<Card>
						<AnimatedCounter value={99.7} label='Uptime' suffix='%' decimals={1} delta={0} />
					</Card>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
					<Card>
						<CardHeader title='Usage this month' subtitle='All metered features' />
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
							<AnimatedProgress value={42} label='API calls — 420K of 1M' tone='primary' />
							<AnimatedProgress value={78} label='Storage — 3.9 GB of 5 GB' tone='warning' />
							<AnimatedProgress value={95} label='Bandwidth — 9.5 GB of 10 GB' tone='danger' />
							<AnimatedProgress value={28} label='Compute hours — 28 of 100' tone='success' />
						</div>
					</Card>

					<Card>
						<CardHeader title='Top customers' />
						<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
							{[
								{ name: 'Acme Corp', amount: 8420, status: 'paid' as StatusKind },
								{ name: 'Linear Labs', amount: 6240, status: 'pending' as StatusKind },
								{ name: 'Vercel Studios', amount: 4180, status: 'paid' as StatusKind },
								{ name: 'Notion Inc.', amount: 3920, status: 'processing' as StatusKind },
							].map((c, i) => (
								<motion.div
									key={c.name}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.06 + 0.3 }}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '8px 0',
										borderBottom: i === 3 ? 'none' : '1px solid #F4F4F5',
									}}>
									<div>
										<div style={{ fontSize: 14, fontWeight: 500, color: '#18181B' }}>{c.name}</div>
										<div style={{ fontSize: 12, color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
											${c.amount.toLocaleString()}
										</div>
									</div>
									<StatusBadge status={c.status} />
								</motion.div>
							))}
						</div>
					</Card>
				</div>
			</div>
		</div>
	),
};

// ---------- Onboarding Wizard ----------

const OnboardingScene = () => {
	const [step, setStep] = useState(0);
	const [features, setFeatures] = useState({ usage: true, alerts: false, webhooks: true, api: false });

	const steps = [
		{ label: 'Plan basics', hint: 'Name & price' },
		{ label: 'Features', hint: 'Entitlements' },
		{ label: 'Trial', hint: 'Free period' },
		{ label: 'Review', hint: 'Confirm' },
	];

	const featureOpts = [
		{ k: 'usage', label: 'Metered usage tracking', description: 'Bill customers based on API calls or storage.' },
		{ k: 'alerts', label: 'Usage alerts', description: 'Email customers when they cross 80% of a quota.' },
		{ k: 'webhooks', label: 'Webhooks', description: 'POST to a URL on every billing event.' },
		{ k: 'api', label: 'Public API access', description: 'Allow programmatic plan management.' },
	] as const;

	return (
		<div style={{ background: '#FAFAFA', minHeight: '100vh', padding: 48 }}>
			<div style={{ maxWidth: 720, margin: '0 auto' }}>
				<div style={{ marginBottom: 32 }}>
					<AnimatedStepper steps={steps} activeStep={step} />
				</div>

				<motion.div
					key={step}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35, ease: 'easeOut' }}>
					<Card variant='elevated'>
						{step === 0 && (
							<>
								<CardHeader title='Plan basics' subtitle='Name and base pricing for this plan.' />
								<div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
									<div>
										<label style={{ fontSize: 13, fontWeight: 500, color: '#18181B', display: 'block', marginBottom: 6 }}>Plan name</label>
										<input
											defaultValue='Growth'
											style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E4E7', borderRadius: 8, fontSize: 14 }}
										/>
									</div>
									<div>
										<label style={{ fontSize: 13, fontWeight: 500, color: '#18181B', display: 'block', marginBottom: 6 }}>
											Monthly price (USD)
										</label>
										<input
											defaultValue='249'
											style={{ width: '100%', padding: '10px 12px', border: '1px solid #E4E4E7', borderRadius: 8, fontSize: 14 }}
										/>
									</div>
								</div>
							</>
						)}

						{step === 1 && (
							<>
								<CardHeader title='Features' subtitle='Pick what is included in this plan.' />
								<div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
									{featureOpts.map((f) => (
										<AnimatedCheckbox
											key={f.k}
											id={f.k}
											checked={features[f.k]}
											onChange={(v) => setFeatures({ ...features, [f.k]: v })}
											label={f.label}
											description={f.description}
										/>
									))}
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<CardHeader title='Free trial' subtitle='Optionally let customers try this plan for free.' />
								<div style={{ marginTop: 16, padding: 24, background: '#F9FAFB', borderRadius: 8, textAlign: 'center' }}>
									<AnimatedCounter value={14} label='Trial length' suffix=' days' />
								</div>
							</>
						)}

						{step === 3 && (
							<>
								<CardHeader title='Review' subtitle='Looks good?' />
								<div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
									<div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F4F4F5' }}>
										<span style={{ fontSize: 13, color: '#71717A' }}>Plan name</span>
										<span style={{ fontSize: 13, fontWeight: 500 }}>Growth</span>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F4F4F5' }}>
										<span style={{ fontSize: 13, color: '#71717A' }}>Monthly price</span>
										<span style={{ fontSize: 13, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace' }}>$249.00</span>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F4F4F5' }}>
										<span style={{ fontSize: 13, color: '#71717A' }}>Features</span>
										<span style={{ fontSize: 13, fontWeight: 500 }}>{Object.values(features).filter(Boolean).length} enabled</span>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
										<span style={{ fontSize: 13, color: '#71717A' }}>Trial</span>
										<span style={{ fontSize: 13, fontWeight: 500 }}>14 days</span>
									</div>
								</div>
							</>
						)}
					</Card>
				</motion.div>

				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
					<Button variant='outline' size='sm' disabled={step === 0} onClick={() => setStep(step - 1)}>
						Back
					</Button>
					{step < steps.length - 1 ? (
						<CtaButton size='sm' onClick={() => setStep(step + 1)}>
							Continue
						</CtaButton>
					) : (
						<CtaButton size='sm' icon={<Plus size={14} />}>
							Create plan
						</CtaButton>
					)}
				</div>
			</div>
		</div>
	);
};

export const OnboardingWizard: Story = {
	render: () => <OnboardingScene />,
};
