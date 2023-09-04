"use client";

import {
	useState,
	useEffect,
	createContext,
	PropsWithChildren,
	useContext,
} from "react";

import { ethers, BrowserProvider, JsonRpcSigner, formatEther } from "ethers";

interface WalletState {
	accounts: JsonRpcSigner[];
	balance: string;
	chainId: string;
}

interface MetaMaskContextData {
	wallet: WalletState;
	provider: BrowserProvider;
	signer: JsonRpcSigner;
	error: boolean;
	errorMessage: string;
	connectMetaMask: () => void;
	disconnectMetaMask: () => void;
	clearError: () => void;
}

const disconnectedState: WalletState = {
	accounts: [],
	balance: "",
	chainId: "",
};

const MetaMaskContext = createContext<MetaMaskContextData>(
	{} as MetaMaskContextData,
);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
	const [errorMessage, setErrorMessage] = useState("");
	const [wallet, setWallet] = useState(disconnectedState);

	const [provider, setProvider] = useState<BrowserProvider>(
		{} as BrowserProvider,
	);
	const [signer, setSigner] = useState<JsonRpcSigner>({} as JsonRpcSigner);

	const clearError = () => setErrorMessage("");

	const updateWallet = async (providedAccounts?: JsonRpcSigner[]) => {
		const accounts = providedAccounts || (await provider.listAccounts());

		if (accounts.length === 0) {
			setWallet(disconnectedState);
			return;
		}

		const balance = formatEther(await provider.getBalance(accounts[0]));
		const chainId = (await provider.getNetwork()).chainId.toString();

		setWallet({ accounts, balance, chainId });
	};

	const getProvider = async () => {
		const tempProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(tempProvider);

		if (tempProvider) {
			const tempSigner = await tempProvider.getSigner();
			setSigner(tempSigner);
		}
	};

	useEffect(() => {
		getProvider();
	}, []);

	const connectMetaMask = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_requestPermissions",
				params: [{ eth_accounts: {} }],
			});

			clearError();
			updateWallet();
		} catch (err: any) {
			setErrorMessage(err.message);
		}
	};

	const disconnectMetaMask = async () => {
		clearError();
		setWallet(disconnectedState);
		updateWallet([]);
	};

	return (
		<MetaMaskContext.Provider
			value={{
				wallet,
				error: Boolean(errorMessage),
				provider,
				signer,
				errorMessage,
				connectMetaMask,
				disconnectMetaMask,
				clearError,
			}}>
			{children}
		</MetaMaskContext.Provider>
	);
};

export const useMetaMask = () => {
	const context = useContext(MetaMaskContext);

	if (context === undefined)
		throw new Error(
			'useMetaMask must be used within a "MetaMaskContextProvider"',
		);

	return context;
};
