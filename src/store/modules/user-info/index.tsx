import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../axios/api";



interface ApiResponse {
    code: number,
    message: string,
    token: string,
    refresh_token: string,
    success: boolean,
    permissions: string
}

interface UserResponse {
    response: ApiResponse | null,
    loading: boolean,
}


interface RequestUserInfo {
    username: string,
    password: string,
}

const initialState: UserResponse = {
    response: null,
    loading: false,
}


// 获取登入用户信息
// 获取所有书名
export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (params: RequestUserInfo, { rejectWithValue }) => {
        try {
            const response: ApiResponse = await api.post('/login', params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || '登入失败');
        }
    }
);

const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        initializeState(state) {
            return Object.assign(state, initialState);
        },
    },

    extraReducers: (builder) => {
        builder
            // 处理获取所有书名
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.response = payload;
            })
            .addCase(fetchUserInfo.rejected, (state, { payload }) => {
                state.loading = false;
                if (state.response) {
                    state.response.message = payload as string;
                    state.response.success = false;
                } else {
                    // 如果 state.response 为 null，则初始化一个响应对象
                    state.response = {
                        code: 0,
                        message: payload as string,
                        token: '',
                        refresh_token: '',
                        success: false,
                        permissions: ''
                    };
                }
            })

    }
});

export const { initializeState } = userInfo.actions;
export default userInfo.reducer;