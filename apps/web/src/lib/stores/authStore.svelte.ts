import type { IAPIUser } from '$lib/apiClients/authClient/types';

class AuthStore {
	user: IAPIUser | null = $state(null);
	isAuthorized = $derived(this.user !== null);

	setUser(user: IAPIUser) {
		this.user = user;
	}

	removeUser() {
		this.user = null;
	}
}

let authStore: AuthStore | null;

function getAuthStore(): AuthStore {
	if (!authStore) {
		authStore = new AuthStore();
	}

	return authStore;
}

export default getAuthStore;
export { AuthStore };
