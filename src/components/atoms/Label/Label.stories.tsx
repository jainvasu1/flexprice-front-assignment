import type { Meta, StoryObj } from '@storybook/react';
import Label from './Label';

/**
 * Form label used above inputs and selects.
 * Supports a disabled visual state and a custom class for layout overrides.
 */
const meta = {
	title: 'Atoms/Label',
	component: Label,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		htmlFor: { control: 'text' },
		labelClassName: { control: 'text' },
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Email address',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Email address',
		disabled: true,
	},
};

export const ForInput: Story = {
	render: (args) => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Label {...args} htmlFor='demo-input' />
			<input id='demo-input' className='border rounded px-3 py-2 text-sm' placeholder='you@flexprice.io' />
		</div>
	),
	args: {
		label: 'Email address',
	},
};

export const ChildrenContent: Story = {
	args: {
		label: '',
		children: (
			<span>
				Custom <em>rendered</em> content
			</span>
		),
	},
};
