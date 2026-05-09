import type { Meta, StoryObj } from '@storybook/react';
import NoDataCard from './NoDataCard';
import Button from '../Button/Button';
import { Plus } from 'lucide-react';

/**
 * Empty-state card shown when a list/table has no data.
 * Encourages a primary action to populate the section.
 */
const meta = {
	title: 'Atoms/NoDataCard',
	component: NoDataCard,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		subtitle: { control: 'text' },
	},
} satisfies Meta<typeof NoDataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'No subscriptions yet',
		subtitle: 'Subscriptions you create will appear here.',
	},
};

export const WithCta: Story = {
	args: {
		title: 'No plans created',
		subtitle: 'Create your first plan to start billing customers.',
		cta: <Button prefixIcon={<Plus />}>Create Plan</Button>,
	},
};

export const RecentSubscriptions: Story = {
	args: {
		title: 'Recent Subscriptions',
		subtitle: 'No subscriptions created in the last 24 hours.',
		cta: (
			<Button variant='outline' size='sm'>
				View latest data
			</Button>
		),
	},
};
