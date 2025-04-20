import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';

import { auth } from '@/index';
import decksRouter from './decksRouter';
import cardsRouter from './cardsRouer';

type Variables = {
	userId: string;
};

const protectedRouter = new Hono<{ Variables: Variables }>()
	.use(async (c, next) => {
		const sessionToken = getCookie(c, auth.sessionCookieName);
		if (!sessionToken) {
			return c.json({ data: 'Unauthorized' }, 401);
		}

		const session = await auth.validateSessionToken(sessionToken);
		if (!session.session) {
			return c.json({ data: 'Unauthorized' }, 401);
		}

		c.set('userId', session.session.userId);

		await next();
	})
	.route('/decks', decksRouter)
	.route('/cards', cardsRouter);

export default protectedRouter;
export { type Variables };
