import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getUserInfo } from "./services/auth.services";
import { getUserInfoFromTokenCookie } from "./utils/getUserInfoFromTokenCookie";

const commonPath = ["/dashboard", "/dashboard/change-password"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = cookies().get(authKey)?.value;
	const userRole = getUserInfoFromTokenCookie().role;

	// if (accessToken && (pathname === "/login" || pathname === "/register")) {
	// 	return NextResponse.redirect(
	// 		new URL(`/dashboard/${userRole}`, request.url)
	// 	);
	// }

	if (!accessToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (accessToken && commonPath.includes(pathname)) {
		return NextResponse.next();
	}

	if (accessToken && pathname.split("/")[2] === userRole) {
		return NextResponse.next();
	}

	if (accessToken && !pathname.includes("dashboard")) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: [
		"/dashboard/:page*",
		"/doctors/:page*",
		"/payment/:page*",
		"/video/:page*",
	],
	// matcher: ["/login", "/register", "/dashboard/:page*"],
};
