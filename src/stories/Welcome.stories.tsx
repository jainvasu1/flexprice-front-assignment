import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpRight, Sparkles, Layers, Zap, ShieldCheck, Code2, Database, Box, Palette } from 'lucide-react';

const meta = {
	title: 'Welcome',
	parameters: {
		layout: 'fullscreen',
		docs: { disable: true },
		options: { showToolbar: false },
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ==========================================================================
// Local design tokens — keep this page self-contained, no Tailwind needed.
// ==========================================================================
const NAVY = '#092E44';
const NAVY_2 = '#1A4A6B';
const SKY = '#7DD3FC';
const ZINC_50 = '#FAFAFA';
const ZINC_200 = '#E4E4E7';
const ZINC_500 = '#71717A';
const ZINC_900 = '#18181B';
const GREEN = '#10B981';

const FONT = '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif';
const MONO = '"JetBrains Mono", "Fira Code", monospace';

// ==========================================================================
// Welcome page (rendered as a single full-page React story so MDX can't
// strip our typography). Uses inline styles end-to-end for the same reason.
// ==========================================================================
const Welcome = () => (
	<div style={{ background: ZINC_50, minHeight: '100vh', padding: '40px 32px 80px', fontFamily: FONT, color: ZINC_900 }}>
		<div style={{ maxWidth: 1080, margin: '0 auto' }}>

			{/* ---------- HERO ---------- */}
			<div style={{
				position: 'relative',
				background: `radial-gradient(ellipse at 80% 0%, ${NAVY_2} 0%, ${NAVY} 55%)`,
				color: '#FFFFFF',
				padding: '56px 48px 52px',
				borderRadius: 20,
				marginBottom: 40,
				overflow: 'hidden',
				boxShadow: `0 20px 60px ${NAVY}25`,
			}}>
				{/* faint grid */}
				<div style={{
					position: 'absolute', inset: 0,
					backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
					backgroundSize: '32px 32px', pointerEvents: 'none',
				}} />
				{/* glow blob */}
				<div style={{
					position: 'absolute', top: -120, right: -80, width: 360, height: 360,
					background: `radial-gradient(circle, ${SKY}22 0%, transparent 70%)`,
					pointerEvents: 'none',
				}} />

				<div style={{ position: 'relative' }}>
					{/* version pill */}
					<div style={{
						display: 'inline-flex', alignItems: 'center', gap: 8,
						padding: '5px 12px', borderRadius: 999,
						background: 'rgba(255,255,255,0.08)',
						border: '1px solid rgba(255,255,255,0.18)',
						fontSize: 11, letterSpacing: 1.5, fontWeight: 500, color: '#FFFFFF',
						marginBottom: 22,
					}}>
						<span style={{ width: 6, height: 6, borderRadius: 999, background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
						FLEXPRICE DESIGN SYSTEM · V1.0
					</div>

					<h1 style={{
						fontSize: 48, fontWeight: 700, lineHeight: 1.05, margin: 0,
						letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: 16,
					}}>
						The component library<br />
						<span style={{ color: SKY }}>powering Flexprice billing.</span>
					</h1>

					<p style={{
						fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)',
						maxWidth: 580, margin: 0,
					}}>
						Atoms, molecules and organisms used across the Flexprice dashboard — usage metering,
						credit management, pricing tiers, invoicing. Built on the existing palette,
						with motion polish that doesn't break a single token.
					</p>

					<div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
						<HeroPill primary>Showcase / Dashboard Scenes</HeroPill>
						<HeroPill>Design Tokens</HeroPill>
						<HeroPill>Challenge A — Filter Store</HeroPill>
					</div>
				</div>
			</div>

			{/* ---------- STATS STRIP ---------- */}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 }}>
				<Stat n='27' label='Components' sub='atoms · molecules · organisms' />
				<Stat n='60+' label='Stories' sub='full argTypes & docs' />
				<Stat n='64' label='Tests' sub='util + component + interaction' />
				<Stat n='3 / 3' label='Challenges' sub='A · B · C complete' accent />
			</div>

			{/* ---------- WHERE TO START ---------- */}
			<SectionHeader kicker='WHERE TO START' title='Three paths through this Storybook.' />
			<div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
				<JumpRow tag='01' Icon={Layers}      title='Showcase / Dashboard Scenes'      body='Composite scenes — Invoices, Billing, Metrics, Onboarding. The fastest way to see how the atoms compose.' />
				<JumpRow tag='02' Icon={Database}    title='Showcase / Challenge A — Filter Store'  body='DataTable wired to a Zustand store with sessionStorage persistence and a URL fingerprint. Reload — filters survive.' />
				<JumpRow tag='03' Icon={Zap}         title='Molecules / DataTable / Virtualized10k' body='10,000 mock rows with @tanstack/react-virtual. Only ~12 in the DOM at a time. Scroll to feel it.' />
				<JumpRow tag='04' Icon={Palette}     title='Design Tokens'                          body='Color, typography, spacing, radius and elevation primitives every component is built on.' />
			</div>

			{/* ---------- DESIGN PRINCIPLES ---------- */}
			<SectionHeader kicker='WHAT MAKES IT TICK' title='Four principles, applied everywhere.' />
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 48 }}>
				<Principle Icon={Palette}     title='One palette, everywhere'      body='Navy #092E44 for primary, zinc grays for surfaces. No new colors — every component, animation and showcase reuses the same tokens.' />
				<Principle Icon={Box}         title='Composable, not monolithic'   body='Atoms compose into molecules. Molecules into organisms. Each layer ships its own stories so reviewers see building blocks alone or in context.' />
				<Principle Icon={ShieldCheck} title='Tested in isolation'          body='Every interactive component carries a Storybook play function — clicks, typing, state assertions run on every load. 64 tests beyond that.' />
				<Principle Icon={Sparkles}    title='Motion with intent'           body='framer-motion springs on toggles, count-up tweens on counters, staggered row entries on tables. Subtle, never gimmicky.' />
			</div>

			{/* ---------- HIGHLIGHTS ---------- */}
			<SectionHeader kicker='WORTH YOUR ATTENTION' title='Things to look at first.' />
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 56 }}>
				<Highlight tag='POLISH'      title='PolishedToggle'        body='Pill toggle with framer-motion spring physics. Same palette as the existing Toggle.' />
				<Highlight tag='POLISH'      title='StatusBadge'           body='Stripe-style pulsing dot for pending and processing states.' />
				<Highlight tag='POLISH'      title='AnimatedCounter'       body='Count-up KPI numbers with delta indicator. Drives the Metrics dashboard.' />
				<Highlight tag='CHALLENGE B' title='Virtualized DataTable' body='10k rows, smooth scroll, ~12 in DOM. Configurable estimatedRowHeight + overscan.' />
				<Highlight tag='CHALLENGE C' title='Query Config Presets'  body='REALTIME / DEFAULT / STATIC + createQueryConfig helper. 14 tests document the cache behaviour.' />
				<Highlight tag='CHALLENGE A' title='Filter Store'          body='Zustand factory keyed by route, sessionStorage persisted, 6-char URL fingerprint instead of bloated query strings.' />
			</div>

			{/* ---------- FOOTER ---------- */}
			<div style={{
				display: 'flex', justifyContent: 'space-between', alignItems: 'center',
				paddingTop: 24, borderTop: `1px solid ${ZINC_200}`,
				fontSize: 12, color: ZINC_500,
			}}>
				<div>
					Built with <strong style={{ color: ZINC_900 }}>React 18</strong> · TypeScript · Vite · Tailwind · Radix UI · Storybook 8 · framer-motion · TanStack
				</div>
				<div style={{ fontFamily: MONO, fontSize: 11 }}>by Vasudha Jain</div>
			</div>
		</div>
	</div>
);

