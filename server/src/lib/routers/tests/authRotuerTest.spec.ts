import { describe, test, expect } from 'vitest';
import { testClient } from 'hono/testing';

import { auth, crypto } from '@/index';
import { authRouter } from '../authRouter';
import { faker } from '@faker-js/faker';

describe('Auth router', () => {
	const client = testClient(authRouter);

	const password = faker.internet.password();
	const form = {
		id: crypto.generateId(),
		username: faker.internet.username(),
		password,
		'confirm-password': password
	};

	describe('Sign up', () => {
		test('Successfully sign up a new user', async () => {
			const res = await client['sign-up'].$post({
				form
			});

			expect(res.status).toBe(201);
			expect(res.headers.get('Set-Cookie')).toBeTruthy();
			expect(res.headers.get('Content-Type')).toBe('application/json');
			expect(await res.json()).toEqual({
				data: 'success'
			});
		});

		test('Same id produces no new result', async () => {
			const res = await client['sign-up'].$post({
				form
			});

			expect(res.status).toBe(200);
		});

		test('Same username prodcues error', async () => {
			const res = await client['sign-up'].$post({
				form: {
					...form,
					id: crypto.generateId()
				}
			});

			expect(res.status).toBe(400);
		});
	});

	describe('Sign in', () => {
		test('Successful sign in', async () => {
			const res = await client['sign-in'].$post({
				form: {
					username: form.username,
					password: form.password
				}
			});

			expect(res.status).toBe(200);
			expect(res.headers.get('Set-Cookie')).toBeTruthy();
			expect(res.headers.get('Content-Type')).toBe('application/json');
			expect(await res.json()).toEqual({
				data: 'success'
			});
		});

		test('Wrong username produces not found', async () => {
			const res = await client['sign-in'].$post({
				form: {
					username: 'Wrong username',
					password: 'Wrong password'
				}
			});

			expect(res.status).toBe(404);
		});

		test('Wrong password produces forbidden', async () => {
			const res = await client['sign-in'].$post({
				form: {
					username: form.username,
					password: 'Wrong password'
				}
			});

			expect(res.status).toBe(401);
		});
	});

	describe('Sign out', () => {
		test('Successful sign out', async () => {
			const res = await client['sign-out'].$get(undefined, {
				headers: {
					Cookie: `${auth.sessionCookieName}=foo`
				},
			});

			expect(res.status).toBe(200);
			expect(res.headers.get('Set-Cookie')).toBe(`${auth.sessionCookieName}=; Max-Age=0; Path=/`);
			expect(res.headers.get('Content-Type')).toBe('application/json');
			expect(await res.json()).toEqual({
				data: 'success'
			});
		});
	})
});
