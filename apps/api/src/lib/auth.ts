import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins/passkey";
import { username } from "better-auth/plugins/username";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { type TDB } from "$db/index.js";

function createAuth(
  betterAuthURL: string,
  betterAuthSecret: string,
  trustedOrigin: string,
  db: TDB,
) {
  return betterAuth({
    baseURL: betterAuthURL,
    secret: betterAuthSecret,
    trustedOrigins: [trustedOrigin],
    emailAndPassword: {
      enabled: true,
    },
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    plugins: [username(), passkey()],
  });
}

type TAuth = ReturnType<typeof createAuth>;

type TSessionData = TAuth["$Infer"]["Session"];
type TSession = TSessionData["session"];
type TUser = TSessionData["user"];

export { createAuth, type TAuth, type TSession, type TUser };
