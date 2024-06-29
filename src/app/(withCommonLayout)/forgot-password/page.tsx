"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import Alert from "@mui/material/Alert";

const forgotPasswordValidationSchema = z.object({
	email: z.string().email("Please enter a valid email address!"),
});

const ForgotPasswordPage = () => {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [forgotPassword, { isSuccess }] = useForgetPasswordMutation();

	const handleEmailSubmit = async (data: FieldValues) => {
		setError("");
		setEmail(data.email);
		try {
			const res = await forgotPassword(data).unwrap();

			if (res?.success === true) {
				toast.success(res?.message);
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
								Forgot Password?
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
						{isSuccess ? (
							<Box mt={2}>
								{email && (
									<Alert severity="success">
										Password reset email sent successfully to {email}, Please
										check your email
									</Alert>
								)}
							</Box>
						) : (
							<HealthForm
								onSubmit={handleEmailSubmit}
								resolver={zodResolver(forgotPasswordValidationSchema)}
								defaultValues={{
									email: "",
								}}
							>
								<Grid container spacing={2} my={1}>
									<Grid item md={12}>
										<HealthInput
											name="email"
											label="Email"
											// type="email"
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
						)}
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default ForgotPasswordPage;
