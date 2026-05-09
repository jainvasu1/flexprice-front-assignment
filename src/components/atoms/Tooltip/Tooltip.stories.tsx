import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';
import { Info } from 'lucide-react';

/**
 * Hover tooltip used to surface contextual help text on icons,
 * truncated labels, or disabled actions.
 */
const meta = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		sideOffset: { control: 'number' },
		delayDuration: { control: 'number' },
		content: { control: 'text' },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	args: {
		content: 'Helpful tooltip text',
		children: <Button variant='outline'>Hover me</Button>,
	},
};

export const Sides: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 24, padding: 80 }}>
			<Tooltip content='Top tooltip' side='top'>
				<Button variant='outline'>Top</Button>
			</Tooltip>
			<Tooltip content='Right tooltip' side='right'>
				<Button variant='outline'>Right</Button>
			</Tooltip>
			<Tooltip content='Bottom tooltip' side='bottom'>
				<Button variant='outline'>Bottom</Button>
			</Tooltip>
			<Tooltip content='Left tooltip' side='left'>
				<Button variant='outline'>Left</Button>
			</Tooltip>
		</div>
	),
};

export const OnIcon: Story = {
	args: {
		content: 'This is the active billing region.',
		children: <Info size={18} className='text-gray-500 cursor-help' />,
	},
};

export const RichContent: Story = {
	args: {
		side: 'right',
		content: (
			<div style={{ maxWidth: 220 }}>
				<strong>Usage limits</strong>
				<p style={{ fontSize: 12, marginTop: 4 }}>You have used 80% of your monthly quota.</p>
			</div>
		),
		children: <Button variant='outline'>Quota</Button>,
	},
};
