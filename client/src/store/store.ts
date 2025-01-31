import { configureStore } from "@reduxjs/toolkit";
import searchParamsReducer from "./slices/searchParamsSlice";

export const store = configureStore({
    reducer: {
        searchParams: searchParamsReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;