import { Hono } from 'hono';
import authRouter from './authRouter';

interface IENV {
	Bindings: {
		DB_URL: string;
		DB_AUTH_TOKEN: string;
	};
}

const app = new Hono<IENV>().route('/auth', authRouter);

export default app;
export { IENV };
