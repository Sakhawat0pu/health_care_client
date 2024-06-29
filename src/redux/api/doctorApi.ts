import { TMeta } from "@/types";
import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

export const doctorApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createDoctor: builder.mutation({
			query: (data) => ({
				url: "/user/create-doctor",
				method: "POST",
				contentType: "multipart/form-data",
				data: data,
			}),
			invalidatesTags: [tagTypes.doctor],
		}),
		getAllDoctors: builder.query({
			query: (args: Record<string, any>) => ({
				url: "/doctor",
				method: "GET",
				params: args,
			}),
			transformResponse: (data: Record<string, any>[], meta: TMeta) => ({
				doctor: data,
				meta,
			}),
			providesTags: [tagTypes.doctors],
		}),
		getSingleDoctor: builder.query({
			query: (id: string | undefined) => ({
				url: `/doctor/${id}`,
				method: "GET",
			}),
			providesTags: [tagTypes.doctor],
		}),
		updateADoctor: builder.mutation({
			query: (data) => ({
				url: `/doctor/${data?.id}`,
				method: "PATCH",
				data: data?.body,
			}),
			invalidatesTags: [tagTypes.doctor, tagTypes.doctors, tagTypes.user],
		}),
		deleteDoctor: builder.mutation({
			query: (id: string) => ({
				url: `/doctor/soft/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.doctor],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateDoctorMutation,
	useGetAllDoctorsQuery,
	useDeleteDoctorMutation,
	useGetSingleDoctorQuery,
	useUpdateADoctorMutation,
} = doctorApi;
