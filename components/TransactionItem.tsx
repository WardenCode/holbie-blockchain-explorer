"use client";

import { useEthers } from "@/hooks/useEthers";
import { formatDate } from "@/utils";
import { TableRow, TableCell } from "@mui/material";
import { formatUnits } from "ethers";
import { Block } from "ethers";
import { TransactionResponse, formatEther } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMiddleAddress, formatAddress } from "../utils/index";

interface TransactionItemProps {
	transaction: TransactionResponse;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
	const { getBlock } = useEthers();
	const [block, setBlock] = useState<Block | null>(null);

	const getData = async () => {
		if (transaction.blockNumber)
			setBlock(await getBlock(transaction.blockNumber));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<TableRow>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/tx/${transaction.hash}`}>
					{formatAddress(transaction.hash)}
				</Link>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/blocks/${transaction.blockNumber}`}>
					{transaction.blockNumber}
				</Link>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{block?.date ? formatDate(block.date) : "-"}
				</span>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/address/${transaction.from}`}>
					{formatMiddleAddress(transaction.from)}
				</Link>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/address/${transaction.to}`}>
					{transaction.to ? formatMiddleAddress(transaction.to) : "-"}
				</Link>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{formatEther(transaction.value)} ETH
				</span>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{formatUnits(transaction.gasPrice, "gwei")}
				</span>
			</TableCell>
		</TableRow>
	);
}
