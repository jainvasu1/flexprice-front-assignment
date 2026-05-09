import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PricingTierTable from './PricingTierTable';
import { PricingTier } from '@/lib/tierPrice';
import Button from '@/components/atoms/Button/Button';

const meta = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof PricingTierTable>;

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

const apiCallTiers: PricingTier[] = [
	{ from: 1, to: 1000, unitPrice: 0.01 },
	{ from: 1001, to: 10000, unitPrice: 0.005 },
	{ from: 10001, to: 100000, unitPrice: 0.002 },
	{ from: 100001, to: null, unitPrice: 0.001 },
];

const seatTiers: PricingTier[] = [
	{ from: 1, to: 5, unitPrice: 25, flatFee: 0 },
	{ from: 6, to: 25, unitPrice: 20 },
	{ from: 26, to: 100, unitPrice: 15 },
	{ from: 101, to: null, unitPrice: 10 },
];

export const Graduated: Story = {
	render: () => (
		<div style={{ maxWidth: 720 }}>
			<PricingTierTable
				tiers={apiCallTiers}
				mode='graduated'
				title='API call pricing'
				subtitle='Each tier is charged its own per-unit rate as you cross it.'
				sampleUsage={15000}
			/>
		</div>
	),
};

export const Volume: Story = {
	render: () => (
		<div style={{ maxWidth: 720 }}>
			<PricingTierTable
				tiers={apiCallTiers}
				mode='volume'
				title='API call pricing'
				subtitle='Total usage priced at the rate of the highest tier reached.'
				sampleUsage={15000}
			/>
		</div>
	),
};

export const SeatBased: Story = {
	render: () => (
		<div style={{ maxWidth: 720 }}>
			<PricingTierTable
				tiers={seatTiers}
				mode='graduated'
				title='Per-seat pricing'
				subtitle='Volume discount kicks in at 6, 26 and 101 seats.'
				sampleUsage={32}
			/>
		</div>
	),
};

const Interactive = () => {
	const [mode, setMode] = useState<'graduated' | 'volume'>('graduated');
	const [usage, setUsage] = useState(15000);
	return (
		<div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
			<PricingTierTable
				tiers={apiCallTiers}
				mode={mode}
				sampleUsage={usage}
				title='API call pricing'
				subtitle='Toggle the mode and slide the usage to see how the total changes.'
				headerRight={
					<div style={{ display: 'flex', gap: 6 }}>
						<Button
							size='xs'
							variant={mode === 'graduated' ? 'default' : 'outline'}
							onClick={() => setMode('graduated')}>
							Graduated
						</Button>
						<Button
							size='xs'
							variant={mode === 'volume' ? 'default' : 'outline'}
							onClick={() => setMode('volume')}>
							Volume
						</Button>
					</div>
				}
			/>
			<div style={{ padding: 16, border: '1px solid #E4E4E7', borderRadius: 12, background: '#FAFAFA' }}>
				<label style={{ fontSize: 12, color: '#71717A', display: 'block', marginBottom: 8 }}>
					Sample usage: <strong style={{ color: '#092E44' }}>{usage.toLocaleString()}</strong> units
				</label>
				<input
					type='range'
					min={0}
					max={200000}
					step={500}
					value={usage}
					onChange={(e) => setUsage(parseInt(e.target.value, 10))}
					style={{ width: '100%' }}
				/>
			</div>
		</div>
	);
};

export const InteractiveDemo: Story = {
	render: () => <Interactive />,
};
