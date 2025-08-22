import type { TAPIResult } from "api-client";
import AuthClient from "$lib/apiClients/authClient";
import type {
	IAPIUser,
	TSignInRequest,
	TSignInResponse,
	TSignUpRequest,
	TSignUpResponse,
} from "$lib/apiClients/authClient/types";
import getAuthStore from "$lib/stores/authStore.svelte";

const authClient = new AuthClient();
const authStore = getAuthStore();

/**
 * @description
 * handleResult checks the returned value from authClient.
 * @param apiResult - The result from the authClient to check
 * @returns A boolean representing the success of the api call
 */
function handleResult<T extends IAPIUser>(apiResult: TAPIResult<T>): boolean {
	let isSuccess = false;

	if (apiResult.name === "ok" || apiResult.name === "created") {
		authStore.setUser(apiResult.data);
		isSuccess = true;
	}

	return isSuccess;
}

const authService = {
	/**
	 * @description
	 * signUp attempts to sign up a new user.
	 * @param user - The user data used for signin up.
	 */
	signUp: async (user: TSignUpRequest): Promise<boolean> => {
		const signUpResult = await authClient.signUp(user);

		return handleResult<TSignUpResponse>(signUpResult);
	},
	/**
	 * @description
	 * signIn attempts to sign in a user.
	 * @param user - The user data used for signin in.
	 */
	signIn: async (user: TSignInRequest): Promise<boolean> => {
		const signInResult = await authClient.signIn(user);

		return handleResult<TSignInResponse>(signInResult);
	},
	/**
	 * @description
	 * validate is used for validating a user through the set cookie if it is there, and if so setting the user data in the user store.
	 */
	validate: async (): Promise<boolean> => {
		const validateResult = await authClient.validate();

		return handleResult(validateResult);
	},
};

export default authService;
