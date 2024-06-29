"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SpecialtyModal from "./components/SpecialtyModal";
import { useState } from "react";
import {
	useDeleteSpecialtyMutation,
	useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { toast } from "sonner";

const SpecialtiesPage = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { data, isLoading } = useGetAllSpecialtiesQuery(undefined);
	const [deleteSpecialty] = useDeleteSpecialtyMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteSpecialty(id).unwrap();
			if (res.id) {
				toast.success("Specialty deleted successfully!");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const columns: GridColDef[] = [
		{ field: "title", headerName: "Title", width: 600 },
		{
			field: "icon",
			headerName: "Icon",
			flex: 1,
			renderCell: ({ row }) => {
				return (
					<Box sx={{ py: 1 }}>
						<Image src={row.icon} alt="icon" width={28} height={28} />
					</Box>
				);
			},
		},
		{
			field: "Action",
			headerName: "Action",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return (
					<IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
						<DeleteIcon sx={{ color: "red" }} />
					</IconButton>
				);
			},
		},
	];

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignContent="center"
			>
				<Button onClick={() => setOpen(true)}>Create Specialty</Button>
				<SpecialtyModal open={open} setOpen={setOpen} />
				<TextField size="small" placeholder="Search Specialty" />
			</Stack>
			{!isLoading ? (
				<Box my={3}>
					<DataGrid rows={data} columns={columns} />
				</Box>
			) : (
				<h1>Loading...</h1>
			)}
		</Box>
	);
};

export default SpecialtiesPage;
