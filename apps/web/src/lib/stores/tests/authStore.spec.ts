import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import getAuthStore, { AuthStore } from '$lib/stores/authStore.svelte';
import type { IAPIUser } from '$lib/apiClients/authClient/types';

describe('Auth store', () => {
	beforeEach(() => {
		authStore = new AuthStore();
	});

	let authStore: AuthStore;

	it('Should set the user state', () => {
		const user: IAPIUser = { username: faker.internet.username() };
		authStore.setUser(user);

		expect(authStore.user).toBe(user);
	});

	it('Should remove the user state', () => {
		const user: IAPIUser = { username: faker.internet.username() };
		authStore.setUser(user);

		authStore.removeUser();

		expect(authStore.user).toBe(null);
	});

	it('Should set authorized to true if user is set', () => {
		const user: IAPIUser = { username: faker.internet.username() };
		authStore.setUser(user);

		expect(authStore.isAuthorized).toBe(true);
	});

	it('Should set authorized to false if user is not set', () => {
		authStore.removeUser();
		expect(authStore.isAuthorized).toBe(false);
	});
});
