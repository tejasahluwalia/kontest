import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Organisation: NextPage = () => {
	const router = useRouter();
	const { organisation } = router.query;
	const contest = "photojournalism-awards";
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
				<h1 className="font-extrabold text-center text-7xl">
					Org: {organisation}
				</h1>
				<ul>
					<li>
						<Link href={`/admin/${organisation}/${contest}`}>
							Create a contest
						</Link>
					</li>
				</ul>
			</section>
		</>
	);
};

export default Organisation;
