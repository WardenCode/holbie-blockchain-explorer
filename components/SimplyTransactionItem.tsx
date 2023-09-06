import { TransactionResponse, ethers } from "ethers";
import Link from "next/link";
import { formatMiddleAddress } from "../utils/index";

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
				<Link href={`/address/${from}`}>
					{formatMiddleAddress(from)}
				</Link>
			</p>
			<p>
				To:{" "}
				<Link href={`/address/${to}`}>
					{formatMiddleAddress(to || "")}
				</Link>
			</p>
			<p>{existence}</p>
			<p>Amount: {ethers.formatEther(value)} ETH</p>
		</>
	);
}
