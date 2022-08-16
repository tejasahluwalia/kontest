import { t, authedProcedure } from "../utils";
import { z } from "zod";

export const contestRouter = t.router({
	createContest: authedProcedure
		.input(
			z.object({
				contestName: z.string(),
				contestSlug: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const admin = await ctx.prisma.admin.findFirst({
				where: {
					userId: ctx.session.user.id,
				},
			});

			if (!admin) return new Error("Invalid account or session expired");

			const contest = await ctx.prisma.contest.findUnique({
				where: { slug: input.contestSlug },
			});
			if (contest) {
				throw new Error("contest slug already taken");
			}

			const newcontest = await ctx.prisma.contest.create({
				data: {
					name: input.contestName,
					slug: input.contestSlug,
					config: {},
					admins: {
						create: {
							adminId: admin.id,
							is_creator: true,
						},
					},
				},
			});

			return newcontest;
		}),
	deletecontest: authedProcedure
		.input(
			z.object({
				contestId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			// Delete contest
			await ctx.prisma.contest.delete({
				where: { id: input.contestId },
			});
		}),
});
