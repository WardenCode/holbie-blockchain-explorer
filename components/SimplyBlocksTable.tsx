"use client";

import SimplyBlockItem from "./SimplyBlockItem";
import { useEthers } from "@/hooks/useEthers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Block } from "ethers";
import { Skeleton } from "@mui/material";

export default function SimplyBlockTable() {
	const { getPaginatedBlocks, lastBlock } = useEthers();
	const [blocks, setBlocks] = useState<(Block | null)[]>([]);

	const getBlocks = async () => {
		const tmpBlocks = await getPaginatedBlocks(lastBlock, 6, 1)!;

		setBlocks(tmpBlocks);
	};

	useEffect(() => {
		getBlocks();
	}, [lastBlock]);

	return (
		<>
			<div className="bg-slate-400 p-10">
				<p>Simply Block Table</p>
				<ul>
					{blocks.length === 0 && (
						<Skeleton className="w-full h-20" />
					)}
					{blocks.map((block) => (
						<SimplyBlockItem
							key={block?.hash}
							block={block}
						/>
					))}
				</ul>
				<hr />
				<Link href="/blocks">All blocks</Link>
			</div>
		</>
	);
}
