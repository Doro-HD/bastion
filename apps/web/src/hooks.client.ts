import type { ClientInit } from '@sveltejs/kit';

import AuthClient from '$lib/apiClients/authClient';
import getAuthStore from '$lib/stores/authStore';
import result from '$lib/result';

export const init: ClientInit = async () => {
	const authClient = new AuthClient();

	const validateResult = await authClient.validate();
	if (result.isOk(validateResult)) {
		const data = validateResult.data;
		const authStore = getAuthStore();

		authStore.setUser({ username: data.username });
	}
};
