import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import HealthSelectField from "@/components/Forms/HealthSelectField";
import HealthFullModal from "@/components/Shared/HealthFullModal/HealthFullModal";
import { GENDER } from "@/constants/gender";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { convertToFormData } from "@/utils/convertToFormData";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TSpecialtyModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
	password: "",
	doctor: {
		name: "",
		email: "",
		contactNumber: "",
		registrationNumber: "",
		experience: 0,
		gender: "",
		appointmentFee: 0,
		qualification: "",
		currentWorkingPlace: "",
		designation: "",
	},
};

const DoctorModal = ({ open, setOpen }: TSpecialtyModalProps) => {
	const [createDoctor] = useCreateDoctorMutation();

	const handleFormSubmit = async (values: FieldValues) => {
		values.doctor.experience = Number(values.doctor.experience);
		values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
		const data = convertToFormData(values);
		try {
			const res = await createDoctor(data).unwrap();

			if (res.id) {
				setOpen(false);
				toast.success("Doctor created successfully!");
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<HealthFullModal open={open} setOpen={setOpen} title="Create A New Doctor">
			<HealthForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
				<Grid container spacing={2} sx={{ my: 5 }}>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.name"
							label="Name"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.email"
							label="Email"
							type="email"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="password"
							label="Password"
							type="password"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.contactNumber"
							label="Contact Number"
							type="tel"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.registrationNumber"
							label="Registration Number"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.experience"
							label="Years of Experience"
							type="number"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthSelectField
							name="doctor.gender"
							items={GENDER}
							label="Gender"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.appointmentFee"
							label="Appointment Fee"
							type="number"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.qualification"
							label="Qualification"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.currentWorkingPlace"
							label="Current Working Place"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<HealthInput
							name="doctor.designation"
							label="Designation"
							fullWidth={true}
							sx={{ mb: 2 }}
						/>
					</Grid>
				</Grid>
				<Button type="submit" sx={{ mt: 1 }}>
					Create
				</Button>
			</HealthForm>
		</HealthFullModal>
	);
};

export default DoctorModal;
