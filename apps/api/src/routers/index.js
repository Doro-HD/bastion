import { Hono } from 'hono';
import { cors } from 'hono/cors';
import publicRouter from './publicRouter';
import protectedRouter from './protectedRouter';
const app = new Hono()
    .use(async (c, next) => {
    const corsMiddleware = cors({
        origin: c.env.CORS_ORIGIN,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
        credentials: true
    });
    return corsMiddleware(c, next);
})
    .route('/', publicRouter)
    .route('/', protectedRouter);
export default app;
