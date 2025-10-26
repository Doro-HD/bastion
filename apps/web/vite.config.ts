import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteTesting()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'script',
					environment: 'node',
					include: ['src/**/*.spec.ts'],
					exclude: ['src/lib/components/**/*.spec.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'components',
					environment: 'jsdom',
					include: ['src/lib/components/**/*.spec.ts'],
					setupFiles: ['./vitest-setup-components.js']
				}
			}
		]
	}
});
