import result from '$lib/result';
import type { TAPIResult } from '$lib/apiClients/types';
import AuthClient from '$lib/apiClients/authClient';
import type {
	TSignInResponse,
	TSignUpResponse,
	IAPIUser,
	TSignInRequest,
	TSignUpRequest
} from '$lib/apiClients/authClient/types';
import getAuthStore from '$lib/stores/authStore.svelte';

const authClient = new AuthClient();
const authStore = getAuthStore();

const authService = {
	handleResult: <T extends IAPIUser>(apiResult: TAPIResult<T>): boolean => {
		if (result.isErr(apiResult)) {
			return false;
		} else if (apiResult.data.status !== 'ok') {
			return false;
		}

		authStore.setUser(apiResult.data.data);

		return true;
	},
	signUp: async (user: TSignUpRequest): Promise<boolean> => {
		const signUpResult = await authClient.signUp(user);

		return authService.handleResult<TSignUpResponse>(signUpResult);
	},
	signIn: async (user: TSignInRequest): Promise<boolean> => {
		const signInResult = await authClient.signIn(user);

		return authService.handleResult<TSignInResponse>(signInResult);
	},
	validate: async (): Promise<boolean> => {
		const validateResult = await authClient.validate();

		return authService.handleResult(validateResult);
	}
};

export default authService;
