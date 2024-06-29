import Footer from "@/components/Shared/Footer/Footer";
import NavBarSSR from "@/components/Shared/NavBar/NavBarSSR";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<NavBarSSR />
			<div className="min-h-screen">{children}</div>
			<Footer />
		</div>
	);
};

export default CommonLayout;
