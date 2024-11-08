import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signInRequest: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error("Failed to save token:", error);
        }
      },
    }),

    checkUserRequest: build.query({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
      }),
      providesTags: ["Users"],

      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error("Failed to save token:", error);
        }
      },
    }),
  }),
});

export const { useSignInRequestMutation, useCheckUserRequestQuery } = authApi;
