import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EthersContextProvider } from "../hooks/useEthers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Holbie Blockchain Explorer",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<EthersContextProvider>
					<Header />
					{children}
					<Footer />
				</EthersContextProvider>
			</body>
		</html>
	);
}
