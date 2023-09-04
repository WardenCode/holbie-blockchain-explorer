import SimplyTransactionItem from "./SimplyTransactionItem";

export default function SimplyTransactionTable() {
	return (
		<>
			<p>Simply Transaction Table</p>
			<ul>
				{[1, 2, 3].map((element) => (
					<SimplyTransactionItem key={element} />
				))}
			</ul>
		</>
	);
}
