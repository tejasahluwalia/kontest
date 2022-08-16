// src/server/trpc/router/index.ts
import { t } from "../utils";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { contestRouter } from "./contest";

export const appRouter = t.router({
	admin: adminRouter,
	auth: authRouter,
	contest: contestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
