import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { relations } from 'drizzle-orm';
import { usersSchema } from './index';

const sessionsTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

const sessionsRelation = relations(sessionsTable, ({ one }) => {
	return {
		user: one(usersSchema.usersTable, {
			fields: [sessionsTable.userId],
			references: [usersSchema.usersTable.id]
		})
	};
});

export { sessionsTable, sessionsRelation };
