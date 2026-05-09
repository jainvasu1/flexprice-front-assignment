import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
	Home,
	CreditCard,
	Users,
	FileText,
	BarChart3,
	Settings,
	Code2,
	Webhook,
	LifeBuoy,
	Wallet,
	Tags,
} from 'lucide-react';
import SidebarNav, { NavSection } from './SidebarNav';

const meta = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	parameters: { layout: 'fullscreen', backgrounds: { default: 'app' } },
	tags: ['autodocs'],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof SidebarNav>;

const sections: NavSection[] = [
	{
		items: [
			{ id: 'home', label: 'Home', icon: Home },
			{ id: 'analytics', label: 'Analytics', icon: BarChart3 },
		],
	},
	{
		title: 'Product Catalog',
		items: [
			{ id: 'plans', label: 'Plans', icon: Tags, badge: 12 },
			{ id: 'features', label: 'Features', icon: Code2 },
		],
	},
	{
		title: 'Billing',
		items: [
			{ id: 'customers', label: 'Customers', icon: Users, badge: 142 },
			{ id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
			{ id: 'invoices', label: 'Invoices', icon: FileText, badge: 4 },
			{ id: 'wallets', label: 'Wallets', icon: Wallet },
		],
	},
	{
		title: 'Developer',
		items: [
			{ id: 'webhooks', label: 'Webhooks', icon: Webhook },
			{ id: 'settings', label: 'Settings', icon: Settings },
			{ id: 'support', label: 'Support', icon: LifeBuoy, disabled: true },
		],
	},
];

const Layout = ({ children }: { children: React.ReactNode }) => (
	<div style={{ display: 'flex', minHeight: '100vh', background: '#FFFFFF' }}>
		{children}
		<main style={{ flex: 1, padding: 32 }}>
			<div style={{ fontSize: 12, letterSpacing: 1.5, color: '#71717A', marginBottom: 4 }}>BILLING</div>
			<h1 style={{ fontSize: 28, fontWeight: 600, color: '#092E44', margin: 0 }}>Active page content</h1>
			<p style={{ fontSize: 14, color: '#71717A', marginTop: 4 }}>Click any sidebar item to switch routes.</p>
		</main>
	</div>
);

const Controlled = (initialId: string, initialCollapsed = false) => {
	const Component = () => {
		const [activeId, setActiveId] = useState(initialId);
		const [collapsed, setCollapsed] = useState(initialCollapsed);
		return (
			<Layout>
				<SidebarNav
					sections={sections}
					activeId={activeId}
					onItemClick={setActiveId}
					collapsed={collapsed}
					onCollapseChange={setCollapsed}
					footer={
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<div style={{ width: 28, height: 28, borderRadius: 999, background: '#092E44', color: 'white', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								VJ
							</div>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div style={{ fontSize: 12, fontWeight: 500, color: '#18181B' }}>Vasudha Jain</div>
								<div style={{ fontSize: 11, color: '#71717A', overflow: 'hidden', textOverflow: 'ellipsis' }}>vasudha@flexprice.io</div>
							</div>
						</div>
					}
				/>
			</Layout>
		);
	};
	return Component;
};

export const Default: Story = { render: Controlled('invoices') };
export const Collapsed: Story = { render: Controlled('invoices', true) };
export const HomeActive: Story = { render: Controlled('home') };
