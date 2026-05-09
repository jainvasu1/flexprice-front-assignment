import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Toggle from './Toggle';

/**
 * Boolean switch used in settings and configuration drawers.
 * Supports a section title, label, helper description and inline error.
 */
const meta = {
	title: 'Atoms/Toggle',
	component: Toggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		label: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		onChange: { action: 'changed' },
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Enable notifications',
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		label: 'Auto-renew subscription',
		checked: true,
	},
};

export const WithDescription: Story = {
	args: {
		title: 'Email preferences',
		label: 'Marketing emails',
		description: 'Receive product updates and promotions from Flexprice.',
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Beta features',
		description: 'Available on Enterprise plan only.',
		checked: false,
		disabled: true,
	},
};

export const Error: Story = {
	args: {
		label: 'Critical setting',
		checked: false,
		error: 'You must enable this to continue.',
	},
};
