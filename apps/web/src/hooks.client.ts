import type { ClientInit } from "@sveltejs/kit";

import AuthClient from "$lib/apiClients/authClient";
import getAuthStore from "$lib/stores/authStore.svelte";

export const init: ClientInit = async () => {
	const authClient = new AuthClient();

	const validateResult = await authClient.validate();
	if (validateResult.name === "ok") {
		const data = validateResult.data;
		const authStore = getAuthStore();

		authStore.setUser({ username: data.username });
	}
};
