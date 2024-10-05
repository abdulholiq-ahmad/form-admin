import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export qilish
export const { setQuestions, setLoading, setError } = questionSlice.actions;
export default questionSlice.reducer;
