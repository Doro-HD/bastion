import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';
import UserHandler from '@/db/users/handler';
import { createMiddleware } from 'hono/factory';
import SessionHandler from '@/db/sessions/handler';
const injectUserHandler = createMiddleware(async (c, next) => {
    const userHandler = new UserHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
    c.set('userHandler', userHandler);
    await next();
});
const injectSessionHandler = createMiddleware(async (c, next) => {
    const userHandler = new SessionHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
    c.set('sessionHandler', userHandler);
    await next();
});
const routers = {
    path: '/auth',
    publicRouter,
    protectedRouter
};
export { routers, injectUserHandler, injectSessionHandler };
