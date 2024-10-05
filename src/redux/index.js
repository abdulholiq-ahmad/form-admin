import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import questionReducer from "./slices/questionSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
