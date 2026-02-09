import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},

		backgrounds: {
			default: 'dark',
			values: [
				{ name: 'dark', value: '#020617' },
				{ name: 'light', value: '#ffffff' },
			],
		},
	},
};

export default preview;