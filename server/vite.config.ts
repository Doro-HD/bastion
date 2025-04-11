import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import build from '@hono/vite-build/node';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		build({
			entry: './src/index.ts',
			port: 3000
		}),
		devServer({
			entry: './src/index.ts'
		})
	]
});
