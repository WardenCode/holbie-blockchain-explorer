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
		<>
			<p>Address Data</p>
			<p>ETH Balance</p>
			<span>{balance} ETH</span>
		</>
	);
}
