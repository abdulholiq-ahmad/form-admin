import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { signOut } from "../slices/authSlice";

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let response = await rawBaseQuery(args, api, extraOptions);

  if (response.error && response.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshResponse = await rawBaseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResponse?.data) {
        localStorage.setItem("token", JSON.stringify(refreshResponse.data.token));
        if (refreshResponse.data.refreshToken) {
          localStorage.setItem("refreshToken", JSON.stringify(refreshResponse.data.refreshToken));
        }

        response = await rawBaseQuery(args, api, extraOptions);
      } else {
        console.error("Failed to refresh token.");
        dispatch(signOut());
      }
    } else {
      dispatch(signOut());
    }
  }

  if (response.error && response.error.status === 403) {
    console.error("Forbidden access - You do not have permission to access this resource.");
    dispatch(signOut());
  }

  return response;
};

const fetchBaseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ["CARS"],
  endpoints: () => ({}),
});
