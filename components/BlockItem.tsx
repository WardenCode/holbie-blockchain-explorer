import { formatDate } from "@/utils";
import { TableCell, TableRow } from "@mui/material";
import { Block, formatUnits } from "ethers";
import Link from "next/link";

interface BlockItemProps {
	block: Block | null;
}

const defaultBigInt = BigInt(0);

export default function BlockItem({ block }: BlockItemProps) {
	return (
		<>
			<TableRow>
				<TableCell>
					<Link
						className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
						href={`/blocks/${block?.number}`}>
						{block?.number}
					</Link>
				</TableCell>
				<TableCell>
					<span className="text-eth-colors-whiteAlpha-900">
						{block?.date ? formatDate(block.date) : "-"}
					</span>
				</TableCell>
				<TableCell>
					<span className="text-eth-colors-whiteAlpha-900">
						{block?.length}
					</span>
				</TableCell>
				<TableCell>
					<Link
						className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
						href={`/address/${block?.miner}`}>
						{block?.miner}
					</Link>
				</TableCell>
				<TableCell>
					<span className="text-eth-colors-whiteAlpha-900">
						{block?.gasUsed.toLocaleString("en-GB")}
					</span>
				</TableCell>
				<TableCell>
					<span className="text-eth-colors-whiteAlpha-900">
						{block?.gasLimit.toLocaleString("en-GB")}
					</span>
				</TableCell>
				<TableCell>
					<span className="text-eth-colors-whiteAlpha-900">
						{Number(
							formatUnits(
								block?.baseFeePerGas || defaultBigInt,
								"gwei",
							),
						).toFixed(2)}{" "}
						Gwei
					</span>
				</TableCell>
			</TableRow>
		</>
	);
}
