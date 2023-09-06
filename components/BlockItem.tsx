import { differenceBetweenDates, formatDate } from "@/utils";
import { TableCell, TableRow } from "@mui/material";
import { Block, formatUnits } from "ethers";
import Link from "next/link";
import { formatMiddleAddress } from "../utils/index";

interface BlockItemProps {
	block: Block | null;
}

const defaultBigInt = BigInt(0);

export default function BlockItem({ block }: BlockItemProps) {
	return (
		<TableRow>
			<TableCell>
				<Link href={`/blocks/${block?.number}`}>{block?.number}</Link>
			</TableCell>
			<TableCell>{block?.date ? formatDate(block.date) : "-"}</TableCell>
			<TableCell>{block?.length}</TableCell>
			<TableCell>
				<Link href={`/address/${block?.miner}`}>{block?.miner}</Link>
			</TableCell>
			<TableCell>{block?.gasUsed.toLocaleString("en-GB")}</TableCell>
			<TableCell>{block?.gasLimit.toLocaleString("en-GB")}</TableCell>
			<TableCell>
				{Number(
					formatUnits(block?.baseFeePerGas || defaultBigInt, "gwei"),
				).toFixed(2)}{" "}
				Gwei
			</TableCell>
		</TableRow>
	);
}
