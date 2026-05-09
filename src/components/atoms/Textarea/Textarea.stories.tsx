import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import Textarea from './Textarea';

/**
 * Multi-line text input used for descriptions, notes and metadata fields.
 * Supports label, helper description and error state.
 */
const meta = {
	title: 'Atoms/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		description: { control: 'text' },
		error: { control: 'text' },
		disabled: { control: 'boolean' },
		value: { control: 'text' },
		onChange: { action: 'changed' },
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Type something...',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Description',
		placeholder: 'Describe what this plan covers',
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Notes',
		description: 'Visible only to admins.',
		placeholder: 'Add internal notes',
	},
};

export const Error: Story = {
	args: {
		label: 'Description',
		error: 'Description is required',
		placeholder: 'Describe what this plan covers',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Description',
		value: 'You cannot edit this.',
		disabled: true,
	},
};

export const TypingInteraction: Story = {
	args: {
		id: 'ta-test',
		label: 'Notes',
		placeholder: 'Write here',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const ta = canvas.getByPlaceholderText('Write here');
		await userEvent.type(ta, 'Quarterly review notes');
		await expect(ta).toHaveValue('Quarterly review notes');
	},
};
