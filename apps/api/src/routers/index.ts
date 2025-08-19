import { Hono } from 'hono';
import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';

interface IENV {
	Bindings: {
		PROD: boolean;
		DB_URL: string;
		DB_AUTH_TOKEN: string;
		SESSIONS: KVNamespace;
	};
}

const app = new Hono<IENV>().route('/', publicRouter).route('/', protectedRouter);

export default app;
export { IENV };
