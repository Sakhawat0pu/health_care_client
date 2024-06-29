import HealthFileUploader from "@/components/Forms/HealthFileUploader";
import HealthForm from "@/components/Forms/HealthForm";
import HealthInput from "@/components/Forms/HealthInput";
import HealthModal from "@/components/Shared/HealthModal/HealthModal";
import { useCreateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import { convertToFormData } from "@/utils/convertToFormData";
import { Button, Grid, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TSpecialtyModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TSpecialtyModalProps) => {
	const [createSpecialties, { isError, error }] =
		useCreateSpecialtiesMutation();

	const handleFormSubmit = async (values: FieldValues) => {
		const data = convertToFormData(values);
		try {
			const res = await createSpecialties(data).unwrap();
			if (res.id) {
				setOpen(false);
				toast.success("Specialty created successfully.");
			}
			if (isError) {
				setOpen(false);
				toast.error("Something went wrong!!!");
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<HealthModal open={open} setOpen={setOpen} title="Create a new Specialty">
			<HealthForm onSubmit={handleFormSubmit}>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<HealthInput name="title" label="Title" />
					</Grid>
					<Grid item md={6}>
						<HealthFileUploader
							name="file"
							label="Upload File"
							sx={{ py: "8.5px" }}
						/>
					</Grid>
				</Grid>
				<Button type="submit" sx={{ mt: 1 }}>
					Create
				</Button>
			</HealthForm>
		</HealthModal>
	);
};

export default SpecialtyModal;
