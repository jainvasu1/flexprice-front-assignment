import 'tailwindcss/tailwind.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
			expanded: true,
		},
		backgrounds: {
			default: 'light',
			values: [
				{ name: 'light', value: '#FFFFFF' },
				{ name: 'app', value: '#FAFAFA' },
				{ name: 'dark', value: '#0B0B0F' },
				{ name: 'navy', value: '#092E44' },
			],
		},
		viewport: {
			viewports: {
				mobile: { name: 'Mobile (390)', styles: { width: '390px', height: '844px' } },
				tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' } },
				desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' } },
				wide: { name: 'Wide (1536)', styles: { width: '1536px', height: '960px' } },
			},
		},
		layout: 'centered',
		options: {
			storySort: {
				order: ['Welcome', 'Showcase', 'Atoms', 'Molecules', 'Organisms'],
			},
		},
	},
};

export default preview;
