class AuthStore {
	username: null | string = $state(null);
	isAuthenticated = $derived(this.username !== null);

	setUser(username: string) {
		this.username = username;
	}

	removeUser() {
		this.username = null;
	}
}

const authStore = new AuthStore();

export { authStore };
