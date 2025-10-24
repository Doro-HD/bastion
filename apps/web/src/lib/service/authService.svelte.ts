import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/authStore.svelte';

function authenticate(username: string) {
	authStore.setUser(username);
	localStorage.setItem('username', username);
}

function authenticateFromStorage() {
	const storedUsername = localStorage.getItem('username');
	if (storedUsername) {
		authStore.setUser(storedUsername);
		localStorage.setItem('username', storedUsername);

		return true;
	}

	return false;
}

const authService = {
	signUp: (username: string) => {
		const isAuthenticated = authenticateFromStorage();
		if (!isAuthenticated) {
			authenticate(username);
		}
	},
	login: (username: string) => {
		const isAuthenticated = authenticateFromStorage();
		if (!isAuthenticated) {
			authenticate(username);
		}
	},
	signOut: () => {
		authStore.removeUser();
		localStorage.removeItem('username');
	},
	authenticatedOnly: () => {
		authenticateFromStorage();
		$effect(() => {
			if (!authStore.isAuthenticated) {
				goto('/login');
			}
		});
	},
	nonAuthenticatedOnly: () => {
		authenticateFromStorage();
		$effect(() => {
			if (authStore.isAuthenticated) {
				goto('/home');
			}
		});
	}
};

export { authService };
