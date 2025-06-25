import { PUBLIC_API_URL } from '$env/static/public';
import type { TResult } from '$lib/result';
import result from '$lib/result';
import type { IAPIError, IAPIOptions, TPath, TGetDeleteOptions, IPostPutOptions } from './types';

class APIClient {
	#url: string;

	/**
	 * @param basePath - The base path to use, eg. /users, /sessions etc.
	 */
	constructor(basePath: TPath) {
		this.#url = `${PUBLIC_API_URL}${basePath}`;
	}

	async #apiCall<T>(options: IAPIOptions): Promise<TResult<T, IAPIError>> {
		let query = null;
		if (options.query) {
			const pairs = Object.entries(options.query).map((key, value) => `${key}=${value}`);
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
			if (res.status !== 200) {
				return result.err({ message: '' });
			}

			const data: T = await res.json();

			return result.ok(data);
		} catch (e) {
			return result.err({ message: '' });
		}
	}

	async get<T>(options?: TGetDeleteOptions): Promise<TResult<T, IAPIError>> {
		return this.#apiCall<T>({
			method: 'get',
			...options
		});
	}

	async post(options: IPostPutOptions) {
		return this.#apiCall({
			method: 'post',
			...options
		});
	}

	async put(options: IPostPutOptions) {
		return this.#apiCall({
			method: 'put',
			...options
		});
	}

	async delete(options?: TGetDeleteOptions) {
		return this.#apiCall({
			method: 'delete',
			...options
		});
	}
}

export default APIClient;
