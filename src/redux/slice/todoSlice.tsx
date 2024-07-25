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
    updateTodoStatus: (state, { payload }) => {
      const updatedTodo = payload.data;

      state.todos = state.todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return todo;
      });

      return state;
    },
  },
});

export const { addAllTodos, addSingleTodos, updateTodoStatus } =
  todoSlice.actions;

export const todoReducer = todoSlice.reducer;

export const todosState = (state) => state.todo;
