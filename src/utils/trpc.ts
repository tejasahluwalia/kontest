// src/utils/trpc.ts
import { setupTRPC } from "@trpc/next";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../server/trpc/router";
import superjson from "superjson";

const getBaseUrl = () => {
	if (typeof window !== "undefined") return ""; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = setupTRPC<AppRouter>({
	config({ ctx }) {
		if (typeof window !== "undefined") {
			// during client requests
			return {
				transformer: superjson, // optional - adds superjson serialization
				url: "/api/trpc",
			};
		}
		// during SSR below

		// // optional: use SSG-caching for each rendered page (see caching section for more details)
		// const ONE_DAY_SECONDS = 60 * 60 * 24;
		// ctx?.res?.setHeader(
		// 	"Cache-Control",
		// 	`s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
		// );

		// The server needs to know your app's full url
		// On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`
		const url = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}/api/trpc`
			: "http://localhost:3000/api/trpc";

		return {
			transformer: superjson, // optional - adds superjson serialization
			url,
			headers: {
				// optional - inform server that it's an ssr request
				"x-ssr": "1",
			},
		};
	},
	ssr: true,
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
	TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
	TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
	TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
	TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;
