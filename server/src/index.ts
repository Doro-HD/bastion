//import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { authRouter } from '@/routers/authRouter';

const app = new Hono();

app.get('/', (c) => {
	return c.json({ data: 'Hello World!'});
})

app.route('/auth', authRouter);

/*
serve(
	{
		fetch: app.fetch,
		port: 3000
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
*/

export default app;