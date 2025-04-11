import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as env from '@/env';
import { usersSchema, sessionsSchema, decksSchema, cardsSchema, tagsSchema } from './schemas/index';

if (!env.DB_URL) throw new Error('DATABASE_URL is not set');
if (!env.DEV && !env.DB_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

function connect() {
	const client = createClient({
		url: env.DB_URL,
		authToken: env.DB_AUTH_TOKEN
	});

	return drizzle(client, {
		schema: { ...usersSchema, ...sessionsSchema, ...decksSchema, ...cardsSchema, ...tagsSchema }
	});
}

function getDB() {
	if (!db) {
		db = connect();
	}

	return db;
}

let db: null | ReturnType<typeof connect> = null;

export { getDB };
