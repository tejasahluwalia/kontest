import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../../components/app/Navbar";
import { trpc } from "../../../utils/trpc";
import { slugify } from "../../../utils/slugify";

const NewApp: NextPage = () => {
	const router = useRouter();
	const { data: sessionData } = useSession();
	const createContestMutation = trpc.proxy.contest.createContest.useMutation({
		onSuccess: (data, variables, context) => {
			router.push(`/admin/contest/${variables.contestSlug}`);
		},
	});
	const [contestName, setContestName] = useState("");
	const [contestSlug, setContestSlug] = useState("");

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
				<div className="container mx-auto px-4">
					<h1 className="font-bold text-center text-2xl">New App</h1>
					<form
						className="flex flex-col py-8 gap-4 justify-center items-center w-72 mx-auto"
						onSubmit={(e) => {
							e.preventDefault();
							createContestMutation.mutate({
								contestName,
								contestSlug,
							});
						}}
					>
						<label
							className="relative block p-3 border-2 border-gray-200 rounded-lg w-full bg-white"
							htmlFor="name"
						>
							<span className="text-xs font-medium text-gray-500">
								Contest Name
							</span>

							<input
								className="w-full p-0 text-sm border-none focus:ring-0"
								id="contestName"
								value={contestName}
								onChange={(e) => {
									setContestName(e.target.value);
									setContestSlug(slugify(e.target.value));
								}}
								type="text"
								placeholder="John Doe"
							/>
						</label>
						<label
							className="relative block p-3 border-2 border-gray-200 rounded-lg w-full bg-white"
							htmlFor="name"
						>
							<span className="text-xs font-medium text-gray-500">
								Contest Slug
							</span>

							<input
								className="w-full p-0 text-sm border-none focus:ring-0"
								id="contestSlug"
								value={contestSlug}
								onChange={(e) => setContestSlug(e.target.value)}
								type="text"
								placeholder="John Doe"
							/>
						</label>
						<button
							type="submit"
							className="inline-block p-[2px] rounded-lg bg-gradient-to-r from-teal-500  to-cyan-500 active:text-opacity-75 focus:outline-none focus:ring w-full"
						>
							<span className="flex gap-4 justify-center hover:text-white items-center px-5 py-3 font-medium bg-white rounded-lg hover:bg-transparent transition">
								Continue
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						</button>
						{createContestMutation.error && (
							<div className="text-red-500 text-sm">
								{createContestMutation.error.message}
							</div>
						)}
					</form>
				</div>
			</section>
		</>
	);
};

export default NewApp;
