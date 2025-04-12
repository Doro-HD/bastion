//import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { authRouter } from '@/routers/authRouter';

const app = new Hono();

app.route('/auth', authRouter);

export default app;
