import BlockData from "@/components/BlockData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Block #{params.address}</p>
			<BlockData blockNumber={parseInt(params.address)} />
		</>
	);
}
