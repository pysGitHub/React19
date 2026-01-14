import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/api";

interface ApiResponse {
    code: number,
    message: string,
    data: any[],
    success: boolean
}

// 定义每个数据类型的状态接口
interface BookData {
    booksList: {
        response: ApiResponse;
        loading: boolean;
    };
    bookDetail: {
        response: ApiResponse;
        loading: boolean;
    };
    allBooks: {
        response: ApiResponse;
        loading: boolean;
    };
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

const initialState: BookData = {
  booksList: {
    response: {
      code: 0,
      data: [],
      message: '',
      success: true
    },
    loading: false,
  },
  bookDetail: {
    response: {
      code: 0,
      data: [],
      message: '',
      success: true
    },
    loading: false,
  },
  allBooks: {
    response: {
      code: 0,
      data: [],
      message: '',
      success: true
    },
    loading: false,
  }
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 处理获取所有书名
      .addCase(fetchBooks.pending, (state) => {
        state.booksList.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.booksList.loading = false;
        state.booksList.response = payload;
      })
      .addCase(fetchBooks.rejected, (state, { payload }) => {
        state.booksList.loading = false;
        state.booksList.response.message = payload as string;
        state.booksList.response.success = false;
      })
      
      // 处理获取某本书的详细信息
      .addCase(fetchBookDetail.pending, (state) => {
        state.bookDetail.loading = true;
      })
      .addCase(fetchBookDetail.fulfilled, (state, { payload }) => {
        state.bookDetail.loading = false;
        state.bookDetail.response = payload;
      })
      .addCase(fetchBookDetail.rejected, (state, { payload }) => {
        state.bookDetail.loading = false;
        state.bookDetail.response.message = payload as string;
        state.bookDetail.response.success = false;
      })
      
      // 处理获取所有书本数据
      .addCase(fetchAllBooks.pending, (state) => {
        state.allBooks.loading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, { payload }) => {
        state.allBooks.loading = false;
        state.allBooks.response = payload;
      })
      .addCase(fetchAllBooks.rejected, (state, { payload }) => {
        state.allBooks.loading = false;
        state.allBooks.response.message = payload as string;
        state.allBooks.response.success = false;
      });
  }
});

export default booksSlice.reducer;