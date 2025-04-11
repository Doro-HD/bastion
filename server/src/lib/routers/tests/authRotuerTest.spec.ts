import { testClient } from 'hono/testing';
import { describe, test, expect } from 'vitest';
import { crypto } from '@/index';

import { authRouter } from '../authRouter';
import { faker } from '@faker-js/faker';

describe('authRouter', async () => {
	const client = testClient(authRouter);

	test('Should sign up a user', async () => {
		const password = faker.internet.password();
		const res = await client['sign-up'].$post({
			form: {
				id: crypto.generateId(),
				username: faker.internet.username(),
				password,
				'confirm-password': password
			}
		});

		expect(res.status).toBe(200);
		expect(res.headers.get('Set-Cookie')).toBeTruthy();
		expect(res.headers.get('Content-Type')).toBe('application/json');
		expect(await res.json()).toEqual({
			data: 'success'
		});
	});
});
