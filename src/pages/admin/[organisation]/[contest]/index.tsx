import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const { organisation, contest } = router.query;
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
					Manage Contest: {contest}
				</h1>
			</section>
		</>
	);
};

export default Dashboard;
