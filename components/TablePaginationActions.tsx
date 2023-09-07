import { IconButton, Box, useTheme } from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: any, newPage: number) => void;
}

export default function TablePaginationActions({
	count,
	page,
	rowsPerPage,
	onPageChange,
}: TablePaginationActionsProps) {
	const theme = useTheme();

	const handleFirstPageButtonClick = (event: any) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: any) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5, color: "white" }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				sx={{
					color: "white",
					"&.Mui-disabled": {
						color: "rgba(255, 255, 255, 0.4)",
					},
				}}
				aria-label="first page">
				{theme.direction === "rtl" ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				sx={{
					color: "white",
					"&.Mui-disabled": {
						color: "rgba(255, 255, 255, 0.4)",
					},
				}}
				aria-label="previous page">
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				sx={{
					color: "white",
					"&.Mui-disabled": {
						color: "rgba(255, 255, 255, 0.4)",
					},
				}}
				aria-label="next page">
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				sx={{
					color: "white",
					"&.Mui-disabled": {
						color: "rgba(255, 255, 255, 0.4)",
					},
				}}
				aria-label="last page">
				{theme.direction === "rtl" ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</Box>
	);
}
