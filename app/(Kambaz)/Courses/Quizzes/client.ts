/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api`;

// Quiz APIs
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}/publish`
  );
  return response.data;
};

export const unpublishQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}/unpublish`
  );
  return response.data;
};

// Question APIs
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/questions`
  );
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/questions/${questionId}`
  );
  return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/questions/${questionId}`
  );
  return response.data;
};

// Quiz Attempt APIs
export const findAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/attempts`
  );
  return response.data;
};

export const findAttemptsForUserAndQuiz = async (
  userId: string,
  quizId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/users/${userId}/quizzes/${quizId}/attempts`
  );
  return response.data;
};

export const findLatestAttemptForUserAndQuiz = async (
  userId: string,
  quizId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/users/${userId}/quizzes/${quizId}/latest-attempt`
  );
  return response.data;
};

export const submitQuizAttempt = async (
  userId: string,
  quizId: string,
  courseId: string,
  answers: any[]
) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/users/${userId}/quizzes/${quizId}/attempts`,
    { answers, courseId }
  );
  return response.data;
};
