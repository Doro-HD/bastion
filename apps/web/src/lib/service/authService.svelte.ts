import { goto } from '$app/navigation';
import { authClient } from '$lib/clients/authClient';
import { authStore } from '$lib/stores/authStore.svelte';

async function authenticate() {
	const { data, error } = await authClient.getSession();
	if (error || !data?.user.username) {
		return;
	}

	authStore.setUser(data.user.username);
}

const authService = {
	signUp: async (username: string, password: string): Promise<boolean> => {
		const { data, error } = await authClient.signUp.email({ name: username, email: `${username}@bastion.com`, username, password });
		if (error) {
			return false;
		}

		// using name instead of username, as username is not available on the email signup
		authStore.setUser(data.user.name);

		return true;
	},
	login: async (username: string, password: string): Promise<boolean> => {
		const { data, error } = await authClient.signIn.username({ username, password });
		if (error) {
			return false;
		}

		authStore.setUser(data.user.username);

		return true;
	},
	signOut: async () => {
		await authClient.signOut();
		authStore.removeUser();
	},
	authenticatedOnly: async () => {
		await authenticate();

		$effect(() => {
			if (!authStore.isAuthenticated) {
				goto('/login');
			}
		});
	},
	nonAuthenticatedOnly: async () => {
		await authenticate();

		$effect(() => {
			if (authStore.isAuthenticated) {
				goto('/home');
			}
		});
	}
};

export { authService };
