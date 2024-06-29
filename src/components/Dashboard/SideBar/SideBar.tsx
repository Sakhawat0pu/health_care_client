import { Box, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { generateDrawerItems } from "@/utils/generateDrawerItems";
import { TUserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const SideBar = () => {
	const [userRole, setUserRole] = useState("");
	useEffect(() => {
		const { role } = getUserInfo();
		setUserRole(role);
	}, []);
	return (
		<Box>
			<Stack
				sx={{ py: 1, mt: 1 }}
				direction="row"
				alignItems="center"
				justifyContent="center"
				gap={1}
				component={Link}
				href="/"
			>
				<Image src={assets.svgs.logo} alt="logo" width={40} height={40} />
				<Typography variant="h6" component="h6">
					Online HealthCare
				</Typography>
			</Stack>
			<List>
				{generateDrawerItems(userRole as TUserRole).map((item, index) => (
					<SidebarItem key={index} item={item} />
				))}
			</List>
		</Box>
	);
};

export default SideBar;
