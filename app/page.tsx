import SearchBar from "@/components/SearchBar";
import EthereumData from "@/components/EthereumData";
import SimplyBlockTable from "@/components/SimplyBlocksTable";
import SimplyTransactionTable from "@/components/SimplyTransactionsTable";

export default function Page() {
	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<div>
				<SearchBar />
			</div>
			<div>
				<EthereumData />
			</div>
			<div>
				<SimplyBlockTable />
				<SimplyTransactionTable />
			</div>
		</div>
	);
}
