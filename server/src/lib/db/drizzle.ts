import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

import { usersSchema, sessionsSchema, decksSchema, cardsSchema, tagsSchema } from './schemas/index';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

function connect() {
	const client = createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN
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
