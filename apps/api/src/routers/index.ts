import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import {
  createAuth,
  type TAuth,
  type TSession,
  type TUser,
} from "$lib/auth.js";
import { createDB } from "$db/index.js";

interface IEnv {
  Variables: {
    auth: TAuth;
    authData?: {
      session?: TSession;
      user?: TUser;
    };
  };
}

type TContext<TEnv extends IEnv = IEnv> = Context<TEnv>;

const app = new Hono<IEnv>()
  .use(
    "*",
    cors({
      origin: "http://localhost:3000", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  // mounting the better-auth handler
  .on(["POST", "GET"], "/api/auth/*", (c) => {
    const auth = c.get("auth");

    return auth.handler(c.req.raw);
  })
  // set auth instance
  .use(async (c, next) => {
    const db = createDB(c);
    const auth = createAuth(db);

    c.set("auth", auth);
    await next();
  })
  // set auth data
  .use(async (c, next) => {
    const auth = c.get("auth");
    const sessionData = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (sessionData) {
      const { session, user } = sessionData;

      c.set("authData", { session, user });
    }
    await next();
  });

export default app;
export { type IEnv, type TContext };
