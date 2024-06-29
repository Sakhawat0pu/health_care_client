import HealthDatePicker from "@/components/Forms/HealthDatePicker";
import HealthForm from "@/components/Forms/HealthForm";
import HealthTimePicker from "@/components/Forms/HealthTimePicker";
import HealthModal from "@/components/Shared/HealthModal/HealthModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TScheduleModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TScheduleModalProps) => {
	const [createSchedule] = useCreateScheduleMutation();

	const handleFormSubmit = async (values: FieldValues) => {
		values.startDate = dateFormatter(new Date(values.startDate));
		values.endDate = dateFormatter(new Date(values.endDate));
		values.startTime = timeFormatter(new Date(values.startTime));
		values.endTime = timeFormatter(new Date(values.endTime));

		try {
			const res = await createSchedule(values).unwrap();

			if (res.schedules.length) {
				toast.success("Schedules created successfully!");
				setOpen(false);
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};
	return (
		<HealthModal open={open} setOpen={setOpen} title="Create New Schedule">
			<HealthForm onSubmit={handleFormSubmit}>
				<Grid container spacing={2} mb={2} sx={{ width: "500px" }}>
					<Grid item md={12}>
						<HealthDatePicker name="startDate" label="Start Date" />
					</Grid>
					<Grid item md={12}>
						<HealthDatePicker name="endDate" label="End Date" />
					</Grid>
					<Grid item md={6}>
						<HealthTimePicker name="startTime" label="Start Time" />
					</Grid>
					<Grid item md={6}>
						<HealthTimePicker name="endTime" label="End Time" />
					</Grid>
				</Grid>
				<Button type="submit">Create</Button>
			</HealthForm>
		</HealthModal>
	);
};

export default ScheduleModal;
