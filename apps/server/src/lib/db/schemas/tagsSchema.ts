import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { cardsSchema } from './index';

const tagsTable = sqliteTable('tags', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	cardId: text('card_id').notNull()
});

const tagsRelation = relations(tagsTable, ({ one }) => {
	return {
		card: one(cardsSchema.cardsTable, {
			fields: [tagsTable.cardId],
			references: [cardsSchema.cardsTable.id]
		})
	};
});

export { tagsTable, tagsRelation };
