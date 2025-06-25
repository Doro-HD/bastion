import APIClient from '$lib/apiClients/index';
import type { TResult } from '$lib/result';
import type { IAPIError } from '$lib/apiClients/types';
import type { TValidateResponse } from './types';

class AuthClient {
	#apiClient: APIClient;

	constructor() {
		this.#apiClient = new APIClient('/auth');
	}

	async signUp() {}

	async signIn() {}

	async validate(): Promise<TResult<TValidateResponse, IAPIError>> {
		return this.#apiClient.get<TValidateResponse>({ path: '/validate' });
	}
}

export default AuthClient;
