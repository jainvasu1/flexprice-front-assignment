import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-onboarding', '@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	typescript: {
		// Disable react-docgen — the default JS parser throws
		// "Attempted to resolveName for an unsupported path" on object-method
		// shorthand inside arrays (e.g. ColumnData render fns in
		// src/pages/developer/ServiceAccounts.tsx). Each story file declares
		// its own argTypes so prop controls still render correctly.
		reactDocgen: false,
	},
};
export default config;
