import { describe, it, expect, beforeEach, vi, afterEach, assert } from 'vitest';
import { faker } from '@faker-js/faker';
import APIClient from './index';

describe('API client', () => {
	beforeEach(() => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(user)
			})
		);
	});
	afterEach(() => vi.clearAllMocks());

	const errorResponse = vi.fn(() => Promise.resolve({ status: 500 }));

	const user = {
		id: faker.string.uuid(),
		username: faker.internet.username()
	};

	const apiClient = new APIClient('/users');

	describe('Get', () => {
		it('Should call get with ok result', async () => {
			const getResult = await apiClient.get();

			assert(getResult.status === 'ok');
			expect(getResult.data).toBe(user);
		});

		it('Should call get with an err result', async () => {
			global.fetch = errorResponse;
			const getResult = await apiClient.get();

			assert(getResult.status === 'err');
			expect(getResult.err).toStrictEqual({ message: '' });
		});
	});

	describe('Post', () => {
		const body = { body: user };

		it('Should call post with ok result', async () => {
			const getResult = await apiClient.post(body);

			assert(getResult.status === 'ok');
			expect(getResult.data).toBe(user);
		});

		it('Should call post with an err result', async () => {
			global.fetch = errorResponse;
			const getResult = await apiClient.post(body);

			assert(getResult.status === 'err');
			expect(getResult.err).toStrictEqual({ message: '' });
		});
	});

	describe('Put', () => {
		const body = { body: user };

		it('Should call put with ok result', async () => {
			const getResult = await apiClient.put(body);

			assert(getResult.status === 'ok');
			expect(getResult.data).toBe(user);
		});

		it('Should call put with an err result', async () => {
			global.fetch = errorResponse;
			const getResult = await apiClient.put(body);

			assert(getResult.status === 'err');
			expect(getResult.err).toStrictEqual({ message: '' });
		});
	});

	describe('Delete', () => {
		it('Should call delete with ok result', async () => {
			const getResult = await apiClient.delete();

			assert(getResult.status === 'ok');
			expect(getResult.data).toBe(user);
		});

		it('Should call delete with an err result', async () => {
			global.fetch = errorResponse;
			const getResult = await apiClient.delete();

			assert(getResult.status === 'err');
			expect(getResult.err).toStrictEqual({ message: '' });
		});
	});
});
