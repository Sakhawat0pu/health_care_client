"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import EditIcon from "@mui/icons-material/Edit";
import {
	useDeleteDoctorMutation,
	useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hook";
import Link from "next/link";

const DoctorPage = () => {
	const [open, setOpen] = useState(false);
	const query: Record<string, any> = {};
	const [searchTerm, setSearchTerm] = useState<string>("");
	const debouncedValue = useDebounced({ searchTerm, delay: 600 });
	if (debouncedValue) {
		query["searchTerm"] = searchTerm;
	}
	const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
	const [deleteDoctor] = useDeleteDoctorMutation();
	const doctor = data?.doctor;
	const meta = data?.meta;

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteDoctor(id).unwrap();
			if (res.id) {
				toast.success("Doctor deleted successfully!");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "gender", headerName: "Gender", flex: 1 },
		{ field: "contactNumber", headerName: "Contact No.", flex: 1 },
		{
			field: "Action",
			headerName: "Action",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return (
					<Box>
						<IconButton
							aria-label="delete"
							onClick={() => handleDelete(row.id)}
						>
							<GridDeleteIcon sx={{ color: "red" }} />
						</IconButton>
						<Link href={`/dashboard/admin/doctors/update/${row.id}`}>
							<IconButton aria-label="delete">
								<EditIcon sx={{ color: "blue" }} />
							</IconButton>
						</Link>
					</Box>
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
				<Button onClick={() => setOpen(true)}>Create New Doctor</Button>
				<DoctorModal open={open} setOpen={setOpen} />
				<TextField
					onChange={(e) => setSearchTerm(e.target.value)}
					size="small"
					placeholder="Search Specialty"
				/>
			</Stack>
			{!isLoading ? (
				<Box my={3}>
					<DataGrid rows={doctor} columns={columns} />
				</Box>
			) : (
				<h1>Loading...</h1>
			)}
		</Box>
	);
};

export default DoctorPage;
