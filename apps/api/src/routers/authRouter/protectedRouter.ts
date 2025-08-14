import { Hono } from 'hono';
import z from 'zod/v4';

import { createValidator } from '@/middleware/validator';
import { IAuthENV } from './index';
import SessionHandler from '@/db/sessions/handler';
import { result } from '@doro-hd/result';
import { errResponse, okResponse } from '@/routers/types';
import { validator } from 'hono/validator';

const authTokenSchema = z.object({
	'auth-token': z.string()
}).refine(value => value['auth-token'].split('.').length === 2);
const authorizationValidator = createValidator('cookie', authTokenSchema, 401);

const protectedRouter = new Hono<IAuthENV>().get('/validate', authorizationValidator, async (c) => {
	const { 'auth-token': authToken } = c.req.valid('cookie');
	const sessionHandler = new SessionHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN)

	const sessionResult = await sessionHandler.findUserFromSession(authToken)
	if (result.isErr(sessionResult)) {
		const errRes = errResponse(500, { reason: 'Database error' })

		return c.json(errRes.err, errRes.status)
	}

	if (sessionResult.data.status === 'none') {
		const errRes = errResponse(404, { reason: 'Could not find any user with the provided token' })

		return c.json(errRes.err, errRes.status)
	}

	const data = sessionResult.data.data;
	const okRes = okResponse(200, data);

	return c.json(okRes.data, okRes.status);
});

export default protectedRouter;
