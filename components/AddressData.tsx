"use client";

import { useEthers } from "@/hooks/useEthers";
import { useEffect, useState } from "react";
import { formatEther } from "ethers";

interface AddressDataProps {
	address: string;
}

export default function AdressData({ address }: AddressDataProps) {
	const { provider } = useEthers();
	const [balance, setbalance] = useState("0");

	const getData = async () => {
		const tmpBalance = await provider.getBalance(address);
		setbalance(formatEther(tmpBalance));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<p className="text-eth-colors-orange-400">Address:</p>
				<p>{address}</p>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-eth-colors-orange-400">ETH Balance:</p>
				<p>{balance} ETH</p>
			</div>
		</div>
	);
}
