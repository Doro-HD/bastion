import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/authStore.svelte';

function authenticate(username: string) {
	let authUsername = username;

	const storedUsername = localStorage.getItem('username');
	if (storedUsername) {
		authUsername = storedUsername;
	}

	authStore.authenticate(authUsername);
	localStorage.setItem('username', authUsername);
}

const authService = {
	signUp: (username: string) => {
		authenticate(username);
	},
	login: (username: string) => {
		authenticate(username);
	},
	signOut: () => {
		authStore.signOut();
		localStorage.removeItem('username');
	},
	authenticatedOnly: () => {
		const storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			authStore.authenticate(storedUsername);
			localStorage.setItem('username', storedUsername);
		}
		$effect(() => {
			if (!authStore.isAuthenticated) {
				goto('/login');
			}
		});
	},
	nonAuthenticatedOnly: () => {
		const storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			authStore.authenticate(storedUsername);
			localStorage.setItem('username', storedUsername);
		}
		$effect(() => {
			if (authStore.isAuthenticated) {
				goto('/home');
			}
		});
	}
};

export { authService };
