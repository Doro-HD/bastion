import "dotenv/config"
import type { Context } from "hono"
import { env as honoEnv } from "hono/adapter"

type TENV = "DB_URL";

const env = {
	get<T extends Context>(c: T, key: TENV) {
		const env = honoEnv(c);

		return env[key];
	}
}

export default env;
