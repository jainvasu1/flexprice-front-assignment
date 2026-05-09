import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import Input from './Input';

const meta = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number'],
		},
		error: { control: 'text' },
		disabled: { control: 'boolean' },
		fullWidth: { control: 'boolean' },
		value: { control: 'text' },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text here',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		type: 'email',
	},
};

export const WithError: Story = {
	args: {
		label: 'Password',
		type: 'password',
		error: 'Password must be at least 8 characters',
		placeholder: 'Enter your password',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		label: 'Full Name',
		placeholder: 'Enter your full name',
		fullWidth: true,
	},
	parameters: {
		layout: 'padded',
	},
};

export const WithValue: Story = {
	args: {
		label: 'Name',
		value: 'John Doe',
		placeholder: 'Enter your name',
	},
};

export const TypingInteraction: Story = {
	args: {
		label: 'Email',
		placeholder: 'type@here.com',
		type: 'email',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('type@here.com');
		await userEvent.type(input, 'hello@flexprice.io');
		await expect(input).toHaveValue('hello@flexprice.io');
	},
};
