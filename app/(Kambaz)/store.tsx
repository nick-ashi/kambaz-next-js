import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Database/enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    enrollmentsReducer,
    quizzesReducer,
  },
});
export default store;
