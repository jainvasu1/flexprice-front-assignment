import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Select from './Select';

/**
 * Dropdown select component used for choosing single options
 * in forms (data region, time period, role, plan, etc.).
 */
const meta = {
	title: 'Atoms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		required: { control: 'boolean' },
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		value: { control: 'text' },
		onChange: { action: 'changed' },
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const regionOptions = [
	{ value: 'us', label: 'United States' },
	{ value: 'eu', label: 'European Union' },
	{ value: 'in', label: 'India' },
	{ value: 'sg', label: 'Singapore' },
];

const roleOptions = [
	{ value: 'admin', label: 'Admin', description: 'Full access to all settings' },
	{ value: 'editor', label: 'Editor', description: 'Can create and update plans' },
	{ value: 'viewer', label: 'Viewer', description: 'Read-only access' },
];

export const Default: Story = {
	args: {
		label: 'Data region',
		placeholder: 'Select a region',
		options: regionOptions,
	},
};

export const Required: Story = {
	args: {
		label: 'Data region',
		required: true,
		placeholder: 'Select a region',
		options: regionOptions,
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Time period',
		description: 'Choose how far back to load usage data.',
		placeholder: 'Select period',
		options: [
			{ value: '24h', label: 'Last 24 hours' },
			{ value: '7d', label: 'Last 7 days' },
			{ value: '30d', label: 'Last 30 days' },
		],
	},
};

export const RadioStyle: Story = {
	args: {
		label: 'Your role',
		placeholder: 'Pick a role',
		isRadio: true,
		options: roleOptions,
	},
};

export const Error: Story = {
	args: {
		label: 'Data region',
		placeholder: 'Select a region',
		error: 'Region is required',
		required: true,
		options: regionOptions,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Data region',
		placeholder: 'Select a region',
		disabled: true,
		options: regionOptions,
	},
};

export const NoOptions: Story = {
	args: {
		label: 'Plans',
		placeholder: 'Select a plan',
		noOptionsText: 'No plans yet — create one first.',
		options: [],
	},
};
