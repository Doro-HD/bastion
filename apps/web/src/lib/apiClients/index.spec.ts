import { describe, it, expect, beforeEach, vi, afterEach, assert } from 'vitest';
import { faker } from '@faker-js/faker';
import APIClient from './index';
import { PUBLIC_API_URL } from '$env/static/public';
import type { IPostPutOptions, TGetDeleteOptions } from './types';

describe('API client', () => {
	afterEach(() => vi.clearAllMocks());

	const user = {
		id: faker.string.uuid(),
		username: faker.internet.username()
	};

	const apiClient = new APIClient('/users');

	describe('Get', () => {
		it('Should recieve a complete ok result with the correct data', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));
			const getResult = await apiClient.get<typeof user>();

			assert(getResult.status === 'ok');
			assert(getResult.data.status === 'ok');

			const responseData = getResult.data.data;

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(responseData.id).toBe(user.id);
			expect(responseData.username).toBe(user.username);
		});

		it('Should form the correct url', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));

			const options: TGetDeleteOptions = {
				path: '/foo',
				query: {
					bar: 'baz',
					limit: '10'
				}
			};
			await apiClient.get<typeof user>(options);

			// the "users" part of the path comes from the initialization of the api client
			expect(apiCallSpy).toHaveBeenCalledWith(
				`${PUBLIC_API_URL}/users${options.path}?bar=baz&limit=10`,
				{
					body: undefined,
					credentials: 'include'
				}
			);
		});

		it('Should recieve a bad request', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 400 }));

			const getResult = await apiClient.get<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('bad request');
		});

		it('Should recieve an unauthorized', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 401 }));

			const getResult = await apiClient.get<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('unauthorized');
		});

		it('Should recieve a not found', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 404 }));

			const getResult = await apiClient.get<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('not found');
		});

		it('Should recieve a server error', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 500 }));

			const getResult = await apiClient.get<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('server error');
		});

		it('Should recieve an err result', async () => {
			const apiCallSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
				throw Error();
				return new Response();
			});
			const getResult = await apiClient.get();

			assert(getResult.status === 'err');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.err.status).toBe('client error');
		});
	});

	describe('Post', () => {
		const options: IPostPutOptions = { body: user };

		it('Should recieve a complete ok result with the correct data', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));
			const getResult = await apiClient.post<typeof user>(options);

			assert(getResult.status === 'ok');
			assert(getResult.data.status === 'ok');

			const responseData = getResult.data.data;

			expect(apiCallSpy).toHaveBeenCalledOnce();

			expect(responseData.id).toBe(user.id);
			expect(responseData.username).toBe(user.username);
		});

		it('Should form the correct url', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));

			const urlOptions: IPostPutOptions = {
				...options,
				path: '/foo',
				query: {
					bar: 'baz',
					limit: '10'
				}
			};
			await apiClient.post<typeof user>(urlOptions);

			// the "users" part of the path comes from the initialization of the api client
			expect(apiCallSpy).toHaveBeenCalledWith(
				`${PUBLIC_API_URL}/users${urlOptions.path}?bar=baz&limit=10`,
				{
					body: JSON.stringify(user),
					credentials: 'include'
				}
			);
		});

		it('Should recieve a bad request', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 400 })
			);

			const getResult = await apiClient.post<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('bad request');
		});

		it('Should recieve an unauthorized', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 401 })
			);

			const getResult = await apiClient.post<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('unauthorized');
		});

		it('Should recieve a not found', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 404 })
			);

			const getResult = await apiClient.post<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('not found');
		});

		it('Should recieve a server error', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 500 })
			);

			const getResult = await apiClient.post<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('server error');
		});

		it('Should recieve an err result', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
				throw Error();
				return new Response();
			});
			const getResult = await apiClient.post(options);

			assert(getResult.status === 'err');

			expect(getResult.err.status).toBe('client error');
		});
	});

	describe('Put', () => {
		const options: IPostPutOptions = { body: user };
		it('Should recieve a complete ok result with the correct data', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));
			const getResult = await apiClient.put<typeof user>(options);

			assert(getResult.status === 'ok');
			assert(getResult.data.status === 'ok');

			const responseData = getResult.data.data;

			expect(apiCallSpy).toHaveBeenCalledOnce();

			expect(responseData.id).toBe(user.id);
			expect(responseData.username).toBe(user.username);
		});

		it('Should form the correct url', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));

			const urlOptions: IPostPutOptions = {
				...options,
				path: '/foo',
				query: {
					bar: 'baz',
					limit: '10'
				}
			};
			await apiClient.put<typeof user>(urlOptions);

			// the "users" part of the path comes from the initialization of the api client
			expect(apiCallSpy).toHaveBeenCalledWith(
				`${PUBLIC_API_URL}/users${urlOptions.path}?bar=baz&limit=10`,
				{
					body: JSON.stringify(user),
					credentials: 'include'
				}
			);
		});

		it('Should recieve a bad request', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 400 })
			);

			const getResult = await apiClient.put<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('bad request');
		});

		it('Should recieve an unauthorized', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 401 })
			);

			const getResult = await apiClient.put<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('unauthorized');
		});

		it('Should recieve a not found', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 404 })
			);

			const getResult = await apiClient.put<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('not found');
		});

		it('Should recieve a server error', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(
				async () => new Response(undefined, { status: 500 })
			);

			const getResult = await apiClient.put<typeof user>(options);

			assert(getResult.status === 'ok');

			expect(getResult.data.status).toBe('server error');
		});

		it('Should recieve an err result', async () => {
			vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
				throw Error();
				return new Response();
			});
			const getResult = await apiClient.put(options);

			assert(getResult.status === 'err');

			expect(getResult.err.status).toBe('client error');
		});
	});

	describe('Delete', () => {
		it('Should recieve a complete ok result with the correct data', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));
			const getResult = await apiClient.delete<typeof user>();

			assert(getResult.status === 'ok');
			assert(getResult.data.status === 'ok');

			const responseData = getResult.data.data;

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(responseData.id).toBe(user.id);
			expect(responseData.username).toBe(user.username);
		});

		it('Should form the correct url', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(JSON.stringify(user)));

			const options: TGetDeleteOptions = {
				path: '/foo',
				query: {
					bar: 'baz',
					limit: '10'
				}
			};
			await apiClient.delete<typeof user>(options);

			// the "users" part of the path comes from the initialization of the api client
			expect(apiCallSpy).toHaveBeenCalledWith(
				`${PUBLIC_API_URL}/users${options.path}?bar=baz&limit=10`,
				{
					body: undefined,
					credentials: 'include'
				}
			);
		});

		it('Should recieve a bad request', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 400 }));

			const getResult = await apiClient.delete<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('bad request');
		});

		it('Should recieve an unauthorized', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 401 }));

			const getResult = await apiClient.delete<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('unauthorized');
		});

		it('Should recieve a not found', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 404 }));

			const getResult = await apiClient.delete<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('not found');
		});

		it('Should recieve a server error', async () => {
			const apiCallSpy = vi
				.spyOn(globalThis, 'fetch')
				.mockImplementation(async () => new Response(undefined, { status: 500 }));

			const getResult = await apiClient.delete<typeof user>();

			assert(getResult.status === 'ok');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.data.status).toBe('server error');
		});

		it('Should recieve an err result', async () => {
			const apiCallSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
				throw Error();
				return new Response();
			});
			const getResult = await apiClient.delete();

			assert(getResult.status === 'err');

			expect(apiCallSpy).toHaveBeenCalledOnce();
			expect(getResult.err.status).toBe('client error');
		});
	});
});
