import type { Meta, StoryObj } from '@storybook/react';
import Card, { CardHeader } from './Card';
import Button from '../Button/Button';

/**
 * Container component used across the dashboard for grouped content.
 * Supports several visual variants, optional notch indicator, and a header subcomponent.
 */
const meta = {
	title: 'Atoms/Card',
	component: Card,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'notched', 'bordered', 'elevated', 'warning'],
		},
		notchColor: {
			control: 'select',
			options: ['zinc', 'primary'],
		},
		notchPosition: {
			control: 'radio',
			options: ['left', 'right'],
		},
		notchSize: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
		noPadding: { control: 'boolean' },
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		children: (
			<div>
				<h3 className='text-lg font-semibold mb-2'>Recent Subscriptions</h3>
				<p className='text-sm text-gray-600'>0 New subscriptions in the last 24 hours.</p>
			</div>
		),
	},
};

export const WithHeader: Story = {
	args: {
		children: (
			<>
				<CardHeader
					title='Billing summary'
					subtitle='Last month at a glance'
					cta={
						<Button size='sm' variant='outline'>
							View all
						</Button>
					}
				/>
				<p className='text-sm text-gray-600'>$12,540 collected across 87 invoices.</p>
			</>
		),
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
			<Card variant='default'>
				<strong>Default</strong> — basic border
			</Card>
			<Card variant='bordered'>
				<strong>Bordered</strong> — thicker border
			</Card>
			<Card variant='elevated'>
				<strong>Elevated</strong> — drop shadow
			</Card>
			<Card variant='warning'>
				<strong>Warning</strong> — red highlight
			</Card>
			<Card variant='notched' notchColor='primary'>
				<strong>Notched</strong> — left accent bar
			</Card>
			<Card variant='notched' notchPosition='right' notchColor='zinc'>
				<strong>Notched right</strong>
			</Card>
		</div>
	),
};

export const NoPadding: Story = {
	args: {
		noPadding: true,
		children: (
			<img src='https://placehold.co/600x200/092E44/white?text=Banner' alt='banner' style={{ display: 'block', borderRadius: 6 }} />
		),
	},
};
