import { relations } from 'drizzle-orm';
import { blob, foreignKey, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from '../users/schema';

const sessionTable = sqliteTable(
	'sessions',
	{
		id: text('id').primaryKey(),
		secretHash: blob('secret_hash', { mode: 'buffer' }).notNull(),
		createdAt: integer('created_at').notNull(),
		userId: text('user_id').notNull()
	},
	(table) => [foreignKey({ columns: [table.userId], foreignColumns: [userTable.id] })]
);

const sessionRelation = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}));

export { sessionTable, sessionRelation };
