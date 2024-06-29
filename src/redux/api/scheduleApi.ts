import { TMeta } from "@/types";
import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createSchedule: builder.mutation({
			query: (data) => ({
				url: "/schedule",
				method: "POST",
				data: data,
			}),
			transformResponse: (data: Record<string, any>[], meta: TMeta) => ({
				schedules: data,
				meta,
			}),
			invalidatesTags: [tagTypes.schedule],
		}),
		getAllSchedule: builder.query({
			query: (args: Record<string, any>) => ({
				url: "/schedule",
				method: "GET",
				params: args,
			}),
			// transformResponse: (data: Record<string, any>[], meta: TMeta) => ({
			// 	schedules: data,
			// 	meta,
			// }),
			providesTags: [tagTypes.schedule],
		}),
		deleteSchedule: builder.mutation({
			query: (id: string) => ({
				url: `/schedule/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.schedule],
		}),
	}),
});

export const {
	useCreateScheduleMutation,
	useGetAllScheduleQuery,
	useDeleteScheduleMutation,
} = scheduleApi;
