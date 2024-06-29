"use client";

import {
	Box,
	Button,
	Divider,
	IconButton,
	Pagination,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import { useGetAllScheduleQuery } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { TFormattedSchedule, TMeta, TSchedule } from "@/types";
import {
	DataGrid,
	GridColDef,
	GridDeleteIcon,
	GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
	useCreateDoctorScheduleMutation,
	useDeleteMySchedulesMutation,
	useGetMySchedulesQuery,
} from "@/redux/api/doctorScheduleApi";
import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";

const schedulesPage = () => {
	const [open, setOpen] = useState(false);
	const [startDateTime, setStartDateTime] = useState("");
	const [endDateTime, setEndDateTime] = useState("");
	const [allSchedule, setAllSchedule] = useState<TFormattedSchedule[]>([]);
	const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
	const [closeAvailableSlot, setCloseAvailableSlot] = useState(false);
	const [myFormattedSchedule, setMyFormattedSchedule] = useState<
		TFormattedSchedule[]
	>([]);
	const [page, setPage] = useState(1);

	const { data, isLoading } = useGetAllScheduleQuery(
		{
			startDateTime: startDateTime,
			endDateTime: endDateTime,
			sortBy: "startDateTime",
			sortOrder: "asc",
		},
		{ skip: !startDateTime }
	);

	const [createDoctorSchedule] = useCreateDoctorScheduleMutation();
	const { data: mySchedulesData, isLoading: isScheduleLoading } =
		useGetMySchedulesQuery({
			sortBy: "startDateTime",
			sortOrder: "asc",
			limit: 10,
			page: page,
		});

	const mySchedules = mySchedulesData?.data;
	const myScheduleMeta = mySchedulesData?.meta;

	const [deleteMySchedule] = useDeleteMySchedulesMutation();

	const handleDeleteMySchedule = async (id: string) => {
		try {
			const res = await deleteMySchedule(id).unwrap();

			if (res.id) {
				toast.success("Doctor schedule deleted successfully.");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const schedules = data?.data;

	const handleCreateDoctorSchedule = async () => {
		try {
			const res = await createDoctorSchedule({
				scheduleIds: selectedIds,
			}).unwrap();

			if (res.count > 0) {
				toast.success("Doctor schedule created successfully.");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	useEffect(() => {
		const formattedSchedule = schedules?.map((schedule: TSchedule) => {
			return {
				id: schedule?.id,
				startDate: dateFormatter(new Date(schedule?.startDateTime)),
				endDate: dateFormatter(new Date(schedule?.endDateTime)),
				startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
				endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
			};
		});

		if (mySchedules?.length) {
			const myFormattedSchedule = mySchedules?.map((mySchedule: any) => {
				return {
					id: mySchedule?.scheduleId,
					startDate: dateFormatter(
						new Date(mySchedule?.schedule?.startDateTime)
					),
					endDate: dateFormatter(new Date(mySchedule?.schedule?.endDateTime)),
					startTime: dayjs(mySchedule?.schedule?.startDateTime).format(
						"hh:mm a"
					),
					endTime: dayjs(mySchedule?.schedule?.endDateTime).format("hh:mm a"),
					isBooked: mySchedule?.isBooked,
				};
			});

			setMyFormattedSchedule(myFormattedSchedule);
		}

		setAllSchedule(formattedSchedule);
	}, [schedules, mySchedules, isScheduleLoading]);

	const columns: GridColDef[] = [
		{ field: "startDate", headerName: "Start Date", flex: 1 },
		{ field: "endDate", headerName: "End Date", flex: 1 },
		{ field: "startTime", headerName: "Start Time", flex: 1 },
		{ field: "endTime", headerName: "End Time", flex: 1 },
	];
	const myColumns: GridColDef[] = [
		{ field: "startDate", headerName: "Start Date", flex: 1 },
		{ field: "endDate", headerName: "End Date", flex: 1 },
		{ field: "startTime", headerName: "Start Time", flex: 1 },
		{ field: "endTime", headerName: "End Time", flex: 1 },
		{ field: "isBooked", headerName: "Booked?", flex: 1 },
		{
			field: "Action",
			headerName: "Action",
			flex: 1,
			renderCell: ({ row }) => {
				return (
					<IconButton
						aria-label="delete"
						onClick={() => handleDeleteMySchedule(row.id)}
					>
						<GridDeleteIcon sx={{ color: "red" }} />
					</IconButton>
				);
			},
		},
	];

	return (
		<Box mt={2}>
			<Button onClick={() => setOpen(true)} endIcon={<AddIcon />}>
				Check Available Schedule
			</Button>
			<DoctorScheduleModal
				open={open}
				setOpen={setOpen}
				setStartDateTime={setStartDateTime}
				setEndDateTime={setEndDateTime}
				setCloseAvailableSlot={setCloseAvailableSlot}
			/>
			<Box my={5} display={closeAvailableSlot ? "none" : "visible"}>
				{!isLoading && data !== undefined ? (
					<Box my={3}>
						<Typography component="h4" variant="h4" color="primary.main" mb={2}>
							Available Slots
						</Typography>
						<Stack direction="row" justifyContent="space-between" mb={2}>
							<Box>
								<Button
									onClick={handleCreateDoctorSchedule}
									disabled={selectedIds.length === 0}
								>
									Create Doctor Schedule
								</Button>
							</Box>
							<Box>
								<Button onClick={() => setCloseAvailableSlot(true)}>
									Close
								</Button>
							</Box>
						</Stack>
						<Box>
							<DataGrid
								rows={allSchedule ?? []}
								columns={columns}
								checkboxSelection
								onRowSelectionModelChange={(row) => {
									setSelectedIds(row);
								}}
							/>
						</Box>
					</Box>
				) : (
					""
				)}
			</Box>
			{myFormattedSchedule?.length > 0 ? (
				<Box>
					<Typography component="h4" variant="h4" color="primary.main" my={2}>
						My Schedules
					</Typography>
					<DataGrid
						rows={myFormattedSchedule ?? []}
						columns={myColumns}
						hideFooterPagination
						slots={{
							footer: () => (
								<Box>
									<Divider></Divider>
									<Stack
										spacing={2}
										my={2}
										justifyContent="center"
										alignItems="center"
									>
										<Pagination
											count={myScheduleMeta?.totalPages}
											page={page}
											onChange={handlePageChange}
											color="primary"
										/>
									</Stack>
								</Box>
							),
						}}
					/>
				</Box>
			) : (
				""
			)}
		</Box>
	);
};

export default schedulesPage;
