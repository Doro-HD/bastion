import { createRouter } from "./index.js";

const router = createRouter()
	// mounting the better-auth handler
	.on(["GET", "POST"], "/auth/*", (c) => {
		const auth = c.get("auth");

		return auth.handler(c.req.raw);
	});

export default router;
