/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  currentQuiz: null as any,
  questions: [] as any[],
  currentQuestion: null as any,
  attempts: [] as any[],
  currentAttempt: null as any,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Quiz actions
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },
    setCurrentQuiz: (state, { payload }) => {
      state.currentQuiz = payload;
    },
    addQuiz: (state, { payload }) => {
      state.quizzes = [...state.quizzes, payload];
    },
    updateQuiz: (state, { payload }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === payload._id ? payload : quiz
      );
      if (state.currentQuiz?._id === payload._id) {
        state.currentQuiz = payload;
      }
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== quizId);
    },

    // Question actions
    setQuestions: (state, { payload }) => {
      state.questions = payload;
    },
    setCurrentQuestion: (state, { payload }) => {
      state.currentQuestion = payload;
    },
    addQuestion: (state, { payload }) => {
      state.questions = [...state.questions, payload];
    },
    updateQuestion: (state, { payload }) => {
      state.questions = state.questions.map((question) =>
        question._id === payload._id ? payload : question
      );
      if (state.currentQuestion?._id === payload._id) {
        state.currentQuestion = payload;
      }
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q) => q._id !== questionId);
    },

    // Attempt actions
    setAttempts: (state, { payload }) => {
      state.attempts = payload;
    },
    setCurrentAttempt: (state, { payload }) => {
      state.currentAttempt = payload;
    },
    addAttempt: (state, { payload }) => {
      state.attempts = [...state.attempts, payload];
    },
  },
});

export const {
  setQuizzes,
  setCurrentQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setQuestions,
  setCurrentQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setAttempts,
  setCurrentAttempt,
  addAttempt,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
