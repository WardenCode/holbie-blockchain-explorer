import TransactionsTable from "@/components/TransactionsTable";

export default function Page() {
	return (
		<>
			<div className="w-11/12 mx-auto py-5">
				<h1 className="text-xl">Transactions</h1>
			</div>
			<div className="w-11/12 mx-auto bg-eth-colors-blackAlpha-500 rounded-3xl">
				<TransactionsTable />
			</div>
		</>
	);
}
