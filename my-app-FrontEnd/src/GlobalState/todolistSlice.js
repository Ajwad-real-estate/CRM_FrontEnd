import { createSlice } from "@reduxjs/toolkit";
import todoData from "../data/todoData";
import { checkTaskDateValidation } from "../helpers/dates";
import toast from "react-hot-toast";

const initialState = {
  todos: [],
};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    addTask: {
      prepare(
        title,
        deadLineDate,
        deadLineTime,
        startDate,
        startTime,
        taskDetails,
        priority
      ) {
        return {
          payload: {
            title,
            deadLineDate,
            deadLineTime,
            startDate,
            startTime,
            taskDetails,
            priority,
          },
        };
      },
      reducer(state, action) {
        if (
          !action.payload.deadLineDate ||
          !action.payload.deadLineTime ||
          !action.payload.title
        ) {
          return;
        }
        const newTodo = {
          id: (state.todos.length + 1).toString(),
          title: action.payload.title,
          deadLineDate: action.payload.deadLineDate,
          deadLineTime: action.payload.deadLineTime,
          completed: false,
          startTime: action.payload.startTime,
          startDate: action.payload.startDate,
          taskDetails: action.payload.taskDetails,
          priority: action.payload.priority,
        };
        if (action.payload.startDate && action.payload.startTime) {
          if (
            !checkTaskDateValidation(
              action.payload.startDate,
              action.payload.startTime,
              action.payload.deadLineDate,
              action.payload.deadLineTime
            )
          ) {
            toast.error("Task Time is not valid");
            return;
          }
        }
        toast.success("Task added Successfully");

        state.todos = [...state.todos, newTodo];

        state.todos.sort((a, b) => b.priority - a.priority);
      },
    },
    markTaskCompleted: (state, action) => {
      const task = state.todos.find((todo) => todo.id === action.payload);
      if (task) {
        task.completed = true; // Mark task as completed
      }
    },
    deleteTaskImmediate: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    handleEditTask: {
      prepare(
        title,
        deadLineDate,
        deadLineTime,
        startDate,
        startTime,
        taskDetails,
        id,
        priority
      ) {
        return {
          payload: {
            title,
            deadLineDate,
            deadLineTime,
            startDate,
            startTime,
            taskDetails,
            id,
            priority,
          },
        };
      },
      reducer: (state, action) => {
        if (
          !action.payload.deadLineDate ||
          !action.payload.deadLineTime ||
          !action.payload.title
        ) {
          return;
        }

        if (action.payload.startDate && action.payload.startTime) {
          if (
            !checkTaskDateValidation(
              action.payload.startDate,
              action.payload.startTime,
              action.payload.deadLineDate,
              action.payload.deadLineTime
            )
          ) {
            toast.error("Task Time is not valid");
            return;
          }
        }
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
                deadLineDate: action.payload.deadLineDate,
                deadLineTime: action.payload.deadLineTime,
                completed: false,
                startTime: action.payload.startTime,
                startDate: action.payload.startDate,
                taskDetails: action.payload.taskDetails,
                priority: action.payload.priority,
              }
            : todo
        );
        toast.success("Task Edited Successfully");
        state.todos.sort((a, b) => b.priority - a.priority);
      },
    },
  },
});

export const {
  addTask,
  markTaskCompleted,
  deleteTaskImmediate,
  handleEditTask,
} = todolistSlice.actions;

// Async thunk for delayed deletion
export const deleteTask = (id) => (dispatch) => {
  dispatch(markTaskCompleted(id)); // Mark as completed first
  setTimeout(() => {
    dispatch(deleteTaskImmediate(id)); // Delete after 1 second
    toast.success("Task deleted successfully!");
  }, 400); // Delay of 1 second
};
export default todolistSlice.reducer;
