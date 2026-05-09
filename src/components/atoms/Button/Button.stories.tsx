import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import Button from './Button';
import { Plus, ArrowRight } from 'lucide-react';

/**
 * Primary action button used across the Flexprice dashboard.
 * Supports multiple visual variants, sizes, loading state and icon slots.
 */
const meta = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'icon', 'xs'],
		},
		isLoading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		children: { control: 'text' },
		onClick: { action: 'clicked' },
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Click me',
		variant: 'default',
		size: 'default',
	},
};

export const Variants: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
			<Button {...args} variant='default'>
				Default
			</Button>
			<Button {...args} variant='black'>
				Black
			</Button>
			<Button {...args} variant='destructive'>
				Destructive
			</Button>
			<Button {...args} variant='outline'>
				Outline
			</Button>
			<Button {...args} variant='secondary'>
				Secondary
			</Button>
			<Button {...args} variant='ghost'>
				Ghost
			</Button>
			<Button {...args} variant='link'>
				Link
			</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
			<Button {...args} size='xs'>
				Extra small
			</Button>
			<Button {...args} size='sm'>
				Small
			</Button>
			<Button {...args} size='default'>
				Default
			</Button>
			<Button {...args} size='lg'>
				Large
			</Button>
		</div>
	),
};

export const Loading: Story = {
	args: {
		children: 'Saving...',
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

export const WithIcons: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 12 }}>
			<Button {...args} prefixIcon={<Plus />}>
				Create Plan
			</Button>
			<Button {...args} suffixIcon={<ArrowRight />} variant='outline'>
				Continue
			</Button>
		</div>
	),
};

export const ClickInteraction: Story = {
	args: {
		children: 'Press me',
		variant: 'default',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const btn = canvas.getByRole('button', { name: /press me/i });
		await userEvent.click(btn);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
