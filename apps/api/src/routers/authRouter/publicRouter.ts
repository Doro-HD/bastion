import { Hono } from 'hono';
import { z } from 'zod/v4';
import { result } from '@doro-hd/result';

import { IAuthENV } from './index';
import { createValidator } from '@/middleware/validator';
import { okResponse, errResponse } from '@/routers/types';
import { TUserSelect } from '@/db/users/types';

const signUpSchema = z.object({
	username: z.string().min(5).max(25)
});
const signUpValidator = createValidator('json', signUpSchema);

const publicrouter = new Hono<IAuthENV>()
	.post('/sign-up', signUpValidator, async (c) => {
		const data = c.req.valid('json');
		const userHandler = c.get('userHandler');

		const createResult = await userHandler.createUser(data);
		if (result.isErr(createResult) || !createResult.data) {
			const errResponse = errResponse(500, { reason: 'Could not create the new user' })

			return c.json(errResponse.err, errResponse.status);
		}

		const okResponse = okResponse(201, createResult.data)

		return c.json(okResponse.data, okResponse.status);
	})
	.post('/sign-in', (c) => {
		return c.text('Not implemented', 500);
	});

export default publicrouter;
