import { goto } from '$app/navigation';
import { authClient } from '$lib/clients/authClient';
import { type TAuthCtx } from '$lib/contexts/authContext';

async function authenticate(authCtx: TAuthCtx) {
	const { data, error } = await authClient.getSession();
	if (error || !data?.user.username) {
		return;
	}

	authCtx.setUser(data.user.username);
}

const authService = {
	signUp: async (authCtx: TAuthCtx, username: string, password: string): Promise<boolean> => {
		const { data, error } = await authClient.signUp.email({
			name: username,
			email: `${username}@bastion.com`,
			username,
			password
		});
		if (error) {
			return false;
		}

		// using name instead of username, as username is not available on the email signup
		authCtx.setUser(data.user.name);

		return true;
	},
	login: async (authCtx: TAuthCtx, username: string, password: string): Promise<boolean> => {
		const { data, error } = await authClient.signIn.username({ username, password });
		if (error) {
			return false;
		}

		authCtx.setUser(data.user.username);

		return true;
	},
	signOut: async (authCtx: TAuthCtx) => {
		await authClient.signOut();
		authCtx.removeUser();
	},
	authenticatedOnly: async (authCtx: TAuthCtx) => {
		await authenticate(authCtx);

		$effect(() => {
			if (!authCtx.isAuthenticated) {
				goto('/login');
			}
		});
	},
	nonAuthenticatedOnly: async (authCtx: TAuthCtx) => {
		await authenticate(authCtx);

		$effect(() => {
			if (authCtx.isAuthenticated) {
				goto('/home');
			}
		});
	}
};

export { authService };
