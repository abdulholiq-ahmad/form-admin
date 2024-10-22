import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { signOut } from "../slices/authSlice";
const isDev = true;
const url = isDev ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_SERVER;

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: url,
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
    console.error("Unauthorized - Token is invalid or expired.");
    dispatch(signOut());
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
  tagTypes: ["Users", "Questions"],
  endpoints: () => ({}),
});
