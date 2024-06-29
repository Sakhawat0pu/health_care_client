import { removeTokensFromCookies } from "@/services/actions/removeTokensFromCookies";
import { getUserInfo, removeUser } from "@/services/auth.services";
// import { getUserInfoFromCookies } from "@/services/getUserInfoFromCookies";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
	const userInfo = getUserInfo();
	const router = useRouter();
	const handleLogout = () => {
		removeUser();
		removeTokensFromCookies();
		router.refresh();
	};
	return (
		<>
			{userInfo?.email ? (
				<Button color="error" onClick={handleLogout}>
					Logout
				</Button>
			) : (
				<Button component={Link} href="/login">
					Login
				</Button>
			)}
		</>
	);
};

export default AuthButton;
