import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import todolistReducer from "./GlobalState/todolistSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todolist: todolistReducer,
  },
});
export default store;
