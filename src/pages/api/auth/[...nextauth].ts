import GoogleProvider from "next-auth/providers/google";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { env } from "../../../env/server.mjs";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	pages: {
		signIn: "/signup",
	},
};

export default NextAuth(authOptions);
