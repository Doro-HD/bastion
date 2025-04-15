import { Hono } from 'hono';
import decksRouter from './decksRouter';
import { getCookie } from 'hono/cookie';
import { auth } from '@/index';

type Variables = {
	userId: string;
};

const protectedRouter = new Hono<{ Variables: Variables }>();

protectedRouter.use(async (c, next) => {
	const sessionToken = getCookie(c, auth.sessionCookieName);
	if (!sessionToken) {
		return c.json({ data: 'Unauthorized' }, 401);
	}

	const session = await auth.validateSessionToken(sessionToken);
	if (!session.session) {
		return c.json({ data: 'Unauthorized' }, 401);
	}

	c.set('userId', session.session.userId);

	next();
});

protectedRouter.route('/decks', decksRouter);

export default protectedRouter;
export { type Variables };
