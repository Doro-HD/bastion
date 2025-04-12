import { Hono } from 'hono';
import { validator } from 'hono/validator';

import { usersValidator } from '@/db/validators';
import { result } from '@/functional/index';
import { usersHandler } from '@/db/handlers';
import { createSession, generateSessionToken, setSessionTokenCookie } from '@/auth';
import { auth } from '..';

const signUpValidation = validator('form', (value, c) => {
	const userResult = usersValidator.validateUserSignUp(value);
	if (result.isErr(userResult)) {
		return c.json({ data: 'Invalid data' }, 400);
	}

	return userResult.data;
});

const signInValidation = validator('form', (value, c) => {
	const userResult = usersValidator.validateUserSignIn(value);
	if (result.isErr(userResult)) {
		return c.json({ data: 'Invalid data' }, 400);
	}

	return userResult.data;
});

const authRouter = new Hono()
	.post('sign-up', signUpValidation, async (c) => {
		const validData = c.req.valid('form');

		const usedIdResult = await usersHandler.findUserById(validData.id);
		if (result.isErr(usedIdResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		if (usedIdResult.data) {
			return c.json({ data: 'Id has already been used' }, 200);
		}

		const existingUserResult = await usersHandler.findUserByUsername(validData.username);
		if (result.isErr(existingUserResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		if (existingUserResult.data) {
			return c.json({ data: 'An user with that username already exsists' }, 400);
		}

		const userCreationResult = await usersHandler.createUser(validData);
		if (result.isErr(userCreationResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		const sessionToken = generateSessionToken();
		const sessionCreationResult = await createSession(sessionToken, userCreationResult.data.id);
		if (result.isErr(sessionCreationResult)) {
			return c.json({ data: 'Server error' }, 500);
		}
		setSessionTokenCookie(c, sessionToken, sessionCreationResult.data.expiresAt);

		return c.json({ data: 'success' }, 201);
	})
	.post('sign-in', signInValidation, async (c) => {
		const validData = c.req.valid('form');

		const existingUserResult = await usersHandler.findUserByUsername(validData.username);
		if (result.isErr(existingUserResult)) {
			return c.json({ data: 'Server error' }, 500);
		}

		if (!existingUserResult.data) {
			return c.json({ data: 'Could not find an user with that username' }, 404);
		}

		const isPasswordValid = await auth.verifyPassword(existingUserResult.data.password, validData.password);
		if (!isPasswordValid) {
			return c.json({ data: 'Incorrect password' }, 401);
		}

		const sessionToken = generateSessionToken();
		const sessionCreationResult = await createSession(sessionToken, existingUserResult.data.id);
		if (result.isErr(sessionCreationResult)) {
			return c.json({ data: 'Server error' }, 500);
		}
		setSessionTokenCookie(c, sessionToken, sessionCreationResult.data.expiresAt);

		return c.json({ data: 'success' });
	});

export { authRouter };
