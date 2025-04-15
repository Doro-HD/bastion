import { and, eq } from 'drizzle-orm';

import { result } from '@/functional';
import { drizzle } from '@/db/index';
import { decksSchema } from '@/db/schemas';
import type { decksValidator } from '@/db/validators';

const db = drizzle.getDB();

/**
 * @description
 * Gets all decks belonging to a single user
 * @returns - All decks related to a single user
 */
async function getDecks(
	userId: string
): Promise<result.Result<decksValidator.TDecksSelect[], unknown>> {
	try {
		const decks = await db.query.decksTable.findMany({
			where: (deck, { eq }) => eq(deck.userId, userId)
		});

		return result.ok(decks);
	} catch (e) {
		return result.err(e);
	}
}

/**
 * @description
 * Returns a deck belonning to a certain user
 * @param deckId - The id of the deck to return
 * @returns - A deck with the provided id
 */
async function findDeckById(
	userId: string,
	deckId: string
): Promise<result.Result<decksValidator.TDecksSelect | undefined, unknown>> {
	try {
		const deck = await db.query.decksTable.findFirst({
			where: (deck, { and, eq }) => and(eq(deck.userId, userId), eq(deck.id, deckId))
		});

		return result.ok(deck);
	} catch (e) {
		return result.err(e);
	}
}

async function createDeck(
	userId: string,
	newDeck: decksValidator.TDecksInsertFormData
): Promise<result.Result<decksValidator.TDecksInsert, unknown>> {
	try {
		const [deckCreated] = await db
			.insert(decksSchema.decksTable)
			.values({ ...newDeck, userId })
			.returning();

		return result.ok(deckCreated);
	} catch (e) {
		return result.err(e);
	}
}

async function updateDeck(
	userId: string,
	deckId: string,
	updateDeck: decksValidator.TDecksUpdateFormData
): Promise<result.Result<decksValidator.TDecksUpdate, unknown>> {
	try {
		const [deckCreated] = await db
			.update(decksSchema.decksTable)
			.set({ ...updateDeck })
			.where(and(eq(decksSchema.decksTable.userId, userId), eq(decksSchema.decksTable.id, deckId)))
			.returning();

		return result.ok(deckCreated);
	} catch (e) {
		return result.err(e);
	}
}

export { getDecks, findDeckById, createDeck, updateDeck };
