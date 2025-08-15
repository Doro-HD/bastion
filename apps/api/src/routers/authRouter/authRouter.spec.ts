import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

import app from '@/index';
import UserHandler from '@/db/users/handler';
import { result } from '@doro-hd/result';
import SessionHandler from '@/db/sessions/handler';

const basePath = '/auth';

afterEach(() => vi.clearAllMocks());

beforeEach(() => {
	vi.mock(import('@/db/index'), async (importOriginal) => {
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
		const createUserSpy = vi
			.spyOn(UserHandler.prototype, 'createUser')
			.mockImplementation(async (newUser) =>
				result.ok({
					id: faker.string.uuid(),
					...newUser
				})
			);

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
		expect(jsonData.id).toBeTruthy();
		expect(jsonData.username).toBe(data.username);

		expect(createUserSpy).toHaveBeenCalledOnce();
		expect(createUserSpy).toBeCalledWith(data);
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
		const signInSpy = vi
			.spyOn(UserHandler.prototype, 'findUserByUsername')
			.mockImplementation(async (username) =>
				result.ok({
					id: faker.string.uuid(),
					username
				})
			);
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
		expect(signInSpy).toHaveBeenCalledOnce();
		expect(signInSpy).toHaveBeenCalledWith(username);
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

	it('Should succed with correct data', async () => {
		const findUserSpy = vi
			.spyOn(SessionHandler.prototype, 'findUserFromSession')
			.mockImplementation(async () =>
				result.ok({
					status: 'some',
					data: { id: faker.string.uuid(), username: faker.internet.username() }
				})
			);
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
		expect(findUserSpy).toHaveBeenCalledExactlyOnceWith(token);
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
