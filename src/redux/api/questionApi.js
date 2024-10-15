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
    getSingeQuestion: build.query({
      query: ({ id, lang }) => ({
        url: `/survey/${id}/${lang}`,
        method: "GET",
      }),
      providesTags: ["Questions"],
    }),
    postLanguage: build.mutation({
      query: (body) => ({
        url: "/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    postQuestion: build.mutation({
      query: (body) => ({
        url: "/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const { usePostQuestionMutation, useGetQuestionsQuery, useGetSingeQuestionQuery } = questionApi;
