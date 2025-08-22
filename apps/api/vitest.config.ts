import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	resolve: {
		alias: {
			$: '/src'
		}
	},
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
