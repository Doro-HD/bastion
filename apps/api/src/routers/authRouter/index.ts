import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';
import UserHandler from '$/db/users/handler';
import { IENV } from '$/routers/index';
import { createMiddleware } from 'hono/factory';
import SessionHandler from '$/db/sessions/handler';

interface IAuthENV extends IENV {
	Variables: {
		userHandler: UserHandler;
		sessionHandler: SessionHandler;
	};
}

const injectUserHandler = createMiddleware<IAuthENV>(async (c, next) => {
	const userHandler = new UserHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
	c.set('userHandler', userHandler);

	await next();
});

const injectSessionHandler = createMiddleware<IAuthENV>(async (c, next) => {
	const userHandler = new SessionHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
	c.set('sessionHandler', userHandler);

	await next();
});

const routers = {
	path: '/auth' as const,
	publicRouter,
	protectedRouter
};

export { IAuthENV, routers, injectUserHandler, injectSessionHandler };
