"use client";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import HealthSelectField from "@/components/Forms/HealthSelectField";
import { GENDER } from "@/constants/gender";
import {
	useGetSingleDoctorQuery,
	useUpdateADoctorMutation,
} from "@/redux/api/doctorApi";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TDynamicProps = {
	params: {
		doctorId: string;
	};
};

type TDoctorData = {
	name: string;
	contactNumber: string;
	registrationNumber: string;
	experience: number;
	gender: string;
	appointmentFee: number;
	qualification: string;
	currentWorkingPlace: string;
	designation: string;
	[key: string]: string | number; // Index signature allowing string or number values
};

const defaultValues: TDoctorData = {
	name: "",
	contactNumber: "",
	registrationNumber: "",
	experience: 0,
	gender: "",
	appointmentFee: 0,
	qualification: "",
	currentWorkingPlace: "",
	designation: "",
};

const DoctorUpdatePage = ({ params }: TDynamicProps) => {
	const { data, isLoading } = useGetSingleDoctorQuery(params?.doctorId);
	const [updateDoctorInfo] = useUpdateADoctorMutation();
	const router = useRouter();

	if (!isLoading) {
		Object.keys(defaultValues).forEach(
			(key: string) => (defaultValues[key] = data[key])
		);
	}

	const handleFormSubmit = async (values: FieldValues) => {
		values.experience = Number(values.experience);
		values.appointmentFee = Number(values.appointmentFee);

		try {
			const res = await updateDoctorInfo({
				id: params?.doctorId,
				body: values,
			}).unwrap();

			if (res.id) {
				toast.success("Doctor information updated successfully!");
				router.push("/dashboard/admin/doctors");
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Box>
			<Typography variant="h4" component="h4" color="primary.main">
				Update Doctor Information
			</Typography>
			{isLoading ? (
				"Loading..."
			) : (
				<HealthForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
					<Grid container spacing={2} sx={{ my: 5 }}>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="name"
								label="Name"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="contactNumber"
								label="Contact Number"
								type="tel"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="registrationNumber"
								label="Registration Number"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="experience"
								label="Years of Experience"
								type="number"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthSelectField
								name="gender"
								items={GENDER}
								label="Gender"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="appointmentFee"
								label="Appointment Fee"
								type="number"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="qualification"
								label="Qualification"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="currentWorkingPlace"
								label="Current Working Place"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<HealthInput
								name="designation"
								label="Designation"
								fullWidth={true}
								sx={{ mb: 2 }}
							/>
						</Grid>
					</Grid>
					<Button type="submit" sx={{ mt: 1 }}>
						Update
					</Button>
				</HealthForm>
			)}
		</Box>
	);
};

export default DoctorUpdatePage;
