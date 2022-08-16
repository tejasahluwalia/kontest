export default function Navbar() {
	return (
		<header className="bg-white">
			<div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-1 md:flex md:items-center md:gap-12">
						<a className="block text-teal-600" href="/">
							<h1 className="text-3xl font-bold">Kontest</h1>
						</a>
					</div>

					<div className="md:flex md:items-center md:gap-12">
						<nav
							className="hidden md:block"
							aria-labelledby="header-navigation"
						>
							<h2 className="sr-only" id="header-navigation">
								Header navigation
							</h2>

							<ul className="flex items-center gap-6 text-sm">
								<li>
									<a
										className="text-gray-600 hover:text-gray-800 hover:underline"
										href="/"
									>
										Pricing
									</a>
								</li>
							</ul>
						</nav>

						<div className="flex items-center gap-4">
							<div className="sm:gap-4 sm:flex">
								<a
									className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow hover:bg-teal-700"
									href="/"
								>
									Login
								</a>

								<div className="hidden sm:flex">
									<a
										className="px-5 py-2.5 text-sm font-medium text-teal-600 bg-gray-100 rounded-md hover:bg-gray-200"
										href="/"
									>
										Register
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
