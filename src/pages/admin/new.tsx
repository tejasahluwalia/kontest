import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const New: NextPage = () => {
	let organisation = "cpb";
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
						<Link href={`/admin/${organisation}`}>
							Create an organisation or Join an existing one
						</Link>
					</li>
				</ul>
			</section>
		</>
	);
};

export default New;
