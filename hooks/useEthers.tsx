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
import { Block } from "ethers";
import { TransactionResponse } from "ethers";
import { TransactionReceipt } from "ethers";

interface EthersContextData {
	provider: JsonRpcProvider;
	feeData: FeeData;
	lastBlock: number;
	price: number;
	marketCap: number;
	getPaginatedBlocks: (
		totalBlocks: number,
		batchSize?: number,
		currentPage?: number,
	) => Promise<(ethers.Block | null)[]>;
	getLastBlock: () => Promise<Block | null>;
	getBlock: (blockNumber: number) => Promise<Block | null>;
	getTransaction: (hash: string) => Promise<TransactionResponse | null>;
	getTransactionReceipt: (hash: string) => Promise<TransactionReceipt | null>;
}

const provider = new ethers.JsonRpcProvider(
	process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_FULL_URL,
);

const EthersContext = createContext<EthersContextData>({} as EthersContextData);

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

	const getBlock = async (blockNumber: number) => {
		const block = await provider.getBlock(blockNumber, true);

		return block;
	};

	const getPaginatedBlocks = async (
		totalBlocks: number,
		sizePage: number = 10,
		currentPage: number = 1,
	) => {
		const bloques: (Block | null)[] = [];
		const batch: number[] = [];
		const fromBlock: number = (currentPage - 1) * sizePage;
		const toBlock: number = currentPage * sizePage;

		for (let i = fromBlock; i <= toBlock && i <= totalBlocks; i++) {
			batch.push(totalBlocks - i);
		}

		const bloqueBatch = await Promise.all(
			batch.map(async (blockNumber) => {
				const block = await getBlock(blockNumber);
				return block;
			}),
		);

		bloques.push(...bloqueBatch);

		return bloques;
	};

	const getLastBlock = async () => {
		const last = await provider.getBlockNumber();
		const block = await getBlock(last);

		return block;
	};

	const getTransaction = async (hash: string) => {
		const transaction = await provider.getTransaction(hash);

		return transaction;
	};

	const getTransactionReceipt = async (hash: string) => {
		const transaction = await provider.getTransactionReceipt(hash);

		return transaction;
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
				getPaginatedBlocks,
				getLastBlock,
				getBlock,
				getTransaction,
				getTransactionReceipt,
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
