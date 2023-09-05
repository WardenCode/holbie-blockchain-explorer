import AdressData from "@/components/AddressData";
import TransactionsTable from "../../../components/TransactionsTable";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Address {params.address}</p>
			<AdressData />
			<TransactionsTable />
		</>
	);
}
