import { Hono } from 'hono';
import { z } from 'zod/v4';

import { IAuthENV } from './index';
import { createValidator } from '@/middleware/validator';
import result from '@/result';
import { ErrResponse, OkResponse } from '@/routers/types';
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
			const errResponse: ErrResponse = { status: 500, err: { reason: 'Could not create new user' } }

			return c.json(errResponse.err, errResponse.status);
		}

		const okResponse: OkResponse<TUserSelect> = { status: 201, data: createResult.data }

		return c.json(okResponse.data, okResponse.status);
	})
	.post('/sign-in', (c) => {
		return c.text('Not implemented', 500);
	});

export default publicrouter;
