"use client";

import SimplyBlockItem from "./SimplyBlockItem";
import { useEthers } from "@/hooks/useEthers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Block } from "ethers";
import { Skeleton } from "@mui/material";
import { arrayOfSize } from "@/utils";

export default function SimplyBlockTable() {
	const { getPaginatedBlocks, lastBlock } = useEthers();
	const [blocks, setBlocks] = useState<(Block | null)[]>([]);

	const getBlocks = async () => {
		const tmpBlocks = await getPaginatedBlocks(lastBlock, 5, 1)!;

		setBlocks(tmpBlocks);
	};

	useEffect(() => {
		getBlocks();
	}, [lastBlock]);

	return (
		<div className="flex flex-col bg-eth-colors-blackAlpha-500 rounded-lg">
			<header className="w-full p-3">
				<p className="text-lg">Latest Blocks</p>
			</header>
			<main className="grow-1 flex flex-col justify-between">
				{blocks.length === 0 && (
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
				{blocks.map((block) => (
					<SimplyBlockItem
						key={block?.hash}
						block={block}
					/>
				))}
			</main>
			<footer className="w-full p-3 bg-eth-colors-whiteAlpha-50 hover:text-eth-colors-orange-500 cursor-pointer border-t border-eth-colors-whiteAlpha-300">
				<Link
					className="text-lg block w-full text-center"
					href="/blocks">
					All blocks
				</Link>
			</footer>
		</div>
	);
}
