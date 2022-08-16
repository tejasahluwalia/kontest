import { Admin, Contest, OrganisationAdmin } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/app/Navbar";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

const Admin: NextPage = (props: {
	admin?:
		| (Admin & {
				contests: Contest[];
				organisations: OrganisationAdmin[];
		  })
		| null
		| undefined;
}) => {
	const { data: sessionData } = useSession();
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
			<Navbar name={sessionData?.user?.name} />
			<section className="bg-gray-50 py-8">
				{props.admin && (
					<div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-8 items-center">
						{props.admin.contests?.map((contest) => {
							return (
								<div
									className="shadow-xl bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl block p-1"
									key={contest.id}
								>
									<div className="bg-white p-6 rounded-xl sm:pr-8">
										<div className="flex w-full items-center justify-between">
											<h2 className="text-2xl font-bold text-gray-900">
												{contest.name}
											</h2>
											<a className="text-gray-800 hover:text-gray-600 cursor-pointer">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-8 w-8"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											</a>
										</div>
									</div>
								</div>
							);
						})}
						<Link href="/admin/contest/new" passHref>
							<a className="flex px-5 py-3 rounded-lg border-[2px] border-teal-400 active:text-opacity-75 focus:outline-none focus:ring items-center gap-2 hover:border-teal-500 hover:bg-teal-50 text-teal-900 transition">
								Create a new project
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</Link>
					</div>
				)}
			</section>
		</>
	);
};

export default Admin;

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
				contests: true,
				organisations: true,
			},
		});

		if (!admin) {
			const admin = await prisma?.admin.create({
				data: {
					userId: session.user.id,
				},
				include: {
					contests: true,
					organisations: true,
				},
			});
			return {
				props: {
					admin,
				},
			};
		} else {
			return {
				props: {
					admin,
				},
			};
		}
	}
	return {
		props: {},
		redirect: {
			destination: "/",
		},
	};
};
