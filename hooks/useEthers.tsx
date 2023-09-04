"use client";

import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { ethers, JsonRpcProvider, FeeData } from "ethers";
import { getEthereumPrice, getMarketCap } from "../utils/index";

interface EthersContextData {
	provider: JsonRpcProvider;
	feeData: FeeData;
	lastBlock: number;
	price: number;
	marketCap: number;
}

const provider = new ethers.JsonRpcProvider(
	"https://mainnet.infura.io/v3/51478f98bd114f8bb9bfee5a69e5f349",
);

const EthersContext = createContext<EthersContextData>({} as EthersContextData);

async function getBlocksInRange(startBlock: number, endBlock: number) {
	const blocks = [];

	for (let i = startBlock; i <= endBlock; i++) {
		const block = await provider.getBlock(i);
		blocks.push(block);
	}

	return blocks;
}

export const EthersContextProvider = ({ children }: PropsWithChildren) => {
	const [lastBlock, setLastBlock] = useState(0);
	const [price, setPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [feeData, setFeeData] = useState<FeeData>({} as FeeData);

	const getLastBlockNumber = async () => {
		setLastBlock(await provider.getBlockNumber());
	};

	const getFeeData = async () => {
		const tmpFeeData = await provider.getFeeData();
		setFeeData(tmpFeeData);
	};

	const getPrice = async () => {
		const tmpPrice = await getEthereumPrice();
		setPrice(tmpPrice);
	};

	const getCap = async () => {
		const tmpCap = await getMarketCap();
		setMarketCap(tmpCap);
	};

	useEffect(() => {
		getLastBlockNumber();
		getFeeData();
		getPrice();
		getCap();
	}, []);

	return (
		<EthersContext.Provider
			value={{
				provider,
				lastBlock,
				feeData,
				price,
				marketCap,
			}}>
			{children}
		</EthersContext.Provider>
	);
};

export const useEthers = () => {
	const context = useContext(EthersContext);

	if (context === undefined)
		throw new Error(
			'Ethers Error useEthers must be used within a "EthersContextProvider"',
		);

	return context;
};
