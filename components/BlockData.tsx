"use client";

import { useEthers } from "@/hooks/useEthers";
import { Block, formatEther, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { differenceBetweenDates, formatDateToCustomString } from "@/utils";
import { useRouter } from "next/navigation";

interface BlockDataProps {
	blockNumber: number;
}

export default function BlockData({ blockNumber }: BlockDataProps) {
	const [data, setData] = useState<Block | null>({} as Block);
	const [lastBlock, setLastBlock] = useState(0);
	const { getBlock, provider } = useEthers();
	const router = useRouter();

	const handleNextBlock = () => {
		if (blockNumber + 1 < lastBlock)
			router.push(`/blocks/${blockNumber + 1}`);
	};
	const handlePrevBlock = () => {
		if (blockNumber - 1 > 0) router.push(`/blocks/${blockNumber - 1}`);
	};

	useEffect(() => {
		const getData = async () => {
			const block = await getBlock(blockNumber);
			setData(block);
			const lastBlock = await provider.getBlockNumber();
			setLastBlock(lastBlock);
		};

		getData();
	}, []);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Block Height:
					</span>
					<span className="inline-block w-8/12">
						{data?.number}
						<span className="ml-4 inline-flex gap-3">
							<Button
								onClick={handlePrevBlock}
								disabled={blockNumber - 1 === 0}
								className="bg-eth-colors-gray-700"
								sx={{
									color: "white",
									"&.Mui-disabled": {
										color: "rgba(255, 255, 255, 0.4)",
									},
								}}>
								{"<"}
							</Button>
							<Button
								onClick={handleNextBlock}
								disabled={blockNumber + 1 > lastBlock}
								className="bg-eth-colors-gray-700"
								sx={{
									color: "white",
									"&.Mui-disabled": {
										color: "rgba(255, 255, 255, 0.4)",
									},
								}}>
								{">"}
							</Button>
						</span>
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Timestamp:
					</span>
					<span className="inline-block w-8/12">
						{differenceBetweenDates(
							new Date(),
							data?.date || new Date(),
						)}{" "}
						<span>
							(
							{data?.date
								? formatDateToCustomString(data.date)
								: "-"}
							)
						</span>
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Transactions:
					</span>
					<span className="inline-block w-8/12">{data?.length}</span>
				</div>
			</div>

			<hr className="text-eth-colors-gray-500" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Fee Recipient:
					</span>
					<span className="inline-block w-8/12">
						<Link
							className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
							href={`/address/${data?.miner}`}>
							{data?.miner}
						</Link>
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Total Difficulty:
					</span>
					<span className="inline-block w-8/12">
						{data?.difficulty?.toLocaleString("en-GB") || 0}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Gas Used:
					</span>
					<span className="inline-block w-8/12">
						{data?.gasUsed?.toLocaleString("en-GB") || 0}
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Gas Limit:
					</span>
					<span className="inline-block w-8/12">
						{data?.gasLimit?.toLocaleString("en-GB") || 0}
					</span>
				</div>
			</div>
			<hr className="text-eth-colors-gray-500" />
			<div className="flex flex-col gap-2">
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Hash:
					</span>
					<span className="inline-block w-8/12">{data?.hash}</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						ParentHash:
					</span>
					<span className="inline-block w-8/12">
						<Link
							className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
							href={`/address/${data?.parentHash}`}>
							{data?.parentHash}
						</Link>
					</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Nonce:
					</span>
					<span className="inline-block w-8/12">{data?.nonce}</span>
				</div>
				<div>
					<span className="inline-block w-4/12 text-eth-colors-gray-400">
						Base Fee Per Gas:
					</span>
					<span className="inline-block w-8/12">
						{formatEther(data?.baseFeePerGas || BigInt(0))} ETH{" "}
						<span className="text-eth-colors-gray-400">
							(
							{formatUnits(
								data?.baseFeePerGas || BigInt(0),
								"gwei",
							)}{" "}
							Gwei)
						</span>
					</span>
				</div>
			</div>
		</div>
	);
}
