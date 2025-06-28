import { faker } from '@faker-js/faker';
import { afterEach, assert, describe, expect, it, vi } from 'vitest';

import APIClient from '$lib/apiClients/index';
import AuthClient from './index';
import result from '$lib/result';

describe('Auth client', () => {
	afterEach(() => vi.clearAllMocks());

	const authClient = new AuthClient();

	describe('Sign up', () => {
		it('Should succesfully sign up', async () => {
			const apiSpy = vi
				.spyOn(APIClient.prototype, 'post')
				.mockImplementation(async (options) => result.ok({ status: 'ok', data: options.body }));

			const username = faker.internet.username();
			const signUpResult = await authClient.signUp({ username });

			assert(signUpResult.status === 'ok');
			assert(signUpResult.data.status === 'ok');

			expect(signUpResult.data.data.username).toBe(username);
			expect(apiSpy).toHaveBeenCalledOnce();
			expect(apiSpy).toHaveBeenCalledWith({
				body: { username }
			});
		});

		it('Should return a bad request on already used username', async () => {
			vi.spyOn(APIClient.prototype, 'post').mockImplementation(async () =>
				result.ok({ status: 'bad request' })
			);

			const username = faker.internet.username();
			const signUpResult = await authClient.signUp({ username });

			assert(signUpResult.status === 'ok');
			expect(signUpResult.data.status).toBe('bad request');
		});

		it('Should return an err if post does', async () => {
			vi.spyOn(APIClient.prototype, 'post').mockImplementation(async () =>
				result.err({ status: 'client error' })
			);

			const username = faker.internet.username();
			const signUpResult = await authClient.signUp({ username });

			assert(signUpResult.status === 'err');
			expect(signUpResult.err.status).toBe('client error');
		});
	});

	describe('Sign in', () => {
		it('Should succesfully sign in', async () => {
			const apiSpy = vi
				.spyOn(APIClient.prototype, 'post')
				.mockImplementation(async (options) => result.ok({ status: 'ok', data: options.body }));

			const username = faker.internet.username();
			const signInResult = await authClient.signIn({ username });

			assert(signInResult.status === 'ok', 'Result is err instead of ok');
			assert(signInResult.data.status === 'ok', 'API status is not ok');

			expect(signInResult.data.data.username).toBe(username);
			expect(apiSpy).toHaveBeenCalledOnce();
			expect(apiSpy).toHaveBeenCalledWith({
				body: { username }
			});
		});

		it('Should return a not found if username does not exists', async () => {
			vi.spyOn(APIClient.prototype, 'post').mockImplementation(async () =>
				result.ok({ status: 'not found' })
			);

			const username = faker.internet.username();
			const signUpResult = await authClient.signIn({ username });

			assert(signUpResult.status === 'ok', 'Result should be ok');
			expect(signUpResult.data.status).toBe('not found');
		});

		it('Should return an err if post does', async () => {
			vi.spyOn(APIClient.prototype, 'post').mockImplementation(async () =>
				result.err({ status: 'client error' })
			);

			const username = faker.internet.username();
			const signUpResult = await authClient.signIn({ username });

			assert(signUpResult.status === 'err', 'Result should be err');
			expect(signUpResult.err.status).toBe('client error');
		});
	});

	describe('Validate', () => {
		it('Should succesfully validate', async () => {
			const username = faker.internet.username();
			const apiSpy = vi
				.spyOn(APIClient.prototype, 'get')
				.mockImplementation(async () => result.ok({ status: 'ok', data: { username } }));

			const signInResult = await authClient.validate();

			assert(signInResult.status === 'ok', 'Result is err instead of ok');
			assert(signInResult.data.status === 'ok', 'API status is not ok');

			expect(signInResult.data.data.username).toBe(username);
			expect(apiSpy).toHaveBeenCalledOnce();
		});

		it('Should return an err if get does', async () => {
			vi.spyOn(APIClient.prototype, 'get').mockImplementation(async () =>
				result.err({ status: 'client error' })
			);

			const signUpResult = await authClient.validate();

			assert(signUpResult.status === 'err', 'Result should be err');
			expect(signUpResult.err.status).toBe('client error');
		});
	});
});
