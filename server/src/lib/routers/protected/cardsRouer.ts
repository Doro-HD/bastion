import { Hono } from 'hono';
import { validator } from 'hono/validator';

import type { Variables } from './index';
import { cardsHandler } from '@/db/handlers';
import { result } from '@/functional';

const queryValidator = validator('query', (value, c) => {
	const deckId = value['deck-id'];
	if (!deckId) {
		return c.json({ data: 'Lacking deckid query param' }, 400);
	}

	return {
		deckId
	};
});

const cardsRouter = new Hono<{ Variables: Variables }>()
	.get('/', queryValidator, async (c) => {
		const query = c.req.valid('query');

		return c.json({ data: 'Server error' }, 500);
	})
	.post('/', async (c) => {
		return c.json({ data: 'Server error' }, 500);
	})
	.put('/:cardId', async (c) => {
		return c.json({ data: 'Server error' }, 500);
	})
	.delete('/:cardId', async (c) => {
		return c.json({ data: 'Server error' }, 500);
	});

export default cardsRouter;
