import SimplyBlockItem from "./SimplyBlockItem";

export default function SimplyBlockTable() {
	return (
		<>
			<p>Simply Block Table</p>
			<ul>
				{[1, 2, 3].map((element) => (
					<SimplyBlockItem key={element} />
				))}
			</ul>
		</>
	);
}
