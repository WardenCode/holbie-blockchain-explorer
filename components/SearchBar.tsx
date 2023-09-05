"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function SearchBar() {
	// 	tx 0x3e5c60b600249fb50c14991b73d8ed8ae31bb475315120a0531d53ebee3addc3
	// block 18065522
	// address 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5

	const [address, setAddress] = useState("");
	const router = useRouter();

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		event.key === "Enter" && router.push(`/address/${address}`);
	}

	return (
		<>
			<div className="bg-white p-5">
				<TextField
					value={address}
					label="Address"
					onChange={(event) => setAddress(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</>
	);
}
