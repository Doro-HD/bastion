import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
	build: {
		minify: true
	},
	plugins: [
		tsconfigPaths(),
		cloudflare(),
	]
});