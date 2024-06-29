"use client";
import {
	Box,
	Button,
	Divider,
	IconButton,
	Pagination,
	Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	useDeleteScheduleMutation,
	useGetAllScheduleQuery,
} from "@/redux/api/scheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { dateFormatter } from "@/utils/dateFormatter";
import { TFormattedSchedule, TMeta, TSchedule } from "@/types";
import dayjs from "dayjs";

const SchedulePage = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [allSchedule, setAllSchedule] = useState<TFormattedSchedule[]>([]);
	const [page, setPage] = useState<number>(1);

	const { data, isLoading } = useGetAllScheduleQuery({
		sortBy: "startDateTime",
		sortOrder: "asc",
		limit: 10,
		page: page,
	});
	const [deleteSchedule] = useDeleteScheduleMutation();
	const schedules = data?.data;
	const meta: TMeta = data?.meta;

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

		setAllSchedule(formattedSchedule);
	}, [schedules]);

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteSchedule(id).unwrap();
			if (res.id) {
				toast.success("Schedule deleted successfully!");
			}
		} catch (err: any) {
			console.error(err.message);
		}
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleEdit = async (id: string) => {};

	const columns: GridColDef[] = [
		{ field: "startDate", headerName: "Start Date", flex: 1 },
		{ field: "endDate", headerName: "End Date", flex: 1 },
		{ field: "startTime", headerName: "Start Time", flex: 1 },
		{ field: "endTime", headerName: "End Time", flex: 1 },
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
							<DeleteIcon sx={{ color: "red" }} />
						</IconButton>
						<IconButton aria-label="delete" onClick={() => handleEdit(row.id)}>
							<EditIcon sx={{ color: "blue" }} />
						</IconButton>
					</Box>
				);
			},
		},
	];

	return (
		<Box>
			<Button onClick={() => setOpen(true)}>Create Schedule</Button>
			<ScheduleModal open={open} setOpen={setOpen} />
			<Box my={5}>
				{!isLoading ? (
					<Box my={3}>
						<DataGrid
							rows={allSchedule ?? []}
							columns={columns}
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
												count={meta.totalPages}
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
					<h1>Loading...</h1>
				)}
			</Box>
		</Box>
	);
};

export default SchedulePage;
