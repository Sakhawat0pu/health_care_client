"use client";
import HealthModal from "@/components/Shared/HealthModal/HealthModal";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Stack } from "@mui/material";

type TDoctorScheduleModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setStartDateTime: React.Dispatch<React.SetStateAction<string>>;
	setEndDateTime: React.Dispatch<React.SetStateAction<string>>;
	setCloseAvailableSlot: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({
	open,
	setOpen,
	setStartDateTime,
	setEndDateTime,
	setCloseAvailableSlot,
}: TDoctorScheduleModalProps) => {
	const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

	const chosenDate = new Date(selectedDate);
	const nextDate = new Date(chosenDate.getTime() + 24 * 60 * 60 * 1000);

	const handleCheck = () => {
		setStartDateTime(chosenDate.toISOString());
		setEndDateTime(nextDate.toISOString());
		setOpen(false);
		setCloseAvailableSlot(false);
	};

	return (
		<HealthModal open={open} setOpen={setOpen} title="Check Available Schedule">
			<Stack direction="row" gap={5}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DesktopDatePicker
						timezone="system"
						disablePast
						label="Choose Date"
						value={dayjs(selectedDate) || Date.now()}
						onChange={(date) =>
							setSelectedDate(date?.toDate().toDateString() as string)
						}
						sx={{ width: "300px" }}
						slotProps={{
							textField: {
								fullWidth: true,
								size: "medium",
							},
						}}
					/>
				</LocalizationProvider>
				<Button onClick={handleCheck}>Check</Button>
			</Stack>
		</HealthModal>
	);
};

export default DoctorScheduleModal;
