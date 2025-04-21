import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { cloudflare } from '@cloudflare/vite-plugin'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	build: {
		minify: true,
	},
	define: {
		__dirname: JSON.stringify(__dirname)
	},
	plugins: [
		tsconfigPaths(),
		cloudflare(),
	]
});