import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit';


dotenv.config({ path: '.dev.vars' })


export default defineConfig({
	schema: './src/db/*/schema.ts',
	out: './migrations',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DB_URL!,
		authToken: process.env.DB_TOKEN!,
	},
});
