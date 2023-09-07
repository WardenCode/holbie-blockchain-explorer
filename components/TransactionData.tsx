"use client";

import { useEthers } from "@/hooks/useEthers";
import { Block } from "ethers";
import { TransactionReceipt } from "ethers";
import { TransactionResponse, formatEther, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	differenceBetweenDates,
	formatDateToCustomString,
} from "../utils/index";

interface TransactionDataProps {
	hash: string;
}

export default function TransactionData({ hash }: TransactionDataProps) {
	const { provider } = useEthers();
	const [transaction, setTransaction] = useState<TransactionResponse | null>(
		null,
	);
	const [block, setBlock] = useState<Block | null>(null);
	const [transactionReceipt, setTransactionReceipt] =
		useState<TransactionReceipt | null>(null);

	const [confirmations, setConfirmations] = useState<number>(0);

	const { getTransaction, getTransactionReceipt } = useEthers();

	const getTransactionData = async () => {
		const tmpTransaction = await getTransaction(hash);
		setTransaction(tmpTransaction);

		const tmpTransactionReceipt = await getTransactionReceipt(hash);
		setTransactionReceipt(tmpTransactionReceipt);

		const tmpConfirmations = await tmpTransaction?.confirmations();
		setConfirmations(tmpConfirmations || 0);

		if (tmpTransaction?.blockNumber) {
			const tmpBlock = await provider.getBlock(
				tmpTransaction?.blockNumber,
			);
			setBlock(tmpBlock);
		}
	};

	const checkStatus = (status: number) => {
		return status ? "Success" : "Failed";
	};

	useEffect(() => {
		getTransactionData();
	}, []);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Transaction hash:
					</span>
					<span className="inline-block w-8/12">
						{transaction?.hash}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Status:
					</span>
					<span className="inline-block w-8/12">
						{checkStatus(transactionReceipt?.status || 0)}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Block:
					</span>
					<span className="inline-block w-8/12">
						<Link
							className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
							href={`/blocks/${transaction?.blockNumber}`}>
							{transaction?.blockNumber}
						</Link>{" "}
						({confirmations} confirmations)
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						TimeStamp:
					</span>
					<span className="inline-block w-8/12">
						{block?.date
							? differenceBetweenDates(new Date(), block?.date)
							: "-"}{" "}
						<span>
							(
							{block?.date
								? formatDateToCustomString(block?.date)
								: "-"}
							)
						</span>
					</span>
				</div>
			</div>
			<hr className="text-eth-colors-gray-500" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						From:
					</span>

					<span className="inline-block w-8/12">
						<Link
							className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
							href={`/address/${transaction?.from}`}>
							{transaction?.from}
						</Link>
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						To:
					</span>
					<span className="inline-block w-8/12">
						<Link
							className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
							href={`/address/${transaction?.to}`}>
							{transaction?.to}
						</Link>
					</span>
				</div>
			</div>
			<hr className="text-eth-colors-gray-500" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Value:
					</span>
					<span className="inline-block w-8/12">
						{formatEther(transaction?.value || BigInt(0))} ETH
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Transaction Fee:
					</span>
					<span className="inline-block w-8/12">
						{formatUnits(transactionReceipt?.fee || BigInt(0))} ETH
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Gas Price:
					</span>
					<span className="inline-block w-8/12">
						{formatUnits(
							transaction?.gasPrice || BigInt(0),
							"gwei",
						)}{" "}
						Gwei
					</span>
				</div>
			</div>
			<hr className="text-eth-colors-gray-500" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Txn Type:
					</span>
					<span className="inline-block w-8/12">
						{transaction?.type}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Nonces:
					</span>
					<span className="inline-block w-8/12">
						{transaction?.nonce}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Position in Block:
					</span>
					<span className="inline-block w-8/12">
						{transaction?.index || "-"}
					</span>
				</div>
			</div>
		</div>
	);
}
