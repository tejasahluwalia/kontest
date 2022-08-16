import { Admin, Invite } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";
import Navbar from "../../../components/app/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";

const Organisation: NextPage = (props: {
	organisation?:
		| {
				slug: string;
				name: string;
				invites: Invite[];
				admins: Admin[];
		  }
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

			<section className="bg-gray-50 py-8 px-4">
				<h2>{props.organisation?.name}</h2>
			</section>
		</>
	);
};

export default Organisation;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	let slug = context.params?.organisation;

	if (session && session.user && slug && typeof slug === "string") {
		const organisation = await prisma?.organisation.findUnique({
			where: {
				slug: slug,
			},
			select: {
				slug: true,
				name: true,
				invites: true,
				admins: true,
			},
		});
		if (organisation) {
			return {
				props: {
					organisation,
				},
			};
		} else {
			return {
				props: {},
				redirect: {
					destination: "/admin",
				},
			};
		}
	} else {
		return {
			props: {},
			redirect: {
				destination: "/",
			},
		};
	}
};
