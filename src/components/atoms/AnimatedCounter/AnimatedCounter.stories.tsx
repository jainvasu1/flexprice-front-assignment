import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AnimatedCounter from './AnimatedCounter';
import Card from '../Card/Card';
import Button from '../Button/Button';

const meta = {
	title: 'Atoms/AnimatedCounter',
	component: AnimatedCounter,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'number' },
		decimals: { control: { type: 'number', min: 0, max: 4 } },
		delta: { control: 'number' },
		durationMs: { control: 'number' },
		prefix: { control: 'text' },
		suffix: { control: 'text' },
		label: { control: 'text' },
	},
} satisfies Meta<typeof AnimatedCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: 12540, label: 'Total revenue', prefix: '$', decimals: 2 },
};

export const WithDelta: Story = {
	args: { value: 87, label: 'Active subscriptions', delta: 12, deltaLabel: 'vs last month' },
};

export const NegativeDelta: Story = {
	args: { value: 4, label: 'Failed invoices', delta: -23, deltaLabel: 'MoM' },
};

export const Percent: Story = {
	args: { value: 96.4, label: 'Uptime', suffix: '%', decimals: 1 },
};

export const MetricGrid: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 960 }}>
			<Card>
				<AnimatedCounter value={12540} label='Revenue (MTD)' prefix='$' decimals={0} delta={12} deltaLabel='vs Apr' />
			</Card>
			<Card>
				<AnimatedCounter value={87} label='Active subs' delta={5} deltaLabel='vs Apr' />
			</Card>
			<Card>
				<AnimatedCounter value={2.34} label='Avg invoice' prefix='$' suffix='K' decimals={2} delta={-3} />
			</Card>
			<Card>
				<AnimatedCounter value={99.7} label='Uptime' suffix='%' decimals={1} delta={0} />
			</Card>
		</div>
	),
};

const Replayable = () => {
	const [k, setK] = useState(0);
	const [val, setVal] = useState(12540);
	return (
		<div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
			<Card>
				<AnimatedCounter key={k} value={val} label='Revenue' prefix='$' decimals={0} />
			</Card>
			<div style={{ display: 'flex', gap: 8 }}>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setVal(5000);
						setK(k + 1);
					}}>
					5K
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setVal(25000);
						setK(k + 1);
					}}>
					25K
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setVal(100000);
						setK(k + 1);
					}}>
					100K
				</Button>
				<Button size='sm' onClick={() => setK(k + 1)}>
					Replay
				</Button>
			</div>
		</div>
	);
};

export const Interactive: Story = {
	render: () => <Replayable />,
};
