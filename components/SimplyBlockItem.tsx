import { differenceBetweenDates } from "@/utils";
import { Block } from "ethers";
import Link from "next/link";
import { formatAddress } from "../utils/index";

interface SimplyBlockItemProps {
	block: Block | null;
}

export default function SimplyBlockItem({ block }: SimplyBlockItemProps) {
	const now = new Date();
	const { number, miner, length, date } = block as Block;

	return (
		<div className="flex items-center w-full border-t border-eth-colors-whiteAlpha-300 p-5">
			<div className="flex flex-col gap-1 w-5/12">
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/blocks/${number}`}>
					{number}
				</Link>
				<p>{differenceBetweenDates(now, date || new Date())}</p>
			</div>
			<div className="flex flex-col gap-1 w-7/12">
				<p>
					Fee recipient:{" "}
					<Link
						className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
						href={`/address/${miner}`}>
						{formatAddress(miner)}
					</Link>
				</p>
				<p>{length} transactions</p>
			</div>
		</div>
	);
}
