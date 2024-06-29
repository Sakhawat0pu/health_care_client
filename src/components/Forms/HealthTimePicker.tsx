import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TTimePicker = {
	name: string;
	label?: string;
	size?: "small" | "medium";
	required?: boolean;
	fullWidth?: boolean;
	sx?: SxProps;
};

const HealthTimePicker = ({
	name,
	label = "",
	fullWidth = true,
	size = "medium",
	required,
	sx,
}: TTimePicker) => {
	const { control, formState } = useFormContext();
	const isError = formState.errors[name] !== undefined;
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={dayjs(new Date().toDateString())}
			render={({ field: { onChange, value, ...field } }) => {
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<TimePicker
							{...field}
							timezone="system"
							label={label}
							value={value || Date.now()}
							onChange={(time) => onChange(time)}
							// sx={{ width: "500px" }}
							slotProps={{
								textField: {
									sx: { ...sx },
									fullWidth: fullWidth,
									required: required,
									size: size,
									variant: "outlined",
									error: isError,
									helperText: isError
										? (formState.errors[name]?.message as string)
										: "",
								},
							}}
						/>
					</LocalizationProvider>
				);
			}}
		/>
	);
};

export default HealthTimePicker;
