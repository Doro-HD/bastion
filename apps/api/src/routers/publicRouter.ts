import { Hono } from 'hono';
import { IENV } from './index';
import { routers as authRouters } from './authRouter';

const publicRouter = new Hono<IENV>().route(authRouters.path, authRouters.publicrouter);

export default publicRouter;
