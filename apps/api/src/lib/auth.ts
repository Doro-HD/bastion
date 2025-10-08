import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins/passkey"
import { username } from "better-auth/plugins/username"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import connectDB from "$db/index.js";

function createAuth(dbUrl: string) {
	const db = connectDB(dbUrl);

	return betterAuth({
		plugins: [username(), passkey()],
		database: drizzleAdapter(db, {
			provider: "pg",
		}),
	});
}

export default createAuth;
