import { expect, it } from 'vitest';
import { env } from 'cloudflare:test';
import app from './index';
it('Should have the correct cors headers', async () => {
    const origin = env.CORS_ORIGIN;
    const res = await app.request('/', {
        method: 'options',
        headers: {
            Origin: origin
        }
    }, env);
    const headers = res.headers;
    expect(headers.get('access-control-allow-origin')).toBe(origin);
    expect(headers.get('access-control-allow-methods')).toBe('GET,POST,PUT,DELETE,OPTIONS');
    expect(headers.get('access-control-allow-headers')).toBe('Content-Type');
});
