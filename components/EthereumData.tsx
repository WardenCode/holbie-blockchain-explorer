"use client";

import { useEthers } from "@/hooks/useEthers";
import { formatUnits } from "ethers";

export default function EthereumData() {
	const { lastBlock, feeData, price, marketCap } = useEthers();

	return (
		<div className="w-full rounded-md grid grid-cols-4 gap-3 bg-eth-colors-grayBackground text-eth-colors-whiteAlpha-900">
			<div className="h-32 flex gap-2 flex-col justify-center items-center bg-eth-colors-blackAlpha-500 rounded-md">
				<p className="text-lg text-eth-colors-orange-400">
					Ethereum Price
				</p>
				<p className="text-xl">$ {price}</p>
			</div>
			<div className="h-32 flex gap-2 flex-col justify-center items-center bg-eth-colors-blackAlpha-500 rounded-md">
				<p className="text-lg text-eth-colors-orange-400">Market Cap</p>
				<p className="text-xl">$ {marketCap}</p>
			</div>
			<div className="h-32 flex gap-2 flex-col justify-center items-center bg-eth-colors-blackAlpha-500 rounded-md">
				<p className="text-lg text-eth-colors-orange-400">Last Block</p>
				<p className="text-xl">{lastBlock}</p>
			</div>
			<div className="h-32 flex gap-2 flex-col justify-center items-center bg-eth-colors-blackAlpha-500 rounded-md">
				<p className="text-lg text-eth-colors-orange-400">Gas</p>
				<p className="text-xl">
					{formatUnits(feeData.gasPrice || 0, "gwei")} Gwei
				</p>
			</div>
		</div>
	);
}
