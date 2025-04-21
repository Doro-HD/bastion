import { Hono } from 'hono';
import { validator } from 'hono/validator';

import type { Variables } from './index';
import { cardsHandler } from '@/db/handlers';
import { result } from '@/functional';
import { cardsValidator } from '@/db/validators';

// validation
const queryValidator = validator('query', (value, c) => {
    const deckId = value['deck-id'];
    if (!deckId) {
        return c.json({ data: 'Lacking deck-id query parameter'}, 400);
    }

    if (typeof deckId !== 'string') {
        return c.json({ data: 'The dekc-id query parameter should be a single value'}, 400);
    }

    return {
        'deck-id': deckId
    };
})

const cardInsertValidator = validator('form', (value, c) => {
    const cardValidationResult = cardsValidator.validateCardInsert(value);
    if (result.isErr(cardValidationResult)) {
        return c.json({ data: 'Invalid form' }, 400);
    }

    return cardValidationResult.data;
});

const cardUpdateValidator = validator('form', (value, c) => {
    const cardValidationResult = cardsValidator.validateCardUpdate(value);
    if (result.isErr(cardValidationResult)) {
        return c.json({ data: 'Invalid form' }, 400);
    }

    return cardValidationResult.data;
});

// routes
const cardsRouter = new Hono<{ Variables: Variables }>()
	.get('/', queryValidator, async (c) => {
        const deckId = c.req.valid('query')['deck-id'];

        const cardsResult = await cardsHandler.findCardsByDeck(deckId);
        if (result.isErr(cardsResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

        if (!cardsResult.data) {
            return c.json({ data: 'Unauthorized' }, 401);
        }

		return c.json({ data: cardsResult.data }, 200);
	})
    .get('/draw', queryValidator, async (c) => {
        const deckId = c.req.valid('query')['deck-id'];

        const cardResult = await cardsHandler.findRandomCardByDeck(deckId);
        if (result.isErr(cardResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

        if (!cardResult.data) {
            return c.json({ data: 'There are no cards in the deck' }, 404);
        }

		return c.json({ data: cardResult.data }, 200);
    })
	.post('/', cardInsertValidator, async (c) => {
        const cardData = c.req.valid('form')

        const cardInsertResult = await cardsHandler.createCard(cardData);
        if (result.isErr(cardInsertResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

		return c.json({ data: cardInsertResult.data }, 200);
	})
	.put('/:cardId', cardUpdateValidator, async (c) => {
        const cardId = c.req.param('cardId');
        const cardData = c.req.valid('form')

        const cardUpdateResult = await cardsHandler.updateCard(cardId, cardData);
        if (result.isErr(cardUpdateResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

        if (!cardUpdateResult.data) {
            return c.json({ data: 'Wrong id' }, 404);
        }

		return c.json({ data: cardUpdateResult.data }, 200);
	})
	.delete('/:cardId', async (c) => {
        const cardId = c.req.param('cardId');

        const cardDeleteResult = await cardsHandler.deleteCard(cardId);
        if (result.isErr(cardDeleteResult)) {
            return c.json({ data: 'Server error' }, 500);
        }

        if (!cardDeleteResult.data) {
            return c.json({ data: 'Wrong id' }, 404);
        }

		return c.json({ data: cardDeleteResult.data }, 200);
	});

export default cardsRouter;
