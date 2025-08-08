import { faker } from '@faker-js/faker';
import { afterEach, assert, describe, expect, it, vi } from 'vitest';

import APIClient from '@doro-hd/api-client';
import AuthClient from './index';

afterEach(() => vi.clearAllMocks());

const authClient = new AuthClient();

describe('Sign up', () => {
	it('Should call post with correct options', async () => {
		const user = { username: faker.internet.username() };
		const apiSpy = vi.spyOn(APIClient.prototype, 'post').mockImplementation(async (options) => ({
			code: 201,
			name: 'created',
			data: options.body
		}));

		await authClient.signUp(user);

		expect(apiSpy).toHaveBeenCalledOnce();
		expect(apiSpy).toHaveBeenCalledWith({
			path: '/sign-up',
			body: user
		});
	});
});

describe('Sign in', () => {
	it('Should call post with correct options', async () => {
		const apiSpy = vi.spyOn(APIClient.prototype, 'post').mockImplementation(async (options) => ({
			code: 200,
			name: 'ok',
			data: options.body
		}));

		const username = faker.internet.username();
		await authClient.signIn({
			username
		});

		expect(apiSpy).toHaveBeenCalledOnce();
		expect(apiSpy).toHaveBeenCalledWith({
			path: '/sign-in',
			body: { username }
		});
	});
});

describe('Validate', () => {
	it('Should succesfully validate', async () => {
		const user = { username: faker.internet.username() };
		const apiSpy = vi.spyOn(APIClient.prototype, 'get').mockImplementation(async () => ({
			code: 200,
			name: 'ok',
			data: user
		}));

		await authClient.validate();

		expect(apiSpy).toHaveBeenCalledOnce();
		expect(apiSpy).toHaveBeenCalledWith({
			path: '/validate'
		});
	});
});
