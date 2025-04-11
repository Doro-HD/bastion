import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { sessionsSchema, decksSchema } from './index';

const usersTable = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique().notNull(),
	password: text('password').notNull()
});

const usersRelation = relations(usersTable, ({ many }) => {
	return {
		sessions: many(sessionsSchema.sessionsTable),
		decks: many(decksSchema.decksTable)
	};
});

export { usersTable, usersRelation };
