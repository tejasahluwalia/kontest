import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../../../components/app/Navbar";
import Sidebar from "../../../../components/app/Sidebar";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const { data: sessionData } = useSession();
	const { slug } = router.query;
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
			<Sidebar />
			<section className="container mx-auto px-4">
				<h1 className="font-extrabold text-center text-7xl">
					Manage Contest: {slug}
				</h1>
			</section>
		</>
	);
};

export default Dashboard;
