import BlockItem from "./BlockItem";

export default function BlocksTable() {
	return (
		<>
			<p>Blocks Table</p>
			<ul>
				{[1, 2, 3].map((element) => (
					<BlockItem key={element} />
				))}
			</ul>
		</>
	);
}
