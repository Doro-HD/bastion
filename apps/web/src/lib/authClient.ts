import { createAuthClient } from 'better-auth/client';
import { usernameClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
	baseURL: 'http://localhost:3000/auth',
	plugins: [usernameClient()]
});

export { authClient };
