import SearchBar from "@/components/SearchBar";
import EthereumData from "@/components/EthereumData";
import SimplyBlockTable from "@/components/SimplyBlocksTable";
import SimplyTransactionTable from "@/components/SimplyTransactionsTable";

export default function Page() {
	return (
		<div className="min-h-screen flex items-center flex-col gap-10">
			<div className="w-11/12 mx-auto mt-10">
				<SearchBar />
			</div>
			<div className="w-11/12 mx-auto">
				<EthereumData />
			</div>
			<div className="w-11/12 h-fit grid grid-cols-2 grid-rows-1 gap-8">
				<SimplyBlockTable />
				<SimplyTransactionTable />
			</div>
		</div>
	);
}
