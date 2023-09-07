"use client";

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
import TransactionItem from "./TransactionItem";
import { TransactionResponse } from "ethers";
import { SetStateAction, useEffect, useState } from "react";
import TablePaginationActions from "./TablePaginationActions";
import { useEthers } from "@/hooks/useEthers";
import { arrayOfSize } from "@/utils";

const columns = [
	"Txn Hash",
	"Block",
	"Date Time (UTC)",
	"From",
	"To",
	"Value",
	"Gas Price",
];

const elements = arrayOfSize(8);

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
							<TransactionItem
								key={transaction?.hash}
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
							count={transactions.length}
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
