import { Hono } from 'hono';
import { validator } from 'hono/validator';

import type { Variables } from './index';
import { decksHandler } from '@/db/handlers';
import { decksValidator } from '@/db/validators';
import { result } from '@/functional';

const createDeckValidation = validator('form', (value, c) => {
	const userResult = decksValidator.validateDeckInsert(value);
	if (result.isErr(userResult)) {
		return c.json({ data: 'Invalid data' }, 400);
	}

	return userResult.data;
});

const updateDeckValidation = validator('form', (value, c) => {
	const userResult = decksValidator.validateDeckUpdate(value);
	if (result.isErr(userResult)) {
		return c.json({ data: 'Invalid data' }, 400);
	}

	return userResult.data;
});

const decksRouter = new Hono<{ Variables: Variables }>()
	.get('/', async (c) => {
		const userId = c.get('userId');

		const decksResult = await decksHandler.getDecks(userId);
		if (result.isErr(decksResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		return c.json({ data: decksResult.data }, 200);
	})
	.get('/:deckId', async (c) => {
		const userId = c.get('userId');
		const deckId = c.req.param().deckId;

		const decksResult = await decksHandler.findDeckById(userId, deckId);
		if (result.isErr(decksResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		if (!decksResult.data) {
			return c.json({ data: 'Not found' }, 404);
		}

		return c.json({ data: decksResult.data }, 200);
	})
	.post('/', createDeckValidation, async (c) => {
		const userId = c.get('userId');
		const data = c.req.valid('form');

		const existingDeckResult = await decksHandler.findDeckById(userId, data.id);
		if (result.isErr(existingDeckResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		if (existingDeckResult.data) {
			return c.json({ data: 'Deck with given id already exists' }, 400);
		}

		const createDeckResult = await decksHandler.createDeck(userId, data);
		if (result.isErr(createDeckResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		return c.json({ data: createDeckResult.data }, 200);
	})
	.put('/:deckId', updateDeckValidation, async (c) => {
		const userId = c.get('userId');
        const deckId = c.req.param('deckId');
		const data = c.req.valid('form');

		const updateDeckResult = await decksHandler.updateDeck(userId, deckId, data)
        console.log(updateDeckResult)
        if (result.isErr(updateDeckResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

		return c.json({ data: updateDeckResult.data }, 200);
	})
	.delete('/:deckId', (c) => {
		return c.json({}, 500);
	});

export default decksRouter;
