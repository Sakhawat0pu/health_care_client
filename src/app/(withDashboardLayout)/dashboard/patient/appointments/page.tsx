"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Box, IconButton } from "@mui/material";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import HealthChips from "@/components/Chips/HealthChips";
import Link from "next/link";
import VideocamIcon from "@mui/icons-material/Videocam";

const AppointmentPage = () => {
	const { data, isLoading } = useGetMyAppointmentsQuery({});

	const appointments = data?.appointments;
	const meta = data?.meta;

	const myColumns: GridColDef[] = [
		{
			field: "name",
			headerName: "Doctor Name",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return row?.doctor?.name;
			},
		},
		{
			field: "appointmentDAte",
			headerName: "Appointment Date",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return dateFormatter(new Date(row.schedule.startDateTime));
			},
		},
		{
			field: "startTime",
			headerName: "Start Time",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return timeFormatter(new Date(row.schedule.startDateTime));
			},
		},
		{
			field: "endTime",
			headerName: "End Time",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return timeFormatter(new Date(row.schedule.endDateTime));
			},
		},
		{
			field: "paymentStatus",
			headerName: "Payment Status",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return row.paymentStatus === "PAID" ? (
					<HealthChips label={row.paymentStatus} type="success" />
				) : (
					<HealthChips label={row.paymentStatus} type="error" />
				);
			},
		},
		{
			field: "action",
			headerName: "Join",
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row }) => {
				return (
					<IconButton
						component={Link}
						href={`/video?videoCallingId=${row?.videoCallingId}`}
						disabled={row.paymentStatus === "UNPAID"}
					>
						<VideocamIcon
							sx={{
								color: row.paymentStatus === "PAID" ? "primary.main" : "",
							}}
						/>
					</IconButton>
				);
			},
		},
	];

	return (
		<Box>
			{!isLoading ? (
				<DataGrid
					rows={appointments ?? []}
					columns={myColumns}
					checkboxSelection
					// onRowSelectionModelChange={(row) => {
					// 	setSelectedIds(row);
					// }}
				/>
			) : (
				<h1>Loading.....</h1>
			)}
		</Box>
	);
};

export default AppointmentPage;
