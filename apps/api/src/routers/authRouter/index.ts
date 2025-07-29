import { Hono } from 'hono';

import publicrouter from './publicRouter';
import protectedRouter from './protectedRouter';
import UserHandler from '@/db/users/handler';
import { IENV } from '@/routers/index';

interface IAuthENV extends IENV {
	Variables: {
		userHandler: UserHandler;
	};
}

const authRouter = new Hono<IAuthENV>()
	.use(async (c, next) => {
		const userHandler = new UserHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
		c.set('userHandler', userHandler);

		await next();
	})
	.route('/', publicrouter)
	.route('/', protectedRouter);

export default authRouter;
export { IAuthENV };
