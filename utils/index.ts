interface EthereumPriceResponse {
	ethereum: {
		usd: number;
	};
}

export const formatBalance = (rawBalance: string) => {
	const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
	return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
	const chainIdNum = parseInt(chainIdHex);
	return chainIdNum;
};

export const formatAddress = (addr: string) => {
	return `${addr.substring(0, 6)}...${addr.substring(39)}`;
};

export const getEthereumPrice = async () => {
	const url =
		"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

	const response = await fetch(url);
	const data: EthereumPriceResponse = await response.json();

	return data["ethereum"]["usd"];
};

export const getMarketCap = async () => {
	const url =
		"https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";

	const response = await fetch(url);
	const data = await response.json();
	const marketData = data["market_data"];
	const marketCap: number = marketData["market_cap"]["usd"];

	return marketCap;
};
