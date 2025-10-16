import { PUBLIC_API_URL } from '$env/static/public';
import { createAuthClient } from 'better-auth/client';
import { usernameClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
	baseURL: `${PUBLIC_API_URL}/auth`,
	plugins: [usernameClient()]
});

export { authClient };
