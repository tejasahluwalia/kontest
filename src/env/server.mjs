// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

const _serverEnv = serverSchema.safeParse({
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	DATABASE_URL: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
});

if (!_serverEnv.success) {
	console.error(
		"❌ Invalid environment variables:\n",
		...formatErrors(_serverEnv.error.format())
	);
	throw new Error("Invalid environment variables");
}

/**
 * Validate that server-side environment variables are not exposed to the client.
 */
for (let key of Object.keys(_serverEnv.data)) {
	if (key.startsWith("NEXT_PUBLIC_")) {
		console.warn("❌ You are exposing a server-side env-variable:", key);

		throw new Error("You are exposing a server-side env-variable");
	}
}

export const env = { ..._serverEnv.data, ...clientEnv };
