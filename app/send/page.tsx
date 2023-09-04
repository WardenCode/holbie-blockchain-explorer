// "use client";

// import { useMetaMask } from "@/hooks/useMetaMask";
// import { Button, TextField } from "@mui/material";
// import { useState } from "react";
// import { parseEther } from "ethers";

// export default function Transactions() {
// 	const [address, setAddress] = useState<string>("");
// 	const [amount, setAmount] = useState<string>("");
// 	const { signer } = useMetaMask();

// 	const handleAddress = (e) => {
// 		setAddress(e.target.value);
// 	};

// 	const handleAmount = (e) => {
// 		setAmount(e.target.value);
// 	};

// 	const handleTransaction = async () => {
// 		const tx = await signer.sendTransaction({
// 			to: address,
// 			value: parseEther(amount),
// 		});

// 		const receipt = await tx.wait();

// 		console.log(receipt);
// 	};

// 	return (
// 		<div className="h-screen flex items-center justify-center flex-col">
// 			<p>Transaction page</p>
// 			<div className="flex flex-col bg-white">
// 				<TextField
// 					label="Address"
// 					id="address"
// 					value={address}
// 					onChange={handleAddress}
// 					variant="filled"
// 				/>
// 				<TextField
// 					label="Amount"
// 					id="amount"
// 					value={amount}
// 					onChange={handleAmount}
// 					variant="filled"
// 				/>
// 			</div>
// 			<Button onClick={handleTransaction}>Send</Button>
// 		</div>
// 	);
// }
