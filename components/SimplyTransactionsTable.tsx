"use client";

import { useEffect, useState } from "react";
import SimplyTransactionItem from "./SimplyTransactionItem";
import Link from "next/link";
import { useEthers } from "../hooks/useEthers";
import { Block } from "ethers";
import { differenceBetweenDates } from "@/utils";
import { TransactionResponse } from "ethers";

export default function SimplyTransactionTable() {
	const { getLastBlock } = useEthers();
	const [lastBlock, setLastBlock] = useState<Block | null>({} as Block);
	const [transations, setTransactions] = useState<TransactionResponse[]>([]);

	const getData = async () => {
		const tmpLastBlock = await getLastBlock();
		setLastBlock(tmpLastBlock);
		setTransactions(tmpLastBlock?.prefetchedTransactions || []);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="bg-orange-300 p-10">
				<p>Simply Transaction Table</p>
				<ul>
					{transations.slice(0, 6).map((transaction) => (
						<SimplyTransactionItem
							key={transaction.hash}
							transaction={transaction}
							existence={differenceBetweenDates(
								lastBlock?.date || new Date(),
								new Date(),
							)}
						/>
					))}
				</ul>
				<Link href={"/tx"}>All Transactions</Link>
			</div>
		</>
	);
}
