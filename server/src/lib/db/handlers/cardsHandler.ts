import { result } from '@/functional';
import { getDB } from '@/db/drizzle';
import type { cardsValidator } from '@/db/validators/index';
import { cardsSchema } from '../schemas';
import { eq } from 'drizzle-orm';

const db = getDB();

/**
 * @description
 * Gets all cards related to a deck,
 * @param deckId - The id of the deck
 * @returns A result containing all cards related to the deck
 */
async function findCardsByDeck(
	deckId: string
): Promise<result.Result<cardsValidator.TCardsSelect[], unknown>> {
	try {
		const cards = await db.query.cardsTable.findMany({
			where: (card, { eq }) => eq(card.deckId, deckId)
		});

		return result.ok(cards);
	} catch (e) {
		return result.err(e);
	}
}

/**
 * @description
 * Create a new card
 * @param newCard - The card to be created
 * @returns The newly created card
 */
async function createCard(
	newCard: cardsValidator.TCardsInsertFormData
): Promise<result.Result<cardsValidator.TCardsInsert, unknown>> {
	try {
		const [card] = await db
			.insert(cardsSchema.cardsTable)
			.values({ ...newCard })
			.returning();

		return result.ok(card);
	} catch (e) {
		return result.err(e);
	}
}

/**
 * @description
 * Updates a card
 * @param cardId - The id of the card to update
 * @param updatedCard - The object containing the fields to update along with the updated values
 * @returns - A result containing the newly updated card
 */
async function updateCard(
	cardId: string,
	updatedCard: cardsValidator.TCardsUpdateFormData
): Promise<result.Result<cardsValidator.TCardsSelect, unknown>> {
	try {
		const [card] = await db
			.update(cardsSchema.cardsTable)
			.set({ ...updatedCard })
			.where(eq(cardsSchema.cardsTable.id, cardId))
			.returning();

		return result.ok(card);
	} catch (e) {
		return result.err(e);
	}
}

/**
 * @description
 * Deletes a card
 * @param cardId - The id of the card to delete
 * @returns - A result containg the deleted card
 */
async function deleteCard(cardId: string): Promise<result.Result<cardsValidator.TCardsSelect, unknown>> {
    try {
		const [card] = await db
			.delete(cardsSchema.cardsTable)
			.where(eq(cardsSchema.cardsTable.id, cardId))
			.returning();

		return result.ok(card);
	} catch (e) {
		return result.err(e);
	}
}

export { findCardsByDeck, createCard, updateCard, deleteCard };
