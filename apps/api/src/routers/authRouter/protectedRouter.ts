import { Hono } from 'hono';
import z from 'zod/v4';

import { createValidator } from '@/middleware/validator';

const authTokenSchema = z.object({
	'auth-token': z.string()
});
const validateValidator = createValidator('cookie', authTokenSchema, 401);

const protectedRouter = new Hono().get('/validate', validateValidator, (c) => {
	const { 'auth-token': authToken } = c.req.valid('cookie');
	return c.text('Not implemented', 500);
});

export default protectedRouter;
