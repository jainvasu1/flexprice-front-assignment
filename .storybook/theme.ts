import { create } from '@storybook/theming/create';

/**
 * Custom Storybook UI theme for the Flexprice design system.
 * Brand colors lifted from the existing Tailwind tokens — no new palette.
 */
export default create({
	base: 'light',

	brandTitle: 'Flexprice Design System',
	brandUrl: 'https://flexprice.io',
	brandTarget: '_self',

	// Brand colors
	colorPrimary: '#092E44',
	colorSecondary: '#092E44',

	// UI
	appBg: '#FAFAFA',
	appContentBg: '#FFFFFF',
	appPreviewBg: '#FFFFFF',
	appBorderColor: '#E4E4E7',
	appBorderRadius: 8,

	// Text colors
	textColor: '#18181B',
	textInverseColor: '#FFFFFF',
	textMutedColor: '#71717A',

	// Toolbar
	barTextColor: '#71717A',
	barSelectedColor: '#092E44',
	barHoverColor: '#092E44',
	barBg: '#FFFFFF',

	// Form
	inputBg: '#FFFFFF',
	inputBorder: '#E4E4E7',
	inputTextColor: '#18181B',
	inputBorderRadius: 6,

	// Typography
	fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	fontCode: '"JetBrains Mono", "Fira Code", monospace',
});
