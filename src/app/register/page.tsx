"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/svgs/logo.svg";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { convertToFormData } from "@/utils/convertToFormData";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import { loginUser } from "@/services/actions/loginUser";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationValidationSchema = z.object({
	password: z
		.string()
		.min(5, "Password must be at least five characters long!"),
	patient: z.object({
		name: z.string().min(1, "Please enter your name!"),
		email: z.string().email("Please enter a valid email address!"),
		contactNumber: z
			.string()
			.regex(/^\d{11}$/, "Please enter a valid contact number!"),
		address: z.string().min(1, "Please enter your address!"),
	}),
});

const defaultValues = {
	password: "",
	patient: {
		name: "",
		email: "",
		contactNumber: "",
		address: "",
	},
};

const RegisterPage = () => {
	const router = useRouter();

	const handleRegister = async (data: FieldValues) => {
		const payload = convertToFormData(data);
		try {
			const res = await registerPatient(payload);
			if (res?.data?.id) {
				toast.success(res?.message);
				const loggedInInfo = await loginUser({
					email: data?.patient?.email,
					password: data?.password,
				});
				if (loggedInInfo?.data?.accessToken) {
					// toast.success(res?.message);
					storeUserInfo(loggedInInfo.data.accessToken);
					router.push("/dashboard/patient");
				}
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
							<Image src={logo} alt="logo" width={50} height={50}></Image>
						</Box>
						<Box>
							<Typography
								variant="h6"
								component="h6"
								fontWeight={600}
								fontSize={30}
							>
								Patient Register
							</Typography>
						</Box>
					</Stack>
					<Box>
						<HealthForm
							onSubmit={handleRegister}
							resolver={zodResolver(registrationValidationSchema)}
							defaultValues={defaultValues}
						>
							<Grid container spacing={2} my={1}>
								<Grid item md={12}>
									<HealthInput
										name="patient.name"
										label="Name"
										fullWidth={true}
									/>
								</Grid>
								<Grid item md={6}>
									<HealthInput
										name="patient.email"
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
								<Grid item md={6}>
									<HealthInput
										name="patient.contactNumber"
										label="Contact Number"
										type="tel"
										fullWidth={true}
									/>
								</Grid>
								<Grid item md={6}>
									<HealthInput
										name="patient.address"
										label="Address"
										fullWidth={true}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								sx={{ my: "40px", fontWeight: 700 }}
								fullWidth
							>
								Register
							</Button>
						</HealthForm>
						<Typography component="p" fontWeight={300}>
							Already have an account?{" "}
							<Link href="/login">
								<Typography component="span" color="#0000EE">
									Login
								</Typography>
							</Link>
						</Typography>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default RegisterPage;
