import APIClient from '$lib/apiClients/index';
import type { TAPIResult } from '$lib/apiClients/types';
import type {
	TSignInRequest,
	TSignInResponse,
	TSignUpRequest,
	TSignUpResponse,
	TValidateResponse
} from './types';

class AuthClient {
	#apiClient: APIClient;

	constructor() {
		this.#apiClient = new APIClient('/auth');
	}

	async signUp(user: TSignUpRequest): Promise<TAPIResult<TSignUpRequest>> {
		return this.#apiClient.post<TSignUpResponse>({
			body: { ...user }
		});
	}

	async signIn(request: TSignInRequest): Promise<TAPIResult<TSignInResponse>> {
		return this.#apiClient.post({
			body: { ...request }
		});
	}

	async validate(): Promise<TAPIResult<TValidateResponse>> {
		return this.#apiClient.get<TValidateResponse>({ path: '/validate' });
	}
}

export default AuthClient;
