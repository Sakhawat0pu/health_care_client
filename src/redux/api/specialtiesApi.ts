import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createSpecialties: builder.mutation({
			query: (data) => ({
				url: "/specialties",
				method: "POST",
				contentType: "multipart/form-data",
				data: data,
			}),
			invalidatesTags: [tagTypes.specialties],
		}),

		getAllSpecialties: builder.query({
			query: () => ({
				url: "/specialties",
				method: "GET",
			}),
			providesTags: [tagTypes.specialties],
		}),
		deleteSpecialty: builder.mutation({
			query: (id: string) => ({
				url: `/specialties/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [tagTypes.specialties],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateSpecialtiesMutation,
	useGetAllSpecialtiesQuery,
	useDeleteSpecialtyMutation,
} = specialtiesApi;
