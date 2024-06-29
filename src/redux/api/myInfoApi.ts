import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const myInfoApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMyself: builder.query({
			query: () => ({
				url: "/user/me",
				method: "GET",
			}),
			providesTags: [tagTypes.user],
		}),
		updateMyProfile: builder.mutation({
			query: (data) => ({
				url: "/user/me",
				method: "PATCH",
				contentType: "multipart/form-data",
				data: data,
			}),
			invalidatesTags: [tagTypes.user],
		}),
	}),
});

export const { useGetMyselfQuery, useUpdateMyProfileMutation } = myInfoApi;
