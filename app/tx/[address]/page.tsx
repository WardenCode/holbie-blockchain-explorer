import TransactionData from "@/components/TransactionData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<div className="w-11/12 mx-auto py-10 text-lg font-bold">
				<p>Transaction Details</p>
			</div>
			<div className="w-11/12 mx-auto p-8 bg-eth-colors-blackAlpha-500 rounded-3xl">
				<TransactionData hash={params.address} />
			</div>
		</>
	);
}
