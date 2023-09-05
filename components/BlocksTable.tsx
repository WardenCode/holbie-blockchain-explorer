"use client";

import { useEthers } from "@/hooks/useEthers";
import {
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
	TablePagination,
} from "@mui/material";

import BlockItem from "./BlockItem";
import { SetStateAction, useEffect, useState } from "react";
import { Block } from "ethers";
import TablePaginationActions from "./TablePaginationActions";

const columns = [
	"Block",
	"Age",
	"Txn",
	"Fee Recipient",
	"Gas Used",
	"Gas Limit",
	"Base Fee",
	// "Reward",
	// "Burnt Fees",
];

export default function BlocksTable() {
	const { getPaginatedBlocks, provider } = useEthers();
	const [page, setPage] = useState(0);
	const [blocks, setBlocks] = useState<(Block | null)[]>([]);
	const [lastestBlock, setLastestBlock] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const getBlocks = async () => {
		const latestBlockNumber = await provider.getBlockNumber();
		const tmpBlocks = await getPaginatedBlocks(
			latestBlockNumber,
			rowsPerPage,
			page + 1,
		);

		setBlocks(tmpBlocks);
		setLastestBlock(latestBlockNumber);
	};

	useEffect(() => {
		getBlocks();
	}, [page]);

	const handleChangePage = (_event: any, newPage: SetStateAction<number>) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
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
							{blocks.map((block) => (
								<BlockItem
									key={block?.hash}
									block={block}
								/>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 15]}
									colSpan={3}
									count={lastestBlock}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": "rows per page",
										},
										native: true,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={
										handleChangeRowsPerPage
									}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</div>
		</>
	);
}
