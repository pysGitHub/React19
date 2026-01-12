import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/api";

interface ApiResponse {
    code: number,
    message: string,
    data: any[],
    success: boolean
}

interface Book {
    response: ApiResponse;
    loading: boolean;
}

// 获取所有书名
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await api.get('/books');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '获取书籍失败');
    }
  }
);

// 获取某本书的详细信息
export const fetchBookDetail = createAsyncThunk(
  'books/fetchBookDetail',
  async (name: string, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await api.post('/bookDetail', { name });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '获取书籍详情失败');
    }
  }
);

// 获取所有书本数据
export const fetchAllBooks = createAsyncThunk(
  'books/fetchAllBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await api.get('/all-books');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || '获取所有书籍数据失败');
    }
  }
);

const initialState: Book = {
  response: {
    code: 0,
    data: [],
    message: '',
    success: true
  },
  loading: false,
} as Book;

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // 处理获取所有书名
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.response = payload;
      })
      .addCase(fetchBooks.rejected, (state, { payload }) => {
        state.loading = false;
        state.response.message = payload as string;
        state.response.success = false;
      })
      
      // 处理获取某本书的详细信息
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.response = payload;
      })
      .addCase(fetchBookDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.response.message = payload as string;
        state.response.success = false;
      })
      
      // 处理获取所有书本数据
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.response = payload;
      })
      .addCase(fetchAllBooks.rejected, (state, { payload }) => {
        state.loading = false;
        state.response.message = payload as string;
        state.response.success = false;
      });
  }
});

export default booksSlice.reducer;