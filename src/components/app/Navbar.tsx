import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

type NavbarProps = {
	name?: string | null;
};

const Navbar: React.FC<NavbarProps> = (props) => {
	const { data: sessionData } = useSession();

	return (
		<header>
			<div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
				<div className="sm:justify-between sm:items-center sm:flex">
					<div className="text-center sm:text-left">
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							{props.name ? `Welcome Back, ${props.name}!` : "Welcome Back!"}
						</h1>

						<p className="mt-1.5 text-sm text-gray-500">
							Let's get started! 🎉
						</p>
					</div>

					<div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
						<button
							className="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition border border-gray-200 rounded-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring"
							type="button"
						>
							<span className="text-sm font-medium"> Documentation </span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-4 h-4 ml-1.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</button>
						<button
							className="inline-flex items-center justify-center px-5 py-3 text-red-500 transition border border-red-200 rounded-lg hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring ring-red-300"
							type="button"
							onClick={() => signOut()}
						>
							<span className="text-sm font-medium"> Logout </span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-4 h-4 ml-1.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
