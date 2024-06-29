"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { loginUser } from "@/services/actions/loginUser";
import {
	getUserInfo,
	removeUser,
	storeUserInfo,
} from "@/services/auth.services";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { removeTokensFromCookies } from "@/services/actions/removeTokensFromCookies";
import { useRouter } from "next/navigation";

const changePasswordValidationSchema = z.object({
	oldPassword: z
		.string()
		.min(5, "Password must be at least 5 characters long!"),
	newPassword: z
		.string()
		.min(5, "Password must be at least 5 characters long!"),
});

const ChangePasswordPage = () => {
	const [error, setError] = useState("");
	const [changePassword] = useChangePasswordMutation();
	const router = useRouter();
	const handleChangePassword = async (data: FieldValues) => {
		try {
			const res = await changePassword(data).unwrap();
			if (res?.id) {
				toast.success("Password changed successfully!");
				removeTokensFromCookies();
				removeUser();
				router.push("/login");
			} else {
				setError("Incorrect old password");
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
					height: "80vh",
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
						<Box my={1}>
							<KeyIcon
								sx={{ width: "100px", height: "100px", color: "primary.main" }}
							/>
						</Box>
						<Box>
							<Typography
								variant="h5"
								component="h5"
								fontWeight={600}
								fontSize={30}
							>
								Change Password
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
							onSubmit={handleChangePassword}
							resolver={zodResolver(changePasswordValidationSchema)}
							defaultValues={{
								oldPassword: "",
								newPassword: "",
							}}
						>
							<Grid container spacing={2} my={1}>
								<Grid item md={12}>
									<HealthInput
										name="oldPassword"
										label="Old Password"
										type="password"
										fullWidth={true}
									/>
								</Grid>
								<Grid item md={12}>
									<HealthInput
										name="newPassword"
										label="New Password"
										type="password"
										fullWidth={true}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								sx={{ my: "10px", fontWeight: 700 }}
								fullWidth
							>
								Change Password
							</Button>
						</HealthForm>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default ChangePasswordPage;
