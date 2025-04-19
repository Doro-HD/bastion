import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { decksSchema, tagsSchema } from './index';

const cardsTable = sqliteTable('cards', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }).notNull(),
	duration: integer('duration', { mode: 'timestamp_ms' }).notNull(),
	deckId: text('deck_id').notNull()
});

const cardsRelation = relations(cardsTable, ({ one, many }) => {
	return {
		deck: one(decksSchema.decksTable, {
			fields: [cardsTable.deckId],
			references: [decksSchema.decksTable.id]
		}),
		tags: many(tagsSchema.tagsTable)
	};
});

export { cardsTable, cardsRelation };
