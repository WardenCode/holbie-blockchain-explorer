import SearchBar from "@/components/SearchBar";
import EthereumData from "@/components/EthereumData";
import SimplyBlockTable from "@/components/SimplyBlocksTable";
import SimplyTransactionTable from "@/components/SimplyTransactionsTable";

export default function Page() {
	return (
		<div className="min-h-screen flex items-center flex-col">
			<div className="flex py-10 w-full pl-10">
				<SearchBar />
			</div>
			<div className="bg-amber-200 rounded w-full mb-10 p-5">
				<EthereumData />
			</div>
			<div className="flex justify-around w-full h-fit py-10">
				<SimplyBlockTable />
				<SimplyTransactionTable />
			</div>
		</div>
	);
}
