import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

const Signup: NextPage = () => {
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
			<section className="container mx-auto px-4">
				<h1 className="font-extrabold text-center text-7xl">Signup</h1>
				<ul>
					<li>
						<Link href="/admin/new">Signed Up</Link>
					</li>
				</ul>
			</section>
		</>
	);
};

export default Signup;
