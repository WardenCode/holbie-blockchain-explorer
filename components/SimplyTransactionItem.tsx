import { TransactionResponse, ethers } from "ethers";
import Link from "next/link";
import { formatAddress } from "../utils/index";

interface SimplyTransactionItemProps {
	transaction: TransactionResponse;
	existence: string;
}

export default function SimplyTransactionItem({
	transaction,
	existence,
}: SimplyTransactionItemProps) {
	const { hash, from, to, value } = transaction;

	return (
		<>
			<p>
				Transaction Hash: <Link href={`/tx/${hash}`}>{hash}</Link>
			</p>
			<p>
				From:{" "}
				<Link href={`/address/${from}`}>{formatAddress(from)}</Link>
			</p>
			<p>
				To:{" "}
				<Link href={`/address/${to}`}>{formatAddress(to || "")}</Link>
			</p>
			<p>{existence}</p>
			<p>Amount: {ethers.formatEther(value)} ETH</p>
		</>
	);
}
