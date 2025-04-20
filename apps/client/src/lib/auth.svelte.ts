import { PUBLIC_API_URL } from '$env/static/public';

type TUser = {
	username: string;
};

class Auth {
	user: TUser | null = $state(null);
	isAuthorized = $derived.by(async () => {
		if (this.user) {
			return true;
		}

		const response = await fetch(`${PUBLIC_API_URL}/auth/`);
		if (response.status === 200) {
			return true;
		}

		return false;
	});

	signUp() {}

	signIn() {}

	signOut() {}
}

/* 
const auth = new Auth();

export {
    auth
};
*/
