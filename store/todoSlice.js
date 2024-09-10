import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 서버에서 할 일 목록을 가져오는 thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('/api/todos');
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    addTodo: (state, action) => {
      state.items.push(action.payload);  // 새로 추가된 할 일을 상태에 추가
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { deleteTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
