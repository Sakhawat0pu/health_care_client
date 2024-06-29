"use server";
import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAccessTokenToCookiesAndRedirect = (
	token: string,
	option?: Record<string, any>
) => {
	cookies().set(authKey, token);

	if (option && option?.redirect) {
		redirect(option.redirect);
	}
};
