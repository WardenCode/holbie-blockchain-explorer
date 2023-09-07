"use client";

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function SearchBar() {
	// 0x3e5c60b600249fb50c14991b73d8ed8ae31bb475315120a0531d53ebee3addc3
	// 18065522
	// 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5

	const [input, setInput] = useState("");
	const router = useRouter();

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return;

		if (input.startsWith("0x") && input.length === 66) {
			router.push(`/tx/${input}`);
			return;
		}

		if (input.length === 42) {
			router.push(`/address/${input}`);
			return;
		}

		router.push(`/blocks/${input}`);
	}

	return (
		<div className="w-full">
			<TextField
				autoComplete="off"
				value={input}
				label="Address / Block / Transaction"
				onChange={(event) => setInput(event.target.value)}
				onKeyDown={handleKeyDown}
				sx={{
					width: "100%",
					border: "1px solid #646464",
					borderRadius: "8px",
				}}
				InputLabelProps={{
					sx: {
						color: "#f7f7f7!important",
						borderColor: "rgba(255, 255, 255, 0.16)",
					},
				}}
				InputProps={{
					sx: {
						borderColor: "rgba(255, 255, 255, 0.16)",
						color: "white",
						"&:hover fieldset": {
							border: "2px solid #ffb991!important",
						},
						"&:focus-within fieldset, &:focus-visible fieldset": {
							border: "1px solid #ffb991!important",
						},
					},
				}}
			/>
		</div>
	);
}
