import Link from "next/link";
import Image from "next/image";
// import WalletButton from "./WalletButton";

interface Page {
	label: string;
	path: string;
}

const pages: Page[] = [
	{ label: "Dashboard", path: "/" },
	{ label: "Blocks", path: "/blocks" },
	{ label: "Transactions", path: "/tx" },
];

export default function Header() {
	return (
		<header className="backdrop-blur bg-slate-900/75 w-full flex justify-between px-6 h-16">
			<div className="relative w-48">
				<Image
					alt="app-logo"
					src="/headerLogo.png"
					style={{ minWidth: "192px" }}
					sizes="100%"
					fill
					priority
				/>
			</div>
			<div className="flex items-center justify-between gap-8">
				<nav className="h-full flex justify-between">
					<ul className="flex h-full">
						{pages.map(({ path, label }: Page) => (
							<li
								key={label}
								className="h-full flex hover:bg-slate-800/75">
								<Link
									className="h-full px-5 flex items-center"
									href={path}>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				{/* <WalletButton /> */}
			</div>
		</header>
	);
}
