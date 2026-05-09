import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

/**
 * Linear progress bar used to visualise usage, quotas and onboarding completion.
 * Supports custom indicator/background colors and an inline label.
 */
const meta = {
	title: 'Atoms/Progress',
	component: Progress,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		indicatorColor: { control: 'text' },
		backgroundColor: { control: 'text' },
		labelColor: { control: 'text' },
		label: { control: 'text' },
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 40,
	},
};

export const WithLabel: Story = {
	args: {
		value: 65,
		label: '65% of monthly quota used',
	},
};

export const NearLimit: Story = {
	args: {
		value: 92,
		label: '92% — approaching limit',
		indicatorColor: 'bg-red-500',
		labelColor: 'text-red-600',
	},
};

export const Empty: Story = {
	args: {
		value: 0,
		label: 'No usage yet',
	},
};

export const Complete: Story = {
	args: {
		value: 100,
		label: 'Setup complete',
		indicatorColor: 'bg-green-500',
	},
};

export const Stack: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
			<Progress value={20} label='API calls — 20%' />
			<Progress value={55} label='Storage — 55%' />
			<Progress value={88} label='Bandwidth — 88%' indicatorColor='bg-orange-500' />
		</div>
	),
};
