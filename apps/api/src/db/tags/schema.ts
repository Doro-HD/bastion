import { relations } from 'drizzle-orm';
import { foreignKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from '../users/schema';

const tagTable = sqliteTable(
	'tags',
	{
		id: text('id').primaryKey(),
		userId: text('user_id').notNull()
	},
	(table) => [foreignKey({ columns: [table.userId], foreignColumns: [userTable.id] })]
);

const tagRelation = relations(tagTable, ({ one }) => ({
	user: one(userTable, {
		fields: [tagTable.userId],
		references: [userTable.id]
	})
}));

export { tagTable, tagRelation };
