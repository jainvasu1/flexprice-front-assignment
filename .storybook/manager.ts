import { addons } from '@storybook/manager-api';
import flexpriceTheme from './theme';

addons.setConfig({
	theme: flexpriceTheme,
	sidebar: {
		showRoots: true,
	},
	toolbar: {
		title: { hidden: false },
		zoom: { hidden: false },
		eject: { hidden: true },
		copy: { hidden: false },
		fullscreen: { hidden: false },
	},
});
