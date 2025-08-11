import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

import app from '@/index';
import UserHandler from '@/db/users/handler';
import { result } from '@doro-hd/result';

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
	const path = `${basePath}/sign-up`;

	it('Should succeed with correct data', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(200);
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

	it('Should fail with unauthorized, 401', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(401);
	});

	it('Should fail with user not found, 404', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(404);
	});
});

describe('Validate', () => {
	const path = `${basePath}/sign-up`;

	it('Should succed with correct data', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(200);
	});

	it('Should fail with unauthorized, 401', async () => {
		const res = await app.request(
			path,
			{
				method: 'post'
			},
			env
		);

		expect(res.status).toBe(401);
	});
});
