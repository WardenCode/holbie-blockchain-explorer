import BlockData from "@/components/BlockData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<p>Blocks #{params.address}</p>
			<BlockData />
		</>
	);
}
