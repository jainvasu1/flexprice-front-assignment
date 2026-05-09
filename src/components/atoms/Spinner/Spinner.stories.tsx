import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

/**
 * Indeterminate loading spinner used for inline async indicators
 * (table rows, save buttons, partial fetch states).
 */
const meta = {
	title: 'Atoms/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'number', min: 12, max: 96, step: 4 } },
		className: { control: 'text' },
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { size: 24 },
};

export const Small: Story = {
	args: { size: 16 },
};

export const Large: Story = {
	args: { size: 48 },
};

export const Colored: Story = {
	args: { size: 32, className: 'text-blue-500' },
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
			<Spinner size={16} />
			<Spinner size={24} />
			<Spinner size={32} />
			<Spinner size={48} />
		</div>
	),
};
