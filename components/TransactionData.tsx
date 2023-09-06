"use client";

import { useEthers } from "@/hooks/useEthers";
import { Block } from "ethers";
import { TransactionReceipt } from "ethers";
import { TransactionResponse, formatEther, formatUnits } from "ethers";
import { useEffect, useState } from "react";
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

	useEffect(() => {
		getTransactionData();
	}, []);

	return (
		<>
			<p>Transaction Data</p>
			<p>Transaction hash: {transaction?.hash}</p>
			{/* <p>Status: {transactionReceipt?.status || 0}</p> */}
			<p>
				Block: {transaction?.blockNumber} ({confirmations}{" "}
				confirmations)
			</p>
			<p>
				TimeStamp:{" "}
				{block?.date
					? differenceBetweenDates(new Date(), block?.date)
					: "-"}{" "}
				<span>
					({block?.date ? formatDateToCustomString(block?.date) : "-"}
					)
				</span>
			</p>
			<p>From: {transaction?.from}</p>
			<p>To: {transaction?.to}</p>
			<p>Value: {formatEther(transaction?.value || BigInt(0))} ETH</p>
			<p>
				Transaction Fee:{" "}
				{formatUnits(transactionReceipt?.fee || BigInt(0))} ETH
			</p>
			<p>
				Gas Price:{" "}
				{formatUnits(transaction?.gasPrice || BigInt(0), "gwei")} Gwei
			</p>

			<p>
				Gas Limit & Usage by Txn:{" "}
				{formatUnits(transaction?.gasLimit || BigInt(0), "gwei")} y
			</p>
			<p>Txn Type: {transaction?.type}</p>
			<p>Nonces: {transaction?.nonce}</p>
			<p>Position in Block: {transaction?.index || 0}</p>
		</>
	);
}
