import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineWorkersProject({
	plugins: [tsConfigPaths()],
	test: {
		typecheck: {
			tsconfig: './tsconfig.test.json'
		},
		include: ['./src/**/*.spec.ts'],
		globals: true,
		poolOptions: {
			workers: { wrangler: { configPath: './wrangler.jsonc' } }
		}
	}
});
