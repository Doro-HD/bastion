import { PUBLIC_API_URL } from '$env/static/public';
import result from '$lib/result';
import type { TAPIResult, IAPIOptions, TPath, TGetDeleteOptions, IPostPutOptions } from './types';

class APIClient {
	#url: string;

	/**
	 * @param basePath - The base path to use, eg. /users, /sessions etc.
	 */
	constructor(basePath: TPath) {
		this.#url = `${PUBLIC_API_URL}${basePath}`;
	}

	async #apiCall<T>(options: IAPIOptions): Promise<TAPIResult<T>> {
		let query = null;
		if (options.query) {
			const pairs = Object.entries(options.query).map(([key, value]) => `${key}=${value}`);
			query = `?${pairs.join('&')}`;
		}

		try {
			const res = await fetch(
				`${this.#url}${options.path ? options.path : ''}${query ? query : ''}`,
				{
					credentials: 'include',
					body: JSON.stringify(options.body)
				}
			);

			switch (res.status) {
				case 200:
					const data = await res.json();

					return result.ok({ status: 'ok', data });
				case 400:
					return result.ok({ status: 'bad request' });
				case 401:
					return result.ok({ status: 'unauthorized' });
				case 404:
					return result.ok({ status: 'not found' });
				case 500:
					return result.ok({ status: 'server error' });
				default:
					return result.err({ status: 'client error' });
			}
		} catch (e) {
			return result.err({ status: 'client error' });
		}
	}

	async get<T>(options?: TGetDeleteOptions): Promise<TAPIResult<T>> {
		return this.#apiCall<T>({
			method: 'get',
			...options
		});
	}

	async post<T>(options: IPostPutOptions): Promise<TAPIResult<T>> {
		return this.#apiCall<T>({
			method: 'post',
			...options
		});
	}

	async put<T>(options: IPostPutOptions): Promise<TAPIResult<T>> {
		return this.#apiCall({
			method: 'put',
			...options
		});
	}

	async delete<T>(options?: TGetDeleteOptions): Promise<TAPIResult<T>> {
		return this.#apiCall({
			method: 'delete',
			...options
		});
	}
}

export default APIClient;
