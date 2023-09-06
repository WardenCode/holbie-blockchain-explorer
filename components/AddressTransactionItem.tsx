import { TableRow, TableCell } from "@mui/material";
import {
	Transaction,
	formatMiddleAddress,
	formatAddress,
} from "../utils/index";
import { formatEther, formatUnits } from "ethers";
import { formatDate } from "../utils/index";
import Link from "next/link";

interface AddressTransactionItemProps {
	transaction: Transaction;
}

export default function AddressTransactionItem({
	transaction,
}: AddressTransactionItemProps) {
	return (
		<TableRow>
			<TableCell>
				<Link href={`/tx/${transaction.hash}`}>
					{formatAddress(transaction.hash)}
				</Link>
			</TableCell>
			<TableCell>
				<Link href={`/blocks/${transaction.blockNumber}`}>
					{transaction.blockNumber}
				</Link>
			</TableCell>
			<TableCell>
				{formatDate(new Date(Number(transaction.timeStamp)))}
			</TableCell>
			<TableCell>
				<Link href={`/address/${transaction.from}`}>
					{formatMiddleAddress(transaction.from)}
				</Link>
			</TableCell>
			<TableCell>
				<Link href={`/address/${transaction.to}`}>
					{formatMiddleAddress(transaction.to)}
				</Link>
			</TableCell>
			<TableCell>{formatEther(transaction.value)} ETH</TableCell>
			<TableCell>
				{formatUnits(transaction.gasPrice, "gwei")} Gwei
			</TableCell>
		</TableRow>
	);
}
