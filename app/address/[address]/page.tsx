import AdressData from "@/components/AddressData";
import AddressTransactionTable from "@/components/AddressTransactionTable";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Address {params.address}</p>
			<AdressData address={params.address} />
			<AddressTransactionTable address={params.address} />
		</>
	);
}
