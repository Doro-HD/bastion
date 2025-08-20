import { Hono } from 'hono';
import { okResponse } from '@/routers/types';
const protectedRouter = new Hono().get('/validate', async (c) => {
    const user = c.get('user');
    const okRes = okResponse(200, user);
    return c.json(okRes.data, okRes.status);
});
export default protectedRouter;
