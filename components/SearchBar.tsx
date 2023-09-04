"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function SearchBar() {
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
