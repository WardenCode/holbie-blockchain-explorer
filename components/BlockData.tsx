"use client";

import { useEthers } from "@/hooks/useEthers";
import { Block, formatEther, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { differenceBetweenDates, formatDateToCustomString } from "@/utils";

interface BlockDataProps {
	blockNumber: number;
}

export default function BlockData({ blockNumber }: BlockDataProps) {
	const [data, setData] = useState<Block | null>({} as Block);
	const { getBlock } = useEthers();

	useEffect(() => {
		const getData = async () => {
			const block = await getBlock(blockNumber);
			setData(block);
		};

		getData();
	}, []);

	return (
		<>
			<p>Block Data</p>
			<p>Block Height: {data?.number}</p>
			<Link href={`/blocks/${blockNumber - 1}`}>
				<Button>{"<"}</Button>
			</Link>
			<Link href={`/blocks/${blockNumber + 1}`}>
				<Button>{">"}</Button>
			</Link>
			<p>
				Timestamp:{" "}
				{differenceBetweenDates(new Date(), data?.date || new Date())}{" "}
				<span>
					({data?.date ? formatDateToCustomString(data.date) : "-"})
				</span>
			</p>
			<p>Transactions: {data?.length}</p>
			<p>Fee Recipient: {data?.miner}</p>
			<p>
				Total Difficulty:{" "}
				{data?.difficulty?.toLocaleString("en-GB") || 0}
			</p>
			<p>Gas Used: {data?.gasUsed?.toLocaleString("en-GB") || 0}</p>
			<p>Gas Limit: {data?.gasLimit?.toLocaleString("en-GB") || 0}</p>
			<p>Hash: {data?.hash}</p>
			<p>ParentHash: {data?.parentHash}</p>
			<p>Nonce: {data?.nonce}</p>
			<p>
				Base Fee Per Gas:{" "}
				{formatEther(data?.baseFeePerGas || BigInt(0))}{" "}
				{formatUnits(data?.baseFeePerGas || BigInt(0), "gwei")}
				Gwei
			</p>
		</>
	);
}
