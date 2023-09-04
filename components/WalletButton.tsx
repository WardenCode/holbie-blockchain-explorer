// "use client";

// import { useMetaMask } from "@/hooks/useMetaMask";
// import { formatAddress } from "@/utils";
// import { Button, Menu, MenuItem } from "@mui/material";
// import { MouseEventHandler, useState } from "react";

// export default function WalletButton() {
// 	const { wallet, connectMetaMask, disconnectMetaMask } = useMetaMask();
// 	const [anchorEl, setAnchorEl] = useState<
// 		(EventTarget & HTMLButtonElement) | null
// 	>(null);
// 	const open = Boolean(anchorEl);
// 	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};

// 	const handleDisconnect = () => {
// 		handleClose();
// 		disconnectMetaMask();
// 	};

// 	return (
// 		<>
// 			{wallet.accounts.length > 0 ? (
// 				<Button
// 					className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white"
// 					onClick={handleClick}>
// 					{formatAddress(wallet.accounts[0].address || "")}
// 				</Button>
// 			) : (
// 				<Button
// 					className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white"
// 					onClick={connectMetaMask}>
// 					Connect wallet
// 				</Button>
// 			)}
// 			<Menu
// 				id="basic-menu"
// 				anchorEl={anchorEl}
// 				open={open}
// 				onClose={handleClose}>
// 				<MenuItem onClick={handleDisconnect}>Log Out</MenuItem>
// 			</Menu>
// 		</>
// 	);
// }
