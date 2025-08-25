import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

import app from '$/routers/index';
import UserHandler from '$/db/users/handler';
import { option, result } from '@doro-hd/result';
import SessionHandler from '$/db/sessions/handler';

const basePath = '/auth';

afterEach(() => vi.clearAllMocks());

beforeEach(() => {
	vi.mock(import('$/db/index'), async (importOriginal) => {
		const module = await importOriginal();
		return {
			...module,
			default: vi.fn()
		};
	});
});

describe('Sign up', () => {
	const path = `${basePath}/sign-up`;

	it('Should succeed with correct data', async () => {
		const userId = faker.string.uuid();
		const createUserSpy = vi
			.spyOn(UserHandler.prototype, 'createUser')
			.mockImplementation(async (newUser) =>
				result.ok({
					id: userId,
					...newUser
				})
			);

		const token = 'foo.bar';
		const session = {
			id: token.split('.')[0],
			secretHash: Buffer.from('someHashValue'),
			createdAt: Date.now(),
			userId: faker.string.uuid()
		};
		const createSessionSpy = vi
			.spyOn(SessionHandler.prototype, 'createSession')
			.mockImplementation(async () =>
				result.ok(
					option.some({
						session,
						token
					})
				)
			);

		const sessionStoreSpy = vi.spyOn(env.SESSIONS, 'put');

		const data = { username: faker.internet.username() };
		const res = await app.request(
			path,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			},
			env
		);

		expect(res.status).toBe(201);

		const jsonData: { id: string; username: string } = await res.json();

		// value expectations
		expect(res.headers.get('Set-Cookie')).toBe(
			`auth-token=${token}; Max-Age=86400; Path=/; HttpOnly`
		);
		expect(jsonData.id).toBe(userId);
		expect(jsonData.username).toBe(data.username);

		expect(createUserSpy).toHaveBeenCalledExactlyOnceWith(data);
		expect(createSessionSpy).toHaveBeenCalledExactlyOnceWith(userId);
		expect(sessionStoreSpy).toHaveBeenCalledExactlyOnceWith(
			token,
			JSON.stringify({ session: { secretHash: session.secretHash }, user: { id: userId, ...data } })
		);
	});

	it('Should fail with bad request, 400', async () => {
		const res = await app.request(
			path,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({})
			},
			env
		);

		expect(res.status).toBe(400);
	});
});

describe('Sign in', () => {
	const path = `${basePath}/sign-in`;

	it('Should succeed with correct data', async () => {
		const userId = faker.string.uuid();
		const signInSpy = vi
			.spyOn(UserHandler.prototype, 'findUserByUsername')
			.mockImplementation(async (username) =>
				result.ok({
					id: userId,
					username
				})
			);

		const token = 'foo.bar';
		const session = {
			id: token.split('.')[0],
			secretHash: Buffer.from('someHashValue'),
			createdAt: Date.now(),
			userId: userId
		};
		const createSessionSpy = vi
			.spyOn(SessionHandler.prototype, 'createSession')
			.mockImplementation(async () =>
				result.ok(
					option.some({
						session,
						token
					})
				)
			);

		const sessionStoreSpy = vi.spyOn(env.SESSIONS, 'put');

		const username = faker.internet.username();
		const res = await app.request(
			path,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username
				})
			},
			env
		);

		expect(res.status).toBe(200);
		expect(res.headers.get('Set-Cookie')).toBe(
			`auth-token=${token}; Max-Age=86400; Path=/; HttpOnly`
		);

		expect(signInSpy).toHaveBeenCalledOnce();
		expect(signInSpy).toHaveBeenCalledWith(username);
		expect(createSessionSpy).toHaveBeenCalledExactlyOnceWith(userId);
		expect(sessionStoreSpy).toHaveBeenCalledExactlyOnceWith(
			'foo.bar',
			JSON.stringify({
				session: { secretHash: session.secretHash },
				user: { id: userId, username }
			})
		);
	});

	it('Should fail with bad request, 400', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(400);
	});

	it('Should fail with user not found, 404', async () => {
		vi.spyOn(UserHandler.prototype, 'findUserByUsername').mockImplementation(async () =>
			result.ok(undefined)
		);
		const res = await app.request(
			path,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: faker.internet.username()
				})
			},
			env
		);

		expect(res.status).toBe(404);
	});
});

describe('Validate', () => {
	const path = `${basePath}/validate`;

	it('Should succed with correct data from session handler', async () => {
		const data = { id: faker.string.uuid(), username: faker.internet.username() };
		const findUserSpy = vi
			.spyOn(SessionHandler.prototype, 'findUserFromSession')
			.mockImplementation(async () =>
				result.ok({
					status: 'some',
					data
				})
			);

		const sessionStoreSpy = vi.spyOn(env.SESSIONS, 'get');

		const token = 'foo.bar';
		const res = await app.request(
			path,
			{
				method: 'get',
				headers: {
					Cookie: `auth-token=${token}`
				}
			},
			env
		);

		expect(res.status).toBe(200);
		expect(await res.json()).toStrictEqual(data);

		expect(findUserSpy).toHaveBeenCalledExactlyOnceWith(token);
		expect(sessionStoreSpy).toHaveBeenCalledOnce();
	});

	it('Should succed with correct data from session store', async () => {
		const expectation = {
			session: { secretHash: Buffer.from('someHashValue') },
			user: { id: faker.string.uuid(), username: faker.internet.username() }
		};

		const sessionStoreSpy = vi
			.spyOn(env.SESSIONS, 'get')
			.mockImplementation(() => JSON.stringify(expectation));

		const validateSpy = vi
			.spyOn(SessionHandler.prototype, 'validateSession')
			.mockImplementation(async () => true);

		const findUserSpy = vi.spyOn(SessionHandler.prototype, 'findUserFromSession');

		const token = 'foo.bar';
		const res = await app.request(
			path,
			{
				method: 'get',
				headers: {
					Cookie: `auth-token=${token}`
				}
			},
			env
		);

		const data = await res.json();

		expect(res.status).toBe(200);
		expect(data).toStrictEqual(expectation.user);

		expect(sessionStoreSpy).toHaveBeenCalledExactlyOnceWith(token);
		expect(validateSpy).toHaveBeenCalledOnce();
		expect(findUserSpy).toHaveBeenCalledTimes(0);
	});

	it('Should fail with unauthorized, 401 when an invalid token is provided', async () => {
		const token = 'foobar';
		const res = await app.request(
			path,
			{
				method: 'get',
				headers: {
					Cookie: `auth-token=${token}`
				}
			},
			env
		);

		expect(res.status).toBe(401);
	});

	it('Should fail with unauthorized, 401 when no token is provided', async () => {
		const res = await app.request(
			path,
			{
				method: 'get'
			},
			env
		);

		expect(res.status).toBe(401);
	});
});
