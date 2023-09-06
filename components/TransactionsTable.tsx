"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import TransactionItem from "./TransactionItem";
import { TransactionResponse } from "ethers";
import { SetStateAction, useEffect, useState } from "react";
import TablePaginationActions from "./TablePaginationActions";
import { useEthers } from "@/hooks/useEthers";

const columns = [
	"Txn Hash",
	"Block",
	"Date Time (UTC)",
	"From",
	"To",
	"Value",
	"Gas Price",
];

export default function TransactionsTable() {
	const { provider, getBlock } = useEthers();
	const [page, setPage] = useState(0);
	const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const getTransactions = async () => {
		const tmpTransactions = [];

		const latestBlockNumber = await provider.getBlockNumber();
		for (let i = 0; i < 10; i++) {
			const block = await getBlock(latestBlockNumber);
			if (block?.prefetchedTransactions)
				tmpTransactions.push(...block.prefetchedTransactions);
		}

		setTransactions(tmpTransactions);
	};

	useEffect(() => {
		getTransactions();
	}, []);

	const handleChangePage = (_event: any, newPage: SetStateAction<number>) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className="bg-slate-100">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column}>{column}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage,
							)
							.map((transaction) => (
								<TransactionItem
									key={transaction?.hash}
									transaction={transaction}
								/>
							))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 15]}
								colSpan={3}
								count={transactions.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
}
