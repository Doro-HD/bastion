import { Hono } from 'hono';

const protectedRouter = new Hono().get('/validate', (c) => {
	return c.text('Not implemented', 500);
});

export default protectedRouter;
