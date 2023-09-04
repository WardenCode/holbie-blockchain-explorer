import TransactionItem from "./TransactionItem";

export default function TransactionsTable() {
	return (
		<>
			<p>Transactions Table</p>
			<ul>
				{[1, 2, 3].map((element) => (
					<TransactionItem key={element} />
				))}
			</ul>
		</>
	);
}
