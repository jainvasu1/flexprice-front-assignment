import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';
import { DollarSign, Users, FileText, Activity, TrendingUp, Server } from 'lucide-react';

/**
 * Dashboard KPI card composing Card + AnimatedCounter.
 * Use it for the headline metrics on the Flexprice overview screen.
 */
const meta = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'number' },
		prefix: { control: 'text' },
		suffix: { control: 'text' },
		decimals: { control: { type: 'number', min: 0, max: 4 } },
		delta: { control: 'number' },
		deltaLabel: { control: 'text' },
		loading: { control: 'boolean' },
	},
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
	args: {
		label: 'Revenue',
		value: 48720,
		prefix: '$',
		decimals: 0,
		delta: 18,
		deltaLabel: 'vs last 30d',
	},
};

export const WithIcon: Story = {
	args: {
		label: 'Active subscriptions',
		value: 142,
		delta: 9,
		deltaLabel: 'MoM',
		icon: <Users size={16} />,
	},
};

export const Loading: Story = {
	args: {
		label: 'Revenue',
		value: 0,
		loading: true,
	},
};

export const NoDelta: Story = {
	args: {
		label: 'Total customers',
		value: 1284,
		icon: <Users size={16} />,
	},
};

export const WithFooter: Story = {
	args: {
		label: 'Avg invoice',
		value: 2.34,
		prefix: '$',
		suffix: 'K',
		decimals: 2,
		delta: -3,
		icon: <FileText size={16} />,
		footer: 'Across 87 invoices issued this month',
	},
};

export const Grid: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 1100 }}>
			<MetricCard label='Revenue' value={48720} prefix='$' decimals={0} delta={18} deltaLabel='vs last 30d' icon={<DollarSign size={16} />} />
			<MetricCard label='Active subs' value={142} delta={9} deltaLabel='MoM' icon={<Users size={16} />} />
			<MetricCard label='Avg invoice' value={2.34} prefix='$' suffix='K' decimals={2} delta={-3} icon={<FileText size={16} />} />
			<MetricCard label='Uptime' value={99.7} suffix='%' decimals={1} delta={0} icon={<Activity size={16} />} />
		</div>
	),
};

export const SmallDashboard: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 900 }}>
			<MetricCard
				label='MRR'
				value={48720}
				prefix='$'
				decimals={0}
				delta={18}
				deltaLabel='vs last month'
				icon={<TrendingUp size={16} />}
				footer='Recurring + new'
			/>
			<MetricCard
				label='API calls'
				value={2400000}
				delta={32}
				deltaLabel='this week'
				icon={<Server size={16} />}
				footer='80% of plan limit'
			/>
			<MetricCard
				label='Failed invoices'
				value={4}
				delta={-23}
				deltaLabel='vs Apr'
				icon={<FileText size={16} />}
				footer='Auto-retry enabled'
			/>
		</div>
	),
};
