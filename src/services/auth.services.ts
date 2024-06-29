"use client";

import { authKey } from "@/constants/authKey";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/jwt";
import {
	getFromLocalStorage,
	removeFromLocalStorage,
	setToLocalStorage,
} from "@/utils/localStorage";

export const storeUserInfo = (token: string) => {
	return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
	const token = getFromLocalStorage(authKey);
	if (token) {
		const decodedData: any = decodeToken(token);
		return {
			...decodedData,
			role: decodedData?.role.toLowerCase(),
		};
	} else {
		return {};
	}
};

export const isLoggedIn = () => {
	const token = getFromLocalStorage(authKey);
	return !!token;
};

export const removeUser = () => {
	return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
	return await axiosInstance({
		url: "http://localhost:5555/api/v1/auth/refresh-token",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
