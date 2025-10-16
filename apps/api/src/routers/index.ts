import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import {
	createAuth,
	type TAuth,
	type TSession,
	type TUser,
} from "$lib/auth.js";
import { createDB } from "$db/index.js";
import authRouter from "./authRouter.js";

interface IEnv {
	Bindings: {
		CORS_ORIGIN: string;
	};
	Variables: {
		auth: TAuth;
		authData?: {
			session?: TSession;
			user?: TUser;
		};
	};
}

function createRouter<TEnv extends IEnv = IEnv>() {
	return new Hono<TEnv>({
		strict: false,
	});
}

type TContext<TEnv extends IEnv = IEnv> = Context<TEnv>;

const app = createRouter()
	.use(
		"*", async (c, next) => {
			const corsHandler = cors({
				origin: "http://localhost:5173",
				allowHeaders: ["Content-Type", "Authorization"],
				allowMethods: ["GET", "POST", "OPTIONS"],
				exposeHeaders: ["Content-Length"],
				maxAge: 600,
				credentials: true,
			});

			return corsHandler(c, next);
		}
	)
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
	})
	.route("/", authRouter);

export default app;
export { createRouter, type IEnv, type TContext };
