import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const userTable = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique().notNull()
});

export { userTable };
