import { Hono } from 'hono';
import { z } from 'zod/v4';
import { result } from '@doro-hd/result';
import { errResponse } from './types';
import { routers as authRouters } from './authRouter';
import SessionHandler from '@/db/sessions/handler';
import { getCookie } from 'hono/cookie';
const authTokenSchema = z
    .object({
    authToken: z.string()
})
    .refine((value) => value.authToken.split('.').length === 2);
const protectedRouter = new Hono()
    .use(async (c, next) => {
    const authToken = getCookie(c, 'auth-token');
    const authorizationResult = authTokenSchema.safeParse({ authToken });
    if (!authorizationResult.success) {
        const errRes = errResponse(401, { reason: 'Unauthorized or invalid token' });
        return c.json(errRes.err, errRes.status);
    }
    const sessionHandler = new SessionHandler(c.env.DB_URL, c.env.DB_AUTH_TOKEN);
    const dataString = await c.env.SESSIONS.get(authorizationResult.data.authToken);
    if (dataString) {
        const data = JSON.parse(dataString);
        const sessionSecret = authorizationResult.data.authToken.split('.')[1];
        const isSessionValid = await sessionHandler.validateSession(sessionSecret, data.session.secretHash);
        if (!isSessionValid) {
            const errRes = errResponse(401, { reason: 'Invalid token' });
            return c.json(errRes.err, errRes.status);
        }
        c.set('user', data.user);
    }
    else {
        const sessionResult = await sessionHandler.findUserFromSession(authorizationResult.data.authToken);
        if (result.isErr(sessionResult)) {
            const errRes = errResponse(500, { reason: 'Database error' });
            return c.json(errRes.err, errRes.status);
        }
        if (sessionResult.data.status === 'none') {
            const errRes = errResponse(404, {
                reason: 'Could not find any user with the provided token'
            });
            return c.json(errRes.err, errRes.status);
        }
        c.set('user', sessionResult.data.data);
    }
    await next();
})
    .route(authRouters.path, authRouters.protectedRouter);
export default protectedRouter;
