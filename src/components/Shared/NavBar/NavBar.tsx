"use client";

import { removeTokensFromCookies } from "@/services/actions/removeTokensFromCookies";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { getUserInfoFromCookies } from "@/services/getUserInfoFromCookies";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = ({ userInfo }: { userInfo: Record<string, any> }) => {
	const router = useRouter();

	const handleLogout = () => {
		removeUser();
		removeTokensFromCookies();
		router.refresh();
	};

	return (
		<Container>
			<Stack
				py={2}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography variant="h4" component={Link} href="/" fontWeight={600}>
					<Box component="span" color="primary.main">
						H
					</Box>
					ealth{" "}
					<Box component="span" color="primary.main">
						C
					</Box>
					are
				</Typography>
				<Stack direction="row" gap={4} justifyContent="space-between">
					<Typography component={Link} href="/consultation">
						Consultation
					</Typography>
					<Typography component={Link} href="/login">
						Health Plans
					</Typography>
					<Typography component={Link} href="/login">
						Medicine
					</Typography>
					<Typography component={Link} href="/login">
						Diagnostic
					</Typography>
					<Typography component={Link} href="/login">
						NGOs
					</Typography>
					{userInfo?.role && (
						<Typography
							component={Link}
							href={`/dashboard/${userInfo.role}/appointments`}
						>
							Dashboard
						</Typography>
					)}
				</Stack>
				{userInfo?.email ? (
					<Button color="error" onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Button component={Link} href="/login">
						Login
					</Button>
				)}
			</Stack>
		</Container>
	);
};

export default NavBar;
