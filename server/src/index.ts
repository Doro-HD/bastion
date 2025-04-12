import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { authRouter } from '@/routers/authRouter';

const app = new Hono();
app.use('*', cors({
    origin: '*',
    credentials: true
}));

app.route('/auth', authRouter);

export default app;
