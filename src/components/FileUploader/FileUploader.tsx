import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Input } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

type TFileUploaderProps = {
	name: string;
	label?: string;
	onFileUpload: (file: File) => void;
	fullWidth?: boolean;
	variant: "contained" | "outlined" | "text";
	sx?: SxProps;
};

export default function FileUploader({
	name,
	label,
	sx,
	variant = "contained",
	fullWidth = true,
	onFileUpload,
}: TFileUploaderProps) {
	return (
		<Box>
			<Button
				component="label"
				role={undefined}
				variant={variant}
				tabIndex={-1}
				fullWidth={fullWidth}
				startIcon={<CloudUploadIcon />}
				sx={{ ...sx }}
			>
				{label || "Upload File"}
				<Input
					size="small"
					type="file"
					style={{ display: "none" }}
					onChange={(e) =>
						onFileUpload((e.target as HTMLInputElement).files?.[0] as File)
					}
				/>
			</Button>
		</Box>
	);
}
