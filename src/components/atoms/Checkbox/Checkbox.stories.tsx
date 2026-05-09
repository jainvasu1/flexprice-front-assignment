import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import Checkbox from './Checkbox';

/**
 * Accessible checkbox built on Radix UI primitives.
 * Optionally supports a label and helper description.
 */
const meta = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		id: { control: 'text' },
		checked: { control: 'boolean' },
		label: { control: 'text' },
		description: { control: 'text' },
		onCheckedChange: { action: 'checked' },
	},
	args: {
		onCheckedChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 'default',
		label: 'Accept terms',
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		id: 'checked',
		label: 'Subscribed',
		checked: true,
	},
};

export const WithDescription: Story = {
	args: {
		id: 'desc',
		label: 'Send weekly invoice digest',
		description: 'You will receive a summary email every Monday at 9 AM.',
		checked: false,
	},
};

export const NoLabel: Story = {
	args: {
		id: 'plain',
		checked: false,
	},
};

export const ToggleInteraction: Story = {
	args: {
		id: 'toggle-test',
		label: 'Click to toggle',
		checked: false,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const cb = canvas.getByRole('checkbox');
		await userEvent.click(cb);
		await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
	},
};
