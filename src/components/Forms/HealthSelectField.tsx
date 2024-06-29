import { Controller, useFormContext } from "react-hook-form";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

import { SxProps, TextField } from "@mui/material";

type THealthSelectFieldProps = {
	name: string;
	items: string[];
	label?: string;
	size?: "small" | "medium";
	sx?: SxProps;
	fullWidth?: boolean;
	required?: boolean;
};

const HealthSelectField = ({
	name,
	items,
	label = "",
	size = "small",
	fullWidth = false,
	required = false,
	sx,
}: THealthSelectFieldProps) => {
	const { control, formState } = useFormContext();
	const isError = formState.errors[name] !== undefined;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, ...field } }) => {
				return (
					<TextField
						{...field}
						sx={{ ...sx }}
						select
						size={size}
						label={label}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						fullWidth={fullWidth}
						required={required}
						error={isError}
						helperText={
							isError ? (formState.errors[name]?.message as string) : ""
						}
					>
						{items.map((item: string) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				);
			}}
		/>
	);
};

export default HealthSelectField;
