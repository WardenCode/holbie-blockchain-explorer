import BlockData from "@/components/BlockData";

interface Page {
	params: { address: string };
}

export default function Page({ params }: Page) {
	return (
		<>
			<div className="w-11/12 mx-auto flex gap-3 text-lg py-10">
				<p className="font-bold">Block</p>
				<p className="text-eth-colors-gray-400">#{params.address}</p>
			</div>
			<div className="w-11/12 mx-auto p-8 bg-eth-colors-blackAlpha-500 rounded-3xl">
				<BlockData blockNumber={parseInt(params.address)} />
			</div>
		</>
	);
}
