import { Hono } from 'hono';
import { cors } from 'hono/cors';

import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';

interface IENV {
	Bindings: {
		PROD: boolean;
		DB_URL: string;
		DB_AUTH_TOKEN: string;
		SESSIONS: KVNamespace;
		CORS_ORIGIN: string;
	};
}

const app = new Hono<IENV>()
	.use(async (c, next) => {
		const corsMiddleware = cors({
			origin: c.env.CORS_ORIGIN,
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowHeaders: ['Content-Type'],
			credentials: true
		});

		return corsMiddleware(c, next);
	})
	.route('/', publicRouter)
	.route('/', protectedRouter);

export default app;
export { IENV };
