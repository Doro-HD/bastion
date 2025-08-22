import { Hono, Context } from 'hono';
import { setCookie } from 'hono/cookie';
import { z } from 'zod/v4';
import { result } from '@doro-hd/result';

import { IAuthENV, injectSessionHandler, injectUserHandler } from './index';
import { createValidator } from '$/middleware/validator';
import { errResponse, okResponse } from '$/routers/types';
import { sessionExpiresInSeconds } from '$/db/sessions/handler';
import { TUserSelect } from '$/db/users/types';

/**
 * @description
 * setSession is used to set the session cookie and unify session logic
 */
async function setSession(c: Context<IAuthENV>, user: TUserSelect) {
	const sessionHandler = c.get('sessionHandler');

	const sessionResult = await sessionHandler.createSession(user.username);
	if (result.isErr(sessionResult) || sessionResult.data.status === 'none') {
		return sessionResult;
	}

	const data = sessionResult.data.data;

	setCookie(c, 'auth-token', data.token, {
		path: '/',
		httpOnly: true,
		maxAge: sessionExpiresInSeconds,
		secure: c.env.PROD
	});

	await c.env.SESSIONS.put(
		sessionResult.data.data.token,
		JSON.stringify({ session: { secretHash: data.session.secretHash }, user })
	);

	return sessionResult;
}

const signUpSchema = z.object({
	username: z.string().min(5).max(25)
});
const signUpValidator = createValidator('json', signUpSchema);

const signInSchema = z.object({
	username: z.string().min(5).max(25)
});
const signInValidator = createValidator('json', signInSchema);

const publicrouter = new Hono<IAuthENV>()
	.use((c, next) => injectUserHandler(c, next))
	.use((c, next) => injectSessionHandler(c, next))
	.post('/sign-up', signUpValidator, async (c) => {
		const data = c.req.valid('json');
		const userHandler = c.get('userHandler');

		const createResult = await userHandler.createUser(data);
		if (result.isErr(createResult) || !createResult.data) {
			const errRes = errResponse(500, {
				reason: 'Could not create the new user'
			});

			return c.json(errRes.err, errRes.status);
		}

		const sessionResult = await setSession(c, createResult.data);
		if (result.isErr(sessionResult) || sessionResult.data.status === 'none') {
			const errRes = errResponse(500, {
				reason: 'Could not create the new user'
			});

			return c.json(errRes.err, errRes.status);
		}

		const okRes = okResponse(201, createResult.data);

		return c.json(okRes.data, okRes.status);
	})
	.post('/sign-in', signInValidator, async (c) => {
		const data = c.req.valid('json');
		const userHandler = c.get('userHandler');

		const searchResult = await userHandler.findUserByUsername(data.username);

		if (result.isErr(searchResult)) {
			const errRes = errResponse(500, {
				reason: 'Could not find user'
			});

			return c.json(errRes.err, errRes.status);
		} else if (!searchResult.data) {
			const errRes = errResponse(404, {
				reason: 'Could not find the requested user'
			});

			return c.json(errRes.err, errRes.status);
		}

		const sessionResult = await setSession(c, searchResult.data);
		if (result.isErr(sessionResult) || sessionResult.data.status === 'none') {
			const errRes = errResponse(500, {
				reason: 'Could not create the new user'
			});

			return c.json(errRes.err, errRes.status);
		}

		const okRes = okResponse(200, searchResult.data);

		return c.json(okRes.data, okRes.status);
	});

export default publicrouter;
