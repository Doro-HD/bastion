import { Hono } from "hono";
import { IENV } from "./index";
import { routers as authRouters } from "./authRouter";

interface IPublicEnv extends IENV { }

const publicRouter = new Hono<IPublicEnv>()
	.route(authRouters.path, authRouters.publicrouter)

export default publicRouter;
