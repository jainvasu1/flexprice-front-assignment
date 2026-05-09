import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AnimatedProgress from './AnimatedProgress';
import Button from '../Button/Button';

/**
 * Progress bar with a count-up label that springs to its target value.
 */
const meta = {
	title: 'Atoms/AnimatedProgress',
	component: AnimatedProgress,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	argTypes: {
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		tone: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
		showPercent: { control: 'boolean' },
		durationMs: { control: 'number' },
		label: { control: 'text' },
	},
} satisfies Meta<typeof AnimatedProgress>;

export default meta;
type Story = StoryObj<typeof AnimatedProgress>;

export const Default: Story = {
	args: { value: 42, label: 'API calls' },
};

export const Stack: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
			<AnimatedProgress value={28} label='API calls' tone='primary' />
			<AnimatedProgress value={62} label='Storage' tone='success' />
			<AnimatedProgress value={84} label='Bandwidth' tone='warning' />
			<AnimatedProgress value={97} label='Compute' tone='danger' />
		</div>
	),
};

const Replayable = () => {
	const [k, setK] = useState(0);
	const [target, setTarget] = useState(70);
	return (
		<div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
			<AnimatedProgress key={k} value={target} label='Onboarding completion' tone='primary' />
			<div style={{ display: 'flex', gap: 8 }}>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setTarget(25);
						setK(k + 1);
					}}>
					25%
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setTarget(60);
						setK(k + 1);
					}}>
					60%
				</Button>
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						setTarget(100);
						setK(k + 1);
					}}>
					100%
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
