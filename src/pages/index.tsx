import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

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
			<div className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto">
				<h1 className="font-extrabold text-center text-7xl">Kontest</h1>
				<p>Coming Soon</p>
				<div className="w-fit">
					<h3 className="mt-4 text-3xl">This Stack uses:-</h3>
					<ul className="self-start text-xl underline list-disc">
						<li>
							<a href="https://nextjs.org" target="_blank" rel="noreferrer">
								Next.js
							</a>
						</li>
						<li>
							<a href="https://trpc.io" target="_blank" rel="noreferrer">
								tRPC
							</a>
						</li>
						<li>
							<a
								href="https://tailwindcss.com"
								target="_blank"
								rel="noreferrer"
							>
								TailwindCSS
							</a>
						</li>
						<li>
							<a
								href="https://typescriptlang.org"
								target="_blank"
								rel="noreferrer"
							>
								TypeScript
							</a>
						</li>
					</ul>

					<div className="py-6 text-2xl">
						{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
