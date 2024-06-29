import { tagTypes } from "../tagType";
import { baseApi } from "./baseApi";

export const BASE_STUDENT_SEMESTER_PAYMENT = "/student-semester-payments";

const paymentApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		initialPayment: build.mutation({
			query: (id: string) => ({
				url: `/payment/init-payment/${id}`,
				method: "POST",
			}),
			invalidatesTags: [tagTypes.payment],
		}),
	}),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;
