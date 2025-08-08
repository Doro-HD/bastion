import APIClient from '@doro-hd/api-client';
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

	async signUp(request: TSignUpRequest) {
		return this.#apiClient.post<TSignUpResponse>({
			path: '/sign-up',
			body: { ...request }
		});
	}

	async signIn(request: TSignInRequest) {
		return this.#apiClient.post<TSignInResponse>({
			path: '/sign-in',
			body: { ...request }
		});
	}

	async validate() {
		return this.#apiClient.get<TValidateResponse>({
			path: '/validate'
		});
	}
}

export default AuthClient;
