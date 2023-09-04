"use client";

import { useEthers } from "@/hooks/useEthers";
import { formatUnits } from "ethers";

export default function EthereumData() {
	const { lastBlock, feeData, price, marketCap } = useEthers();

	return (
		<>
			<p>Ethereum Price: ${price}</p>
			<p>Market Cap: ${marketCap}</p>
			<p>lastBlock: {lastBlock}</p>
			<p>gas: {formatUnits(feeData.gasPrice || 0, "gwei")}</p>
		</>
	);
}
