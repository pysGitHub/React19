import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import kanbanReducer from "./modules/kanban";
import booksReducer from "./modules/books";
import userInfoReducer from "./modules/user-info";

export const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
        books: booksReducer,
        userInfo: userInfoReducer,
    } 
});

// 推断类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 自定义 hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;