"use client";

import { useEthers } from "@/hooks/useEthers";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Skeleton,
} from "@mui/material";

import BlockItem from "./BlockItem";
import { SetStateAction, useEffect, useState } from "react";
import { Block } from "ethers";
import TablePaginationActions from "./TablePaginationActions";
import { arrayOfSize } from "@/utils";

const columns = [
	"Block",
	"Date Time UTC",
	"Txn",
	"Fee Recipient",
	"Gas Used",
	"Gas Limit",
	"Base Fee",
];

const elements = arrayOfSize(8);

export default function BlocksTable() {
	const { getPaginatedBlocks, provider } = useEthers();
	const [page, setPage] = useState(0);
	const [blocks, setBlocks] = useState<(Block | null)[]>([]);
	const [lastestBlock, setLastestBlock] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		const getBlocks = async () => {
			const latestBlockNumber = await provider.getBlockNumber();
			const tmpBlocks = await getPaginatedBlocks(
				latestBlockNumber,
				rowsPerPage - 1,
				page + 1,
			);

			setBlocks(tmpBlocks);
			setLastestBlock(latestBlockNumber);
		};

		getBlocks();
	}, [page, rowsPerPage]);

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
					{blocks.length === 0 &&
						elements.map((element, idx) => (
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
							sx={{
								color: "white",
								border: "none",
								fontWeight: "bold",
							}}
							rowsPerPageOptions={[5, 10, 15]}
							count={lastestBlock}
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
