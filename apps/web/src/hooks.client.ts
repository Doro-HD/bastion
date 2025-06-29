import type { ClientInit } from '@sveltejs/kit';

import AuthClient from '$lib/apiClients/authClient';
import getAuthStore from '$lib/stores/authStore.svelte';
import result from '$lib/result';

export const init: ClientInit = async () => {
	const authClient = new AuthClient();

	const validateResult = await authClient.validate();
	if (result.isOk(validateResult) && validateResult.data.status === 'ok') {
		const data = validateResult.data;
		const authStore = getAuthStore();

		authStore.setUser({ username: data.data.username });
	}
};
