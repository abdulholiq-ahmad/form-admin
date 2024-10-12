import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionsList: [
    {
      questions: [
        {
          questionType: "radio",
          required: true,
          questionText: "Question",
          options: ["Option 1", "Option 2", "Option 3"],
        },
      ],
    },
  ],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questionsList = action.payload;
    },
    addQuestion: (state, action) => {
      state.questionsList[0].questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.questionsList[0].questions = state.questionsList[0].questions.filter((_, i) => i !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addOption: (state, action) => {
      const { questionIndex } = action.payload;
      state.questionsList[0].questions[questionIndex].options.push("");
    },
    updateOption: (state, action) => {
      const { questionIndex, optionIndex, value } = action.payload;
      state.questionsList[0].questions[questionIndex].options[optionIndex] = value;
    },
    removeOption: (state, action) => {
      const { questionIndex, optionIndex } = action.payload;
      state.questionsList[0].questions[questionIndex].options.splice(optionIndex, 1);
    },
    setRequired: (state, action) => {
      const { questionIndex, value } = action.payload;
      state.questionsList[0].questions[questionIndex].required = value;
    },
    setQuestionsType: (state, action) => {
      const { questionIndex, value } = action.payload;
      state.questionsList[0].questions[questionIndex].questionType = value;
    },
    updateQuestion: (state, action) => {
      const { questionIndex, questionData } = action.payload;
      state.questionsList[0].questions[questionIndex] = {
        ...state.questionsList[0].questions[questionIndex],
        ...questionData,
      };
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  removeQuestion,
  setLoading,
  setError,
  addOption,
  updateOption,
  removeOption,
  setRequired,
  setQuestionsType,
  updateQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
