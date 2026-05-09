import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AnimatedCheckbox from './AnimatedCheckbox';

const meta = {
	title: 'Atoms/AnimatedCheckbox',
	component: AnimatedCheckbox,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		description: { control: 'text' },
	},
} satisfies Meta<typeof AnimatedCheckbox>;

export default meta;
type Story = StoryObj<typeof AnimatedCheckbox>;

const Controlled = (args: React.ComponentProps<typeof AnimatedCheckbox>) => {
	const [checked, setChecked] = useState(args.checked ?? false);
	return <AnimatedCheckbox {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
	render: (args) => <Controlled {...args} />,
	args: { id: 'default', label: 'Send weekly digest', description: 'Every Monday at 9 AM IST.' },
};

export const Checked: Story = {
	render: (args) => <Controlled {...args} />,
	args: { id: 'checked', checked: true, label: 'Enabled by default' },
};

export const PlainBox: Story = {
	render: (args) => <Controlled {...args} />,
	args: { id: 'plain' },
};

export const Disabled: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<AnimatedCheckbox checked={false} onChange={() => {}} disabled label='Off + disabled' />
			<AnimatedCheckbox checked={true} onChange={() => {}} disabled label='On + disabled' />
		</div>
	),
};

const Group = () => {
	const [state, setState] = useState({ usage: true, billing: false, errors: true, marketing: false });
	const opts = [
		{ k: 'usage', label: 'Usage alerts', description: 'When you cross 80% of any quota.' },
		{ k: 'billing', label: 'Billing receipts', description: 'Sent after every successful payment.' },
		{ k: 'errors', label: 'Webhook failures', description: 'When a webhook delivery fails 3 times.' },
		{ k: 'marketing', label: 'Product updates', description: 'New features and changelog highlights.' },
	] as const;
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
			{opts.map((o) => (
				<AnimatedCheckbox
					key={o.k}
					id={o.k}
					checked={state[o.k]}
					onChange={(v) => setState({ ...state, [o.k]: v })}
					label={o.label}
					description={o.description}
				/>
			))}
		</div>
	);
};

export const NotificationGroup: Story = {
	render: () => <Group />,
};
