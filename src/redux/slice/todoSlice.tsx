import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "TodoSlice",
  initialState,
  reducers: {
    addAllTodos: (state, { payload }) => {
      state.todos = payload.data;
      return state;
    },
    addSingleTodos: (state, { payload }) => {
      state.todos = [payload.data, ...state.todos];

      return state;
    },
    updateTodo: (state, { payload }) => {
      const updatedTodo = payload.data;

      state.todos = state.todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return todo;
      });

      return state;
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo._id !== payload);

      return state;
    },
    sortTodos: (state, { payload }) => {
      if (payload === "updated") {
        const todosCopy = [...state.todos];
        todosCopy.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        state.todos = todosCopy;
        return state;
      }

      if (payload === "created") {
        const todosCopy = [...state.todos];
        todosCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        state.todos = todosCopy;
        return state;
      }

      if (payload === "name") {
        const todosCopy = [...state.todos];
        todosCopy.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        state.todos = todosCopy;
        return state;
      }

      return state;
    },
  },
});

export const {
  addAllTodos,
  addSingleTodos,
  updateTodo,
  sortTodos,
  deleteTodo,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;

export const todosState = (state) => state.todo;