// ==========================================================================
// Subcomponents
// ==========================================================================
const HeroPill = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
	<div style={{
		display: 'inline-flex', alignItems: 'center', gap: 6,
		padding: '8px 16px', borderRadius: 999,
		background: primary ? '#FFFFFF' : 'transparent',
		color: primary ? NAVY : '#FFFFFF',
		border: primary ? 'none' : '1px solid rgba(255,255,255,0.28)',
		fontSize: 12, fontWeight: 600,
	}}>
		{children}
		<ArrowUpRight size={12} strokeWidth={2.5} />
	</div>
);

const Stat = ({ n, label, sub, accent = false }: { n: string; label: string; sub: string; accent?: boolean }) => (
	<div style={{
		position: 'relative', padding: 18,
		border: `1px solid ${ZINC_200}`, borderRadius: 12,
		background: '#FFFFFF',
	}}>
		<div style={{
			position: 'absolute', top: 14, right: 14,
			width: 6, height: 6, borderRadius: 999,
			background: accent ? GREEN : '#D4D4D8',
		}} />
		<div style={{ fontSize: 32, fontWeight: 700, color: NAVY, lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
		<div style={{ fontSize: 13, fontWeight: 600, color: ZINC_900, marginTop: 10 }}>{label}</div>
		<div style={{ fontSize: 11, color: ZINC_500, marginTop: 3 }}>{sub}</div>
	</div>
);

const SectionHeader = ({ kicker, title }: { kicker: string; title: string }) => (
	<div style={{ marginBottom: 18 }}>
		<div style={{ fontSize: 11, letterSpacing: 2, color: ZINC_500, marginBottom: 6, fontWeight: 500 }}>{kicker}</div>
		<h2 style={{ fontSize: 22, fontWeight: 600, color: NAVY, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
	</div>
);

const JumpRow = ({ tag, Icon, title, body }: { tag: string; Icon: typeof Layers; title: string; body: string }) => (
	<div style={{
		display: 'flex', alignItems: 'center', gap: 16,
		padding: '14px 18px', border: `1px solid ${ZINC_200}`, borderRadius: 10,
		background: '#FFFFFF',
	}}>
		<div style={{ fontFamily: MONO, fontSize: 11, color: '#A1A1AA', fontWeight: 600, width: 22 }}>{tag}</div>
		<div style={{
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			width: 32, height: 32, borderRadius: 8,
			background: `${NAVY}10`, color: NAVY,
		}}>
			<Icon size={16} />
		</div>
		<div style={{ flex: 1 }}>
			<div style={{ fontSize: 14, fontWeight: 600, color: NAVY, marginBottom: 2 }}>{title}</div>
			<div style={{ fontSize: 12, color: ZINC_500, lineHeight: 1.55 }}>{body}</div>
		</div>
		<ArrowUpRight size={16} color={ZINC_500} />
	</div>
);

const Principle = ({ Icon, title, body }: { Icon: typeof Layers; title: string; body: string }) => (
	<div style={{
		padding: 18, border: `1px solid ${ZINC_200}`, borderRadius: 12,
		background: '#FFFFFF',
	}}>
		<div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
			<div style={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				width: 36, height: 36, borderRadius: 8, background: NAVY, color: '#FFFFFF',
				flexShrink: 0,
			}}>
				<Icon size={18} />
			</div>
			<div>
				<div style={{ fontSize: 14, fontWeight: 600, color: ZINC_900, marginBottom: 4 }}>{title}</div>
				<div style={{ fontSize: 12, color: ZINC_500, lineHeight: 1.6 }}>{body}</div>
			</div>
		</div>
	</div>
);

const Highlight = ({ tag, title, body }: { tag: string; title: string; body: string }) => (
	<div style={{
		padding: 16, border: `1px solid ${ZINC_200}`, borderRadius: 10,
		background: '#FAFAFA',
	}}>
		<div style={{
			display: 'inline-flex', padding: '2px 8px', borderRadius: 4,
			background: NAVY, color: '#FFFFFF',
			fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 10,
		}}>
			{tag}
		</div>
		<div style={{ fontSize: 13, fontWeight: 600, color: ZINC_900, marginBottom: 4 }}>{title}</div>
		<div style={{ fontSize: 11, color: ZINC_500, lineHeight: 1.5 }}>{body}</div>
	</div>
);

// ==========================================================================
// Story export
// ==========================================================================
export const Introduction: Story = {
	render: () => <Welcome />,
};
