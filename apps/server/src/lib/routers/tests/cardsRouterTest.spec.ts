import { beforeAll, describe, it, expect } from 'vitest';
import { testClient } from 'hono/testing';

import { crypto } from '@/index';
import { cardsHandler, decksHandler } from '@/db/handlers';
import { cardsValidator, decksValidator } from '@/db/validators';
import cardsRouter from '@/routers/protected/cardsRouer';

describe('Card router', () => {
    const deck: decksValidator.TDecksInsert = {
		id: crypto.generateId(),
		name: 'Test deck',
		description: 'Description',
		userId: 'Foo'
	};

	const card: cardsValidator.TCardsInsert = {
		id: crypto.generateId(),
		name: 'Test card',
		description: 'Testing',
		duration: 10,
		durationUnitType: 'minutes',
		difficulty: 'easy',
		deckId: deck.id
	}

	const card2: cardsValidator.TCardsInsert = {
		id: crypto.generateId(),
		name: 'Test card',
		description: 'Testing',
		duration: 10,
		durationUnitType: 'minutes',
		difficulty: 'easy',
		deckId: deck.id
	}

	beforeAll(async () => {
		await decksHandler.createDeck(deck.userId, deck);
		await cardsHandler.createCard(card)
		await cardsHandler.createCard(card2)
	});

	const client = testClient(cardsRouter);

	it('Should get all cards', async () => {
		const response = await client.index.$get({
            query: {
                'deck-id': deck.id
            }
        });

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should get a single random card', async () => {
		const response = await client.draw.$get({
			query: {
				'deck-id': deck.id
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should insert a card', async () => {
		const response = await client.index.$post({
			form: {
				id: crypto.generateId(),
				name: 'Foo bar',
				description: 'Testing',
				duration: '10',
				durationUnitType: 'minutes',
				difficulty: 'easy',	
				deckId: deck.id
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should update a card', async () => {
		const response = await client[':cardId'].$put({
			param: {
				cardId: card.id
			},
			form: {
				name: 'New name',
				description: 'New description',
				duration: '1',
				durationUnitType: 'hours',
				difficulty: 'hard',	
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should delete a card', async () => {
		const response = await client[':cardId'].$delete({
			param: {
				cardId: card.id
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});
});
