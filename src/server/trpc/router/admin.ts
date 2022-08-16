import { t, authedProcedure } from "../utils";
import { z } from "zod";

export const adminRouter = t.router({
	createAdmin: authedProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			// Create admin
			const admin = await ctx.prisma.admin.create({
				data: {
					userId: input.userId,
				},
			});
			return admin;
		}),
	getAdmin: authedProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			// Get admin
			const admin = await ctx.prisma.admin.findFirst({
				where: {
					userId: input.userId,
				},
			});
			return admin;
		}),
});
