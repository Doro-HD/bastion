import { Hono } from 'hono';
import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';

interface IENV {
	Bindings: {
		DB_URL: string;
		DB_AUTH_TOKEN: string;
	};
}

const app = new Hono<IENV>().route('/', publicRouter).route('/', protectedRouter);

export default app;
export { IENV };
