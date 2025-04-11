import { crypto } from '@/index';
import { result } from '@/functional';
import { drizzle } from '@/db/index';

import { decksSchema } from '@/db/schemas';
import type { decksValidator } from '@/db/validators';

const db = drizzle.getDB();

async function getDecks(): Promise<result.Result<decksValidator.TDecksSelect[], unknown>> {
	try {
		const decks = await db.query.decksTable.findMany();

		return result.ok(decks);
	} catch (e) {
		return result.err(e);
	}
}

async function findDeckById(
	deckId: string
): Promise<result.Result<decksValidator.TDecksSelect | undefined, unknown>> {
	try {
		const deck = await db.query.decksTable.findFirst({
			where: (deck, { eq }) => eq(deck.id, deckId)
		});

		return result.ok(deck);
	} catch (e) {
		return result.err(e);
	}
}

async function createDeck(
	userId: string,
	newDeck: decksValidator.TDecksFormData
): Promise<result.Result<decksValidator.TDecksInsert, unknown>> {
	try {
		const deckId = crypto.generateId();
		const [deckCreated] = await db
			.insert(decksSchema.decksTable)
			.values({ id: deckId, userId, ...newDeck })
			.returning();

		return result.ok(deckCreated);
	} catch (e) {
		return result.err(e);
	}
}

export { getDecks, findDeckById, createDeck };
