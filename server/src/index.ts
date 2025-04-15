import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { authRouter, protectedRouter } from '@/routers';

const app = new Hono();
app.use(
	cors({
		origin: '*',
		credentials: true
	})
);

app.route('/auth', authRouter);
app.route('/', protectedRouter);

export default app;
