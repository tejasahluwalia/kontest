import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Navbar from "../components/marketing/Navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const Signup: NextPage = () => {
	const { data: sessionData } = useSession();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Kontest</title>
				<meta
					name="description"
					content="A platform for hosting submission based events"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<section className="bg-gray-50">
				<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-lg mx-auto text-center">
						<h1 className="text-2xl font-bold sm:text-3xl">
							Get started today!
						</h1>
					</div>
					<ul className="flex max-w-lg mx-auto my-4 justify-center">
						<li>
							<button
								type="button"
								onClick={() => signIn("google", { callbackUrl: "/admin" })}
								className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
							>
								<svg
									width="20"
									height="20"
									fill="currentColor"
									className="mr-2"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
								</svg>
								Continue with Google
							</button>
						</li>
					</ul>
				</div>
			</section>
		</>
	);
};

export default Signup;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	if (session && session.user) {
		const admin = await prisma?.admin.findUnique({
			where: {
				userId: session.user.id,
			},
			include: {
				organisations: true,
				contests: true,
			},
		});

		if (!admin) {
			return {
				props: {},
				redirect: {
					destination: "/admin/new",
				},
			};
		} else {
			return {
				props: {
					admin,
				},
				redirect: {
					destination: "/admin",
				},
			};
		}
	}
	return {
		props: {},
	};
};
