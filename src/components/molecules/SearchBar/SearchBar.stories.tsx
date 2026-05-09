import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, waitFor, expect } from '@storybook/test';
import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';

const meta = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		debounceMs: { control: 'number' },
		shortcut: { control: 'text' },
		disabled: { control: 'boolean' },
		onSearch: { action: 'searched' },
	},
	args: {
		onSearch: fn(),
	},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	args: {
		placeholder: 'Search invoices, customers...',
		debounceMs: 300,
	},
	decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithShortcut: Story = {
	args: {
		placeholder: 'Search…',
		shortcut: '⌘K',
	},
	decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Disabled: Story = {
	args: {
		placeholder: 'Search disabled',
		disabled: true,
	},
	decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

const FilterDemo = () => {
	const [query, setQuery] = useState('');
	const all = useMemo(
		() => ['Acme Corp', 'Linear Labs', 'Vercel Studios', 'Notion Inc.', 'Figma OSS', 'Raycast Inc.', 'Stripe Inc.', 'Cloudflare'],
		[],
	);
	const filtered = query ? all.filter((c) => c.toLowerCase().includes(query.toLowerCase())) : all;

	return (
		<div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
			<SearchBar onSearch={setQuery} placeholder='Filter customers…' shortcut='⌘K' />
			<div style={{ fontSize: 12, color: '#71717A' }}>
				{filtered.length} {filtered.length === 1 ? 'match' : 'matches'}
			</div>
			<ul style={{ display: 'flex', flexDirection: 'column', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
				{filtered.map((c) => (
					<li
						key={c}
						style={{ padding: '8px 12px', border: '1px solid #E4E4E7', borderRadius: 6, fontSize: 13 }}>
						{c}
					</li>
				))}
				{filtered.length === 0 && (
					<li style={{ padding: '8px 12px', color: '#A1A1AA', fontSize: 13 }}>No customers match "{query}".</li>
				)}
			</ul>
		</div>
	);
};

export const LiveFiltering: Story = {
	render: () => <FilterDemo />,
};

export const TypingInteraction: Story = {
	args: {
		placeholder: 'Type here',
		debounceMs: 100,
	},
	decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here');
		await userEvent.type(input, 'acme');
		await waitFor(() => expect(args.onSearch).toHaveBeenCalledWith('acme'), { timeout: 2000 });
	},
};
