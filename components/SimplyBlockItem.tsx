import { differenceBetweenDates } from "@/utils";
import { Block } from "ethers";
import Link from "next/link";

interface SimplyBlockItemProps {
	block: Block | null;
}

export default function SimplyBlockItem({ block }: SimplyBlockItemProps) {
	const now = new Date();
	const { number, miner, length, date } = block as Block;

	return (
		<li>
			<hr />
			<p>
				Block number: <Link href={`/blocks/${number}`}>{number}</Link>
			</p>
			<p>
				Fee recipient: <Link href={`/address/${miner}`}>{miner}</Link>
			</p>
			<p>Transactions in the block: {length} Txns</p>
			<p>{differenceBetweenDates(now, date || new Date())}</p>
		</li>
	);
}
