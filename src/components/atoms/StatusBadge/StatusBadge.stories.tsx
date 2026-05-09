import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';

/**
 * Status pill used in invoice tables, subscription rows and activity feeds.
 * `pending` and `processing` animate with a soft pulse to draw the eye.
 */
const meta = {
	title: 'Atoms/StatusBadge',
	component: StatusBadge,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['paid', 'pending', 'processing', 'failed', 'draft', 'refunded'],
		},
		label: { control: 'text' },
	},
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
	args: { status: 'paid' },
};

export const All: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
			<StatusBadge status='paid' />
			<StatusBadge status='pending' />
			<StatusBadge status='processing' />
			<StatusBadge status='failed' />
			<StatusBadge status='draft' />
			<StatusBadge status='refunded' />
		</div>
	),
};

export const PulsingPending: Story = {
	args: { status: 'pending' },
};

export const Processing: Story = {
	args: { status: 'processing' },
};

export const CustomLabel: Story = {
	args: { status: 'pending', label: 'Awaiting payment' },
};
