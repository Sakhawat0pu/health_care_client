import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		changePassword: build.mutation({
			query: (data) => ({
				url: "/auth/change-password",
				method: "POST",
				data: data,
			}),
			invalidatesTags: [tagTypes.user],
		}),

		resetPassword: build.mutation({
			query: (data: Record<string, any>) => ({
				url: "/auth/reset-password",
				method: "POST",
				data: data,
			}),
			invalidatesTags: [tagTypes.user],
		}),
		forgetPassword: build.mutation({
			query: (data) => ({
				url: "/auth/forgot-password",
				method: "POST",
				data: data,
			}),
			invalidatesTags: [tagTypes.user],
		}),
	}),
	overrideExisting: true,
});

export const {
	useChangePasswordMutation,
	useResetPasswordMutation,
	useForgetPasswordMutation,
} = authApi;
