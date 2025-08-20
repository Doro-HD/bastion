import { Hono } from 'hono';
import { routers as authRouters } from './authRouter';
const publicRouter = new Hono().route(authRouters.path, authRouters.publicRouter);
export default publicRouter;
