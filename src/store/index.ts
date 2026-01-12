import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./modules/kanban";
import booksReducer from "./modules/books";

export const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
        books: booksReducer
    } 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch