import { TransactionResponse, formatEther } from "ethers";
import Link from "next/link";
import {
	formatMiddleAddress,
	formatAddress,
	roundToFiveDecimals,
} from "../utils/index";

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
		<div className="flex items-center w-full border-t border-eth-colors-whiteAlpha-300 p-5">
			<div className="flex flex-col gap-1 w-5/12">
				<Link
					className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
					href={`/tx/${hash}`}>
					{formatAddress(hash)}
				</Link>
				<p>{existence}</p>
			</div>
			<div className="flex flex-col gap-1 w-5/12">
				<p>
					From:{" "}
					<Link
						className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
						href={`/address/${from}`}>
						{formatMiddleAddress(from)}
					</Link>
				</p>
				<p>
					To:{" "}
					<Link
						className="text-eth-colors-orange-500 hover:text-eth-colors-orange-400"
						href={`/address/${to}`}>
						{formatMiddleAddress(to || "")}
					</Link>
				</p>
			</div>
			<p className="text-sm border border-eth-colors-gray-600 rounded-lg text-center p-1  w-2/12">
				{roundToFiveDecimals(formatEther(value))} ETH
			</p>
		</div>
	);
}
