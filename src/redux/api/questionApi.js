import { api } from "../api";

const questionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query({
      query: () => ({
        url: "/survey",
        method: "GET",
      }),
      providesTags: ["Questions"],
    }),
    createQuestion: build.mutation({
      query: (body) => ({
        url: "/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const { useCreateQuestionMutation, useGetQuestionsQuery } = questionApi;
