"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { authKey } from "@/constants/authKey";
import { useRouter } from "next/navigation";

const resetPasswordValidationSchema = z.object({
	password: z.string().min(5, "Password must be at least 5 characters long!"),
});

const ResetPasswordPage = ({
	searchParams,
}: {
	searchParams: Record<string, any>;
}) => {
	const [error, setError] = useState("");
	const [resetPassword] = useResetPasswordMutation();
	const router = useRouter();

	useEffect(() => {
		if (searchParams?.token) {
			localStorage.setItem(authKey, searchParams.token);
		}
	}, [searchParams.token]);

	const handleResetPassword = async (data: FieldValues) => {
		setError("");
		const payload = {
			password: data?.password,
			userId: searchParams.userId,
		};

		try {
			const res = await resetPassword(payload).unwrap();

			if (res?.id) {
				toast.success("Password has been reset successfully");
				localStorage.removeItem(authKey);
				router.push("/login");
				router.refresh();
			} else {
				setError("Something went wrong, Please try again");
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
						maxWidth: 600,
						width: "100%",
						boxShadow: 1,
						borderRadius: 1,
						p: 4,
						textAlign: "center",
					}}
				>
					<Stack sx={{ justifyContent: "center", alignItems: "center" }}>
						<Box mb={1}>
							<KeyIcon
								sx={{ width: 100, height: 100, color: "primary.main" }}
							/>
						</Box>
						<Box>
							<Typography
								variant="h5"
								component="h5"
								fontWeight={600}
								fontSize={30}
							>
								Reset Password
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
							onSubmit={handleResetPassword}
							resolver={zodResolver(resetPasswordValidationSchema)}
							defaultValues={{
								password: "",
							}}
						>
							<Grid container spacing={2} my={1}>
								<Grid item md={12}>
									<HealthInput
										name="password"
										label="New Password"
										type="password"
										fullWidth={true}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								sx={{ my: "15px", fontWeight: 700 }}
								fullWidth
							>
								Submit
							</Button>
						</HealthForm>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default ResetPasswordPage;
