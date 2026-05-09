import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from '@storybook/test';
import CtaButton from './CtaButton';
import { ArrowRight, Plus } from 'lucide-react';

/**
 * Pill CTA button — same Flexprice colors, new pattern.
 * Hover the button to see the icon rotate 45 degrees while the pill scales.
 */
const meta = {
	title: 'Atoms/CtaButton',
	component: CtaButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['primary', 'dark', 'outline'] },
		size: { control: 'radio', options: ['sm', 'md', 'lg'] },
		disabled: { control: 'boolean' },
		children: { control: 'text' },
		onClick: { action: 'clicked' },
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Click me',
		variant: 'primary',
	},
};

export const Variants: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
			<CtaButton {...args} variant='primary'>
				Primary
			</CtaButton>
			<CtaButton {...args} variant='dark'>
				Dark
			</CtaButton>
			<CtaButton {...args} variant='outline'>
				Outline
			</CtaButton>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
			<CtaButton {...args} size='sm'>
				Small
			</CtaButton>
			<CtaButton {...args} size='md'>
				Medium
			</CtaButton>
			<CtaButton {...args} size='lg'>
				Large
			</CtaButton>
		</div>
	),
};

export const CustomIcons: Story = {
	render: (args) => (
		<div style={{ display: 'flex', gap: 16 }}>
			<CtaButton {...args} icon={<ArrowRight size={18} />}>
				Continue
			</CtaButton>
			<CtaButton {...args} icon={<Plus size={18} />} variant='dark'>
				Create plan
			</CtaButton>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

export const ClickInteraction: Story = {
	args: {
		children: 'Press me',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const btn = canvas.getByRole('button', { name: /press me/i });
		await userEvent.click(btn);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
