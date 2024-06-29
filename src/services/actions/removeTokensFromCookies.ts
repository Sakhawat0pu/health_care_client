"use server";

import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";

export const removeTokensFromCookies = () => {
	cookies().delete(authKey);
	cookies().delete("refreshToken");
};
