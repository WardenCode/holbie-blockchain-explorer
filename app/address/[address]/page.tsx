import AdressData from "@/components/AddressData";
import AddressTransactionTable from "@/components/AddressTransactionTable";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<div className="w-11/12 mx-auto py-5">
				<span className="text-lg font-bold">Address Data</span>
			</div>
			<div className="w-11/12 mx-auto p-5 bg-eth-colors-blackAlpha-500 rounded-2xl">
				<AdressData address={params.address} />
			</div>
			<div className="w-11/12 mx-auto py-5">
				<h1 className="text-xl">Transactions</h1>
			</div>

			<div className="w-11/12 mx-auto bg-eth-colors-blackAlpha-500 rounded-3xl">
				<AddressTransactionTable address={params.address} />
			</div>
		</>
	);
}
