import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Navbar from "../components/marketing/Navbar";

const Home: NextPage = () => {
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
				<div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
					<div className="w-1/2">
						<h1 className="text-3xl font-extrabold sm:text-5xl">
							Everything you need to
							<strong className="font-extrabold sm:block text-teal-700 mt-4">
								<ul className="flex flex-col gap-2">
									<li>Create contests</li>
									<li>Manage grants</li>
									<li>Judge submissions</li>
								</ul>
							</strong>
						</h1>

						<p className="mt-4 sm:leading-relaxed sm:text-xl">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
							illo tenetur fuga ducimus numquam ea!
						</p>

						<div className="flex flex-wrap gap-4 mt-8">
							<Link passHref href="/signup">
								<a className="block w-full px-12 py-3 text-sm font-medium text-white bg-teal-600 rounded shadow sm:w-auto active:bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring">
									Get Started
								</a>
							</Link>

							<a
								className="block w-full px-12 py-3 text-sm font-medium text-teal-600 rounded shadow sm:w-auto hover:text-teal-700 active:text-teal-500 focus:outline-none focus:ring"
								href="/about"
							>
								Learn More
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
