"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { SxProps, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(2),
	},
}));

type THealthModalProp = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
	children: React.ReactNode;
	sx?: SxProps;
};

export default function HealthModal({
	open,
	setOpen,
	title = "",
	children,
	sx,
}: THealthModalProp) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				sx={{ ...sx }}
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					{title}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>{children}</DialogContent>
				{/* <DialogActions>
					<Button autoFocus onClick={handleClose}>
						Save changes
					</Button>
				</DialogActions> */}
			</BootstrapDialog>
		</React.Fragment>
	);
}
