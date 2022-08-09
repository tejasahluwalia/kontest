import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

const Contest: NextPage = () => {
	const router = useRouter();
	const { contest } = router.query;
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
					Enter Contest: {contest}
				</h1>
			</section>
		</>
	);
};

export default Contest;
