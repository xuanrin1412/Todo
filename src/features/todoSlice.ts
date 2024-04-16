import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum VisibilityFilter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: VisibilityFilter;
  filteredTodos: Todo[]; 
}

const initialState: TodoState = {
  todos: [],
  filter: VisibilityFilter.SHOW_ALL,
  filteredTodos: []
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
      if (todoIndex !== -1) {
          return {
              ...state,
              todos: [
                  ...state.todos.slice(0, todoIndex),
                  { ...state.todos[todoIndex], completed: !state.todos[todoIndex].completed },
                  ...state.todos.slice(todoIndex + 1),
              ],
          };
      }
      return state;
    },
    setFilter: (state, action: PayloadAction<VisibilityFilter>) => {
      state.filter = action.payload;
      switch (action.payload) {
        case VisibilityFilter.SHOW_ACTIVE:
          state.filteredTodos = state.todos.filter(todo => !todo.completed);
          break;
        case VisibilityFilter.SHOW_COMPLETED:
          state.filteredTodos = state.todos.filter(todo => todo.completed);
          break;
        default:
          state.filteredTodos = state.todos;
          break;
      }
    },
  },
});

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
