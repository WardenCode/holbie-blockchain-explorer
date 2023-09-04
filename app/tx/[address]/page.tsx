import TransactionData from "@/components/TransactionData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Transactions #{params.address}</p>
			<TransactionData />
		</>
	);
}
