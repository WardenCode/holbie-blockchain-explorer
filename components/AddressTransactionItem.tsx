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
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/tx/${transaction.hash}`}>
					{formatAddress(transaction.hash)}
				</Link>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/blocks/${transaction.blockNumber}`}>
					{transaction.blockNumber}
				</Link>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{formatDate(new Date(Number(transaction.timeStamp)))}
				</span>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/address/${transaction.from}`}>
					{formatMiddleAddress(transaction.from)}
				</Link>
			</TableCell>
			<TableCell>
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/address/${transaction.to}`}>
					{formatMiddleAddress(transaction.to)}
				</Link>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{formatEther(transaction.value)} ETH
				</span>
			</TableCell>
			<TableCell>
				<span className="text-eth-colors-whiteAlpha-900">
					{formatUnits(transaction.gasPrice, "gwei")} Gwei
				</span>
			</TableCell>
		</TableRow>
	);
}
