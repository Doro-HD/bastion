import { beforeAll, describe, expect, it } from 'vitest';
import { Hono } from 'hono';
import { testClient } from 'hono/testing';

import { decksHandler, usersHandler } from '@/db/handlers';
import type { TUsersInsert } from '@/db/validators/usersValidator';
import { crypto } from '@/index';
import type { TDecksInsert } from '@/db/validators/decksValidator';
import decksRouter from '../protected/decksRouter';
import type { Variables } from '../protected';

describe('Decks router', () => {
	const user: TUsersInsert = {
		id: crypto.generateId(),
		username: 'Foo',
		password: 'foobar'
	};
	const deck: TDecksInsert = {
		id: crypto.generateId(),
		name: 'Test deck',
		description: 'Description',
		userId: user.id
	};

	beforeAll(() => {
		usersHandler.createUser(user);
		decksHandler.createDeck(user.id, deck);
	});

	const testDecksRouter = new Hono<{ Variables: Variables }>()
		.use(async (C, next) => {
			C.set('userId', user.id);

			await next();
		})
		.route('/', decksRouter);
	const client = testClient(testDecksRouter);

	it('Should get all decks', async () => {
		const response = await client.index.$get();

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should find a single deck', async () => {
		const response = await client[':deckId'].$get({
			param: {
				deckId: deck.id
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should fail to find a single deck with non existing id', async () => {
		const response = await client[':deckId'].$get({
			param: {
				deckId: 'foo'
			}
		});

		expect(response.status).toBe(404);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should create a deck', async () => {
		const response = await client.index.$post({
			form: {
				id: crypto.generateId(),
				name: deck.name,
				description: deck.description
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should fail to create a deck with existing id', async () => {
		const response = await client.index.$post({
			form: {
				id: deck.id,
				name: deck.name,
				description: deck.description
			}
		});

		expect(response.status).toBe(400);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should update an existing deck', async () => {
		const response = await client[':deckId'].$put({
			param: {
				deckId: deck.id
			},
			form: {
				name: 'Updated Deck name',
				description: "Updated description"
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should fail to update an non existing deck', async () => {
		const response = await client[':deckId'].$put({
			param: {
				deckId: 'Foo'
			},
			form: {
				name: 'Updated Deck name',
				description: "Updated description"
			}
		});

		expect(response.status).toBe(404);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should delete an existing deck', async () => {
		const response = await client[':deckId'].$delete({
			param: {
				deckId: deck.id
			}
		});

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});

	it('Should fail to delete an non existing deck', async () => {
		const response = await client[':deckId'].$delete({
			param: {
				deckId: 'Foo'
			}
		});

		expect(response.status).toBe(404);
		expect(response.headers.get('Content-Type')).toBe('application/json');
	});
});
