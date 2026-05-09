import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import Chip from './Chip';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

/**
 * Status chip / badge used in tables, cards and headers to display
 * categorical state (paid, failed, pending, etc.).
 */
const meta = {
	title: 'Atoms/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
		},
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		bgColor: { control: 'color' },
		textColor: { control: 'color' },
		borderColor: { control: 'color' },
		onClick: { action: 'clicked' },
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Default',
		variant: 'default',
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
			<Chip label='Default' variant='default' />
			<Chip label='Paid' variant='success' />
			<Chip label='Pending' variant='warning' />
			<Chip label='Failed' variant='failed' />
			<Chip label='Info' variant='info' />
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
			<Chip label='Paid' variant='success' icon={<CheckCircle2 size={14} />} />
			<Chip label='Pending' variant='warning' icon={<AlertTriangle size={14} />} />
			<Chip label='Failed' variant='failed' icon={<XCircle size={14} />} />
			<Chip label='Info' variant='info' icon={<Info size={14} />} />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled chip',
		variant: 'success',
		disabled: true,
	},
};

export const Custom: Story = {
	args: {
		label: 'Custom colors',
		bgColor: '#E0F2FE',
		textColor: '#0369A1',
		borderColor: '#7DD3FC',
	},
};

export const ClickInteraction: Story = {
	args: {
		label: 'Click me',
		variant: 'info',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const chip = canvas.getByText('Click me');
		await userEvent.click(chip);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
