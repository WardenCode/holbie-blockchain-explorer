"use client";

import { useEffect, useState } from "react";
import SimplyTransactionItem from "./SimplyTransactionItem";
import Link from "next/link";
import { useEthers } from "../hooks/useEthers";
import { Block } from "ethers";
import { arrayOfSize, differenceBetweenDates } from "@/utils";
import { TransactionResponse } from "ethers";
import { Skeleton } from "@mui/material";

export default function SimplyTransactionTable() {
	const { getLastBlock } = useEthers();
	const [lastBlock, setLastBlock] = useState<Block | null>({} as Block);
	const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

	const getData = async () => {
		const tmpLastBlock = await getLastBlock();
		setLastBlock(tmpLastBlock);
		setTransactions(tmpLastBlock?.prefetchedTransactions || []);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex flex-col bg-eth-colors-blackAlpha-500 rounded-lg">
			<header className="w-full p-3">
				<p className="text-lg">Latest Transactions</p>
			</header>
			<main className="grow-1 flex flex-col justify-between">
				{transactions.length === 0 && (
					<>
						{arrayOfSize(6).map((_element, index) => (
							<Skeleton
								animation={false}
								key={index}
								sx={{
									bgcolor: "rgba(255, 255, 255, 0.1)",
									width: "92%",
									margin: "0 auto",
									height: "96px",
								}}
							/>
						))}
					</>
				)}
				{transactions.slice(0, 6).map((transaction) => (
					<SimplyTransactionItem
						key={transaction.hash}
						transaction={transaction}
						existence={differenceBetweenDates(
							lastBlock?.date || new Date(),
							new Date(),
						)}
					/>
				))}
			</main>
			<footer className="w-full p-3 bg-eth-colors-whiteAlpha-50 hover:text-eth-colors-orange-500 cursor-pointer border-t border-eth-colors-whiteAlpha-300">
				<Link
					className="text-lg block w-full text-center"
					href={"/tx"}>
					All Transactions
				</Link>
			</footer>
		</div>
	);
}
