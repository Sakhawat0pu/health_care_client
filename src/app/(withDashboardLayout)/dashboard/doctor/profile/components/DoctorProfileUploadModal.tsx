import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import HealthSelectField from "@/components/Forms/HealthSelectField";
import MultipleSelectChip from "@/components/MultiSelectChip/MultiSelectChip";
import HealthFullModal from "@/components/Shared/HealthFullModal/HealthFullModal";
import { GENDER } from "@/constants/gender";
import { useUpdateADoctorMutation } from "@/redux/api/doctorApi";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TDefaultValues = {
	id: string;
	name: string;
	email: string;
	contactNumber: string;
	registrationNumber: string;
	experience: number;
	gender: string;
	appointmentFee: number;
	qualification: string;
	currentWorkingPlace: string;
	designation: string;
	doctorSpecialties: Array<Record<string, any>>;
};

type TProfileModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: TDefaultValues;
};

const DoctorProfileUploadModal = ({
	open,
	setOpen,
	data,
}: TProfileModalProps) => {
	const specialtiesIds = data?.doctorSpecialties.map(
		(specialties: Record<string, any>) => specialties.specialtiesId
	);

	const { data: allSpecialties } = useGetAllSpecialtiesQuery({});
	const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState(
		specialtiesIds || []
	);
	const [updateDoctor, { isLoading: updating }] = useUpdateADoctorMutation();

	const defaultValues = {
		name: data.name || "",
		contactNumber: data.contactNumber || "",
		registrationNumber: data.registrationNumber || 0,
		experience: data.experience || 0,
		gender: data.gender || "",
		appointmentFee: data.appointmentFee || 0,
		qualification: data.qualification || "",
		currentWorkingPlace: data.currentWorkingPlace || "",
		designation: data.designation || "",
	};

	const handleFormSubmit = async (values: FieldValues) => {
		const selectedSpecialties = selectedSpecialtiesIds.map((id: string) => {
			if (!specialtiesIds.includes(id)) {
				return {
					id: id,
					isDelete: false,
				};
			}
		});

		const specialties =
			selectedSpecialties[0] !== undefined ? selectedSpecialties : [];

		specialtiesIds.forEach((id: string) => {
			if (!selectedSpecialtiesIds.includes(id)) {
				specialties.push({
					id: id,
					isDelete: true,
				});
			}
		});

		values.experience = Number(values.experience);
		values.appointmentFee = Number(values.appointmentFee);

		const excludedFields: Array<keyof typeof values> = [
			"email",
			"id",
			"role",
			"needPasswordChange",
			"status",
			"createdAt",
			"updatedAt",
			"isDeleted",
			"averageRating",
			"review",
			"profilePhoto",
			"registrationNumber",
			"schedules",
			"doctorSpecialties",
		];

		const updatedValues = Object.fromEntries(
			Object.entries(values).filter(
				([key, val]) => !excludedFields.includes(key)
			)
		);

		updatedValues.specialties = specialties;

		try {
			const res = await updateDoctor({
				id: data?.id,
				body: updatedValues,
			}).unwrap();

			if (res.id) {
				toast.success("Your information updated successfully!!");
				setOpen(false);
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<HealthFullModal
			open={open}
			setOpen={setOpen}
			title="Update Profile Information"
		>
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
					<Grid item xs={12} sm={12} md={4}>
						<MultipleSelectChip
							label="Specialties"
							allItems={allSpecialties}
							selectedIds={selectedSpecialtiesIds}
							setSelectedIds={setSelectedSpecialtiesIds}
						/>
					</Grid>
				</Grid>
				<Button type="submit" sx={{ mt: 1 }}>
					Update
				</Button>
			</HealthForm>
		</HealthFullModal>
	);
};

export default DoctorProfileUploadModal;
