import { configureStore } from "@reduxjs/toolkit";
import searchParamsReducer from "./slices/searchParamsSlice";
import airportReducer from "./slices/airportSlice";
import flightReducer from "./slices/flightsSlice";

export const store = configureStore({
    reducer: {
        searchParams: searchParamsReducer,
        airports: airportReducer,
        flights: flightReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;