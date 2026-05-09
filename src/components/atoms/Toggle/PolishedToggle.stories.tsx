import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, expect } from '@storybook/test';
import { useState } from 'react';
import PolishedToggle from './PolishedToggle';

/**
 * Showcase for the polished pill-style toggle.
 * Same Flexprice palette (#092E44 / zinc-300) — only the design and animation are new.
 */
const meta = {
	title: 'Atoms/PolishedToggle',
	component: PolishedToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'radio', options: ['sm', 'md', 'lg'] },
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		description: { control: 'text' },
		onChange: { action: 'changed' },
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof PolishedToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (args: React.ComponentProps<typeof PolishedToggle>) => {
	const [on, setOn] = useState(args.checked ?? false);
	return (
		<PolishedToggle
			{...args}
			checked={on}
			onChange={(next) => {
				setOn(next);
				args.onChange?.(next);
			}}
		/>
	);
};

export const Default: Story = {
	render: (args) => <Controlled {...args} />,
	args: {
		checked: false,
	},
};

export const On: Story = {
	render: (args) => <Controlled {...args} />,
	args: {
		checked: true,
	},
};

export const WithLabel: Story = {
	render: (args) => <Controlled {...args} />,
	args: {
		checked: true,
		label: 'Auto-renew subscription',
		description: 'Renews on the 1st of every month at 9:00 AM IST.',
	},
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
			<Controlled checked={true} onChange={() => {}} size='sm' />
			<Controlled checked={true} onChange={() => {}} size='md' />
			<Controlled checked={true} onChange={() => {}} size='lg' />
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 24 }}>
			<PolishedToggle checked={false} onChange={() => {}} disabled label='Off + disabled' />
			<PolishedToggle checked={true} onChange={() => {}} disabled label='On + disabled' />
		</div>
	),
};

export const ClickInteraction: Story = {
	render: (args) => <Controlled {...args} />,
	args: {
		checked: false,
		label: 'Click to toggle',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const sw = canvas.getByRole('switch');
		await expect(sw).toHaveAttribute('aria-checked', 'false');
		await userEvent.click(sw);
		await expect(sw).toHaveAttribute('aria-checked', 'true');
		await expect(args.onChange).toHaveBeenCalledWith(true);
	},
};
