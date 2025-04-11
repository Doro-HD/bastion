import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/db/schemas/*Schema.ts',
	dbCredentials: {
		url: process.env.DB_URL,
		authToken: process.env.DB_AUTH_TOKEN
	},
	verbose: true,
	strict: true,
	dialect: 'turso'
});
