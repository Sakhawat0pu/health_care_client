import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TDatePicker = {
	name: string;
	label?: string;
	size?: "small" | "medium";
	required?: boolean;
	fullWidth?: boolean;
	sx?: SxProps;
};

const HealthDatePicker = ({
	name,
	label = "",
	fullWidth = true,
	size = "medium",
	required,
	sx,
}: TDatePicker) => {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={dayjs(new Date().toDateString())}
			render={({ field: { onChange, value, ...field } }) => {
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DesktopDatePicker
							{...field}
							timezone="system"
							disablePast
							label={label}
							value={value || Date.now()}
							onChange={(date) => onChange(date)}
							// sx={{ width: "500px" }}
							slotProps={{
								textField: {
									sx: { ...sx },
									fullWidth: fullWidth,
									required: required,
									size: size,
									variant: "outlined",
								},
							}}
						/>
					</LocalizationProvider>
				);
			}}
		/>
	);
};

export default HealthDatePicker;
