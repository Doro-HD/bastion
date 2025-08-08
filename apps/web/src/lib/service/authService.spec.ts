import { afterEach, describe, expect, it, vi } from 'vitest';
import { faker } from '@faker-js/faker';

import AuthClient from '$lib/apiClients/authClient';
import authService from './authService';

afterEach(() => vi.resetAllMocks());

describe('Sign up', () => {
	it('Should call authClient sign up with the passed parameter', async () => {
		const spy = vi.spyOn(AuthClient.prototype, 'signUp');
		const expectation = { username: faker.internet.username() };

		await authService.signUp(expectation);

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith(expectation);
	});

	it('Should return true on a 200 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signUp').mockImplementation(async () => ({
			code: 200,
			name: 'ok',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.signUp({ username: 'foo' });

		expect(isSuccess).toBe(true);
	});

	it('Should return true on a 201 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signUp').mockImplementation(async () => ({
			code: 201,
			name: 'created',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.signUp({ username: 'foo' });

		expect(isSuccess).toBe(true);
	});

	it('Should return false on a 400 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signUp').mockImplementation(async () => ({
			code: 400,
			name: 'bad request'
		}));

		const isSuccess = await authService.signUp({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 401 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signUp').mockImplementation(async () => ({
			code: 401,
			name: 'unauthorized'
		}));

		const isSuccess = await authService.signUp({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 404 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signUp').mockImplementation(async () => ({
			code: 404,
			name: 'not found'
		}));

		const isSuccess = await authService.signUp({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});
});

describe('Sign in', () => {
	it('Should call authClient sign in with the passed parameter', async () => {
		const spy = vi.spyOn(AuthClient.prototype, 'signIn');
		const expectation = { username: faker.internet.username() };

		await authService.signIn(expectation);

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith(expectation);
	});

	it('Should return true on a 200 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 200,
			name: 'ok',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(true);
	});

	it('Should return true on a 201 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 201,
			name: 'created',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(true);
	});

	it('Should return false on a 400 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 400,
			name: 'bad request'
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 401 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 401,
			name: 'unauthorized'
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 404 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 404,
			name: 'not found'
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});
});

describe('Validate', () => {
	it('Should call authClient validate', async () => {
		const spy = vi.spyOn(AuthClient.prototype, 'validate');

		await authService.validate();

		expect(spy).toHaveBeenCalledOnce();
	});

	it('Should return true on a 200 response', async () => {
		vi.spyOn(AuthClient.prototype, 'validate').mockImplementation(async () => ({
			code: 200,
			name: 'ok',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.validate();

		expect(isSuccess).toBe(true);
	});

	it('Should return true on a 201 response', async () => {
		vi.spyOn(AuthClient.prototype, 'validate').mockImplementation(async () => ({
			code: 201,
			name: 'created',
			data: { username: 'Foo' }
		}));

		const isSuccess = await authService.validate();

		expect(isSuccess).toBe(true);
	});

	it('Should return false on a 400 response', async () => {
		vi.spyOn(AuthClient.prototype, 'validate').mockImplementation(async () => ({
			code: 400,
			name: 'bad request'
		}));

		const isSuccess = await authService.validate();

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 401 response', async () => {
		vi.spyOn(AuthClient.prototype, 'validate').mockImplementation(async () => ({
			code: 401,
			name: 'unauthorized'
		}));

		const isSuccess = await authService.validate();

		expect(isSuccess).toBe(false);
	});

	it('Should return false on a 404 response', async () => {
		vi.spyOn(AuthClient.prototype, 'signIn').mockImplementation(async () => ({
			code: 404,
			name: 'not found'
		}));

		const isSuccess = await authService.signIn({ username: 'foo' });

		expect(isSuccess).toBe(false);
	});
});
