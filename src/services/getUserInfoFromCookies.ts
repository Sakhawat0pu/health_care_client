"use server";
import { authKey } from "@/constants/authKey";
import { decodeToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export const getUserInfoFromCookies = () => {
	const token = cookies().get(authKey)?.value;
	if (token) {
		const decodedData: any = decodeToken(token);
		return {
			...decodedData,
			role: decodedData?.role?.toLowerCase(),
		};
	} else {
		return {};
	}
};
