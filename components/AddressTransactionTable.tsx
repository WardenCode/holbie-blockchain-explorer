"use client";

import { Transaction, arrayOfSize, getTransactionsByAddress } from "@/utils";
import {
	Skeleton,
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

const elements = arrayOfSize(8);

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
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								sx={{
									color: "white !important",
									fontWeight: "bold",
								}}
								key={column}>
								{column}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{transactions.length === 0 &&
						elements.map((_element, idx) => (
							<TableRow key={idx}>
								<TableCell colSpan={7}>
									<Skeleton
										animation={false}
										key={idx}
										sx={{
											bgcolor: "rgba(255, 255, 255, 0.1)",
											width: "100%",
											height: "38px",
										}}
									/>
								</TableCell>
							</TableRow>
						))}
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
							sx={{
								color: "white",
								border: "none",
								fontWeight: "bold",
							}}
							rowsPerPageOptions={[5, 10, 15]}
							count={totalTransactions}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								native: true,
								inputProps: {
									style: {
										color: "white",
										fontWeight: "bold",
									},
								},
								sx: {
									color: "black",
									fontWeight: "bold",
									"& .MuiSvgIcon-root": {
										color: "white",
										fontWeight: "bold",
									},
									"& option": {
										color: "black",
										fontWeight: "bold",
									},
								},
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
