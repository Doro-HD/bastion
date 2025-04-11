import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { cardsSchema } from './index';

const decksTable = sqliteTable('decks', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	userId: text('user_id').notNull()
});

const decksRelation = relations(decksTable, ({ many }) => {
	return {
		cards: many(cardsSchema.cardsTable)
	};
});

export {
	decksTable,
	decksRelation,
};
