import { TMeta } from "@/types";
import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const doctorScheduleApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createDoctorSchedule: build.mutation({
			query: (data) => ({
				url: "/doctor-schedule",
				method: "POST",
				data: data,
			}),
			invalidatesTags: [tagTypes.doctorSchedule],
		}),
		getMySchedules: build.query({
			query: (args: Record<string, any>) => ({
				url: "/doctor-schedule/my-schedule",
				method: "GET",
				params: args,
			}),
			providesTags: [tagTypes.doctorSchedule],
			transformResponse: (data: Record<string, any>[], meta: TMeta) => ({
				data: data,
				meta: meta,
			}),
		}),
		getAllDoctorSchedules: build.query({
			query: (arg: Record<string, any>) => {
				return {
					url: "/doctor-schedule",
					method: "GET",
					params: arg,
				};
			},
			transformResponse: (response: [], meta: TMeta) => {
				return {
					doctorSchedules: response,
					meta,
				};
			},
			providesTags: [tagTypes.doctorSchedule],
		}),
		deleteMySchedules: build.mutation({
			query: (id: string) => ({
				url: `/doctor-schedule/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.doctorSchedule],
		}),
	}),
});

export const {
	useCreateDoctorScheduleMutation,
	useGetMySchedulesQuery,
	useDeleteMySchedulesMutation,
	useGetAllDoctorSchedulesQuery,
} = doctorScheduleApi;
