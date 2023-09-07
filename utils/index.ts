interface EthereumPriceResponse {
	ethereum: {
		usd: number;
	};
}

export interface TransactionsByAdressResponse {
	message: string;
	result: Transaction[];
	status: string;
}

export interface Transaction {
	blockHash: string;
	blockNumber: string;
	confirmations: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	from: string;
	functionName: string;
	gas: string;
	gasPrice: string;
	gasUsed: string;
	hash: string;
	input: string;
	isError: string;
	methodId: string;
	nonce: string;
	timeStamp: string;
	to: string;
	transactionIndex: string;
	txreceipt_status: string;
	value: string;
}

export const formatBalance = (rawBalance: string) => {
	const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
	return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
	const chainIdNum = parseInt(chainIdHex);
	return chainIdNum;
};

export const formatMiddleAddress = (addr: string) => {
	return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`;
};

export const formatAddress = (addr: string) => {
	return `${addr.substring(0, 18)}...`;
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

export const differenceBetweenDates = (date1: Date, date2: Date) => {
	const secondsDiff = Math.floor(
		Math.abs(date1.getTime() - date2.getTime()) / 1000,
	);
	const minutesDiff = Math.floor(secondsDiff / 60);
	const hoursDiff = Math.floor(minutesDiff / 60);
	const daysDiff = Math.floor(hoursDiff / 24);
	const yearsDiff = Math.floor(daysDiff / 365);

	if (daysDiff >= 365) return `${yearsDiff} years ago`;

	if (hoursDiff >= 24) return `${daysDiff} days ago`;

	if (minutesDiff >= 60) return `${hoursDiff} hours ago`;

	if (secondsDiff >= 60) return `${minutesDiff} minutes ago`;

	return `${secondsDiff.toFixed(0)} seconds ago`;
};

export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateToCustomString(date: Date) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const month = months[date.getMonth()];
	const day = String(date.getDate()).padStart(2, "0");
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const ampm = date.getHours() >= 12 ? "PM" : "AM";
	const offset = date.getTimezoneOffset();
	// const offsetHours = Math.abs(Math.floor(offset / 60))
	// 	.toString()
	// 	.padStart(2, "0");
	// const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
	// const offsetSign = offset >= 0 ? "+" : "-";

	// return `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${ampm} ${offsetSign}${offsetHours}:${offsetMinutes}`;
	return `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${ampm} +UTC`;
}

export const getTransactionsByAddress = async (
	address: string,
	page: number,
	offset: number,
) => {
	const response =
		await fetch(`${process.env.NEXT_PUBLIC_ETHERSCAN_API_ENDPOINT}
	?module=account
	&page=${page}
	&offset=${offset}
	&address=${address}
	&action=txlist
	&startblock=0
	&endblock=99999999
	&sort=asc
	&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);

	const data: TransactionsByAdressResponse = await response.json();

	return data.result;
};

export function roundToFiveDecimals(string: string) {
	let number = parseFloat(string);

	if (string.split(".")[1]?.length > 5) {
		number = Math.round(number * 1e5) / 1e5;
	}

	return number.toString();
}

export function arrayOfSize(size: number) {
	return Array.from(Array(size).keys());
}
