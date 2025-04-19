import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import build from '@hono/vite-build/cloudflare-workers';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		build({
			entry: './src/index.ts',
			external: ['argon2']
		}),
		devServer({
			entry: './src/index.ts'
		})
	]
});
