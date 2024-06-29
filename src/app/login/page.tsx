"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/svgs/logo.svg";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { loginUser } from "@/services/actions/loginUser";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { setAccessTokenToCookiesAndRedirect } from "@/services/actions/setAccessTokenToCookiesAndRedirect";

const loginValidationSchema = z.object({
	email: z.string().email("Please enter a valid email address!"),
	password: z
		.string()
		.min(5, "Password must be at least five characters long!"),
});

const LoginPage = () => {
	const [error, setError] = useState("");
	const handleLogin = async (data: FieldValues) => {
		try {
			setError("");
			const res = await loginUser(data);
			if (res?.data?.accessToken) {
				toast.success(res?.message);

				storeUserInfo(res.data.accessToken);
				const userInfo = getUserInfo();
				const userRole = userInfo.role;
				let redirectPath = `/dashboard/${userRole}`;
				if (res.data.needPasswordChange) {
					redirectPath = "/dashboard/change-password";
				}
				setAccessTokenToCookiesAndRedirect(res.data.accessToken, {
					redirect: redirectPath,
				});
			} else {
				setError(res.message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	return (
		<Container>
			<Stack
				sx={{
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Box
					sx={{
						maxWidth: 800,
						width: "100%",
						boxShadow: 1,
						borderRadius: 1,
						p: 4,
						textAlign: "center",
					}}
				>
					<Stack sx={{ justifyContent: "center", alignItems: "center" }}>
						<Box my={1}>
							{logo && (
								<Image src={logo} alt="logo" width={50} height={50}></Image>
							)}
						</Box>
						<Box>
							<Typography
								variant="h5"
								component="h5"
								fontWeight={600}
								fontSize={30}
							>
								Online Health Care Login
							</Typography>
						</Box>
					</Stack>
					{error && (
						<Box>
							<Typography
								sx={{
									bgcolor: "red",
									color: "white",
									mt: "5px",
									fontSize: "18px",
								}}
							>
								{error}
							</Typography>
						</Box>
					)}
					<Box>
						<HealthForm
							onSubmit={handleLogin}
							resolver={zodResolver(loginValidationSchema)}
							defaultValues={{
								email: "",
								password: "",
							}}
						>
							<Grid container spacing={2} my={1}>
								<Grid item md={6}>
									<HealthInput
										name="email"
										label="Email"
										type="email"
										fullWidth={true}
									/>
								</Grid>
								<Grid item md={6}>
									<HealthInput
										name="password"
										label="Password"
										type="password"
										fullWidth={true}
									/>
								</Grid>
							</Grid>
							<Typography
								component="p"
								fontWeight={300}
								mb={1}
								textAlign="end"
								sx={{
									"& a:hover": {
										textDecoration: "underline",
									},
								}}
							>
								<Link href="/forgot-password">Forgot Password?</Link>
							</Typography>
							<Button
								type="submit"
								sx={{ my: "10px", fontWeight: 700 }}
								fullWidth
							>
								Login
							</Button>
						</HealthForm>
						<Typography component="p" fontWeight={300} mt={3}>
							Don't have an account?{" "}
							<Link href="/register">
								<Typography component="span" color="#0000EE">
									Create an account
								</Typography>
							</Link>
						</Typography>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default LoginPage;
