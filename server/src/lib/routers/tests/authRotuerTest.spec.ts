import { testClient } from 'hono/testing'
import { describe, test, expect } from 'vitest' // Or your preferred test runner


import { authRouter } from "../authRouter";
import { faker } from '@faker-js/faker';

describe('authRouter', async () => {
  const client = testClient(authRouter);

  test('Should sign up a user', async () => {
    const res = await client['sign-up'].$post({ form: { username: faker.internet.username(), password: faker.internet.password() } })

    expect(res.status).toBe(200);
    expect(res.headers).toBe([]);
    expect(await res.json()).toEqual({
      data: 'success',
    });
  })
})