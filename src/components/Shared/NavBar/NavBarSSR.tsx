import { getUserInfoFromCookies } from "@/services/getUserInfoFromCookies";
import NavBar from "./NavBar";

const NavBarSSR = () => {
	const userInfo = getUserInfoFromCookies();
	return <NavBar userInfo={userInfo} />;
};

export default NavBarSSR;
