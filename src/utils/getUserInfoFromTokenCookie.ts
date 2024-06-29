"use server";

import { authKey } from "@/constants/authKey";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getUserInfoFromTokenCookie = () => {
	const accessToken = cookies().get(authKey)?.value;
	if (accessToken) {
		const decodedData: any = jwtDecode(accessToken);
		return { ...decodedData, role: decodedData.role.toLowerCase() };
	} else {
		return {};
	}
};
