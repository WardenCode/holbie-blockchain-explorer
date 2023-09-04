import AdressData from "@/components/AddressData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Address: {params.address}</p>
			<AdressData />
		</>
	);
}
