"use client";

import { Transaction, getTransactionsByAddress } from "@/utils";
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
import { SetStateAction, useEffect, useState } from "react";
import TablePaginationActions from "./TablePaginationActions";
import { useEthers } from "@/hooks/useEthers";
import AddressTransactionItem from "./AddressTransactionItem";

interface AddressTransactionTableProps {
	address: string;
}

const columns = [
	"Txn Hash",
	"Block",
	"Date Time (UTC)",
	"From",
	"To",
	"Value",
	"Gas Price",
];

export default function AddressTransactionTable({
	address,
}: AddressTransactionTableProps) {
	const { provider } = useEthers();
	const [page, setPage] = useState(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [totalTransactions, setTotalTransactions] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_event: any, newPage: SetStateAction<number>) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const getTotalTransactions = async () => {
			const tmpTotalTransactions =
				await provider.getTransactionCount(address);

			setTotalTransactions(tmpTotalTransactions);
		};

		const getTransactionsPage = async () => {
			const tmpTransactions = await getTransactionsByAddress(
				address,
				page,
				rowsPerPage,
			);

			setTransactions(tmpTransactions);
		};

		getTotalTransactions();
		getTransactionsPage();
	}, []);

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
								<AddressTransactionItem
									key={transaction.hash}
									transaction={transaction}
								/>
							))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 15]}
								colSpan={3}
								count={totalTransactions}
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
