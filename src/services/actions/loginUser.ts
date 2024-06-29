// "use server";

import { FieldValues } from "react-hook-form";

export const loginUser = async (payload: FieldValues) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-type": "application/json",
		},
		// cache: "no-store",
		credentials: "include",
	});
	const loginInfo = await res.json();
	return loginInfo;
};
