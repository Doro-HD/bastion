class AuthStore {
	username: null | string = $state(null);
	isAuthenticated = $derived(this.username !== null);

	authenticate(username: string) {
		this.username = username;
	}

	signOut() {
		this.username = null;
	}
}

const authStore = new AuthStore();

export { authStore };
