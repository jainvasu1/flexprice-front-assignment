import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

/**
 * Horizontal rule used to separate sections within cards, drawers and forms.
 * Color, width and alignment are configurable.
 */
const meta = {
	title: 'Atoms/Divider',
	component: Divider,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		color: { control: 'color' },
		width: { control: 'text' },
		alignment: {
			control: 'radio',
			options: ['left', 'center', 'right'],
		},
		className: { control: 'text' },
	},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Colored: Story = {
	args: {
		color: '#092E44',
	},
};

export const HalfWidth: Story = {
	args: {
		width: '50%',
	},
};

export const LeftAligned: Story = {
	args: {
		width: '40%',
		alignment: 'left',
	},
};

export const InContext: Story = {
	render: () => (
		<div style={{ maxWidth: 400 }}>
			<p className='text-sm font-medium'>Subscription details</p>
			<p className='text-xs text-gray-500'>Plan: Growth</p>
			<Divider />
			<p className='text-sm font-medium mt-3'>Usage</p>
			<p className='text-xs text-gray-500'>2.3M API calls this month</p>
		</div>
	),
};
