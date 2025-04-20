import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { authRouter, protectedRouter } from '@/routers';
import { env } from './lib';

const app = new Hono()
	.use(
		cors({
			origin: env.ORIGIN,
			credentials: true
		})
	)
	.route('/auth', authRouter)
	.route('/', protectedRouter);

export default app;
