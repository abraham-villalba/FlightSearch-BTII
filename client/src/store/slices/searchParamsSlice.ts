import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../../types/searchParamsTypes";


const initialState : SearchState = {
    departureAirport: null,
    arrivalAirport: null,
    departureDate: null,
    adults: 1,
    currency: 'USD',
    nonStop: false,
    page: 1,
    sort: []
}

const searchParamsSlice = createSlice({
    name: "seachParams",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            return {...state, ...action.payload}
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        addSortBy(state, action: PayloadAction<string>) {
            const field = action.payload;
            const sortBy = state.sort.map((item) => 
                item.field === field ? { ...item, asc: !item.asc } : item
            );

            const exists = state.sort.some((item) => item.field === field);
            state.sort = exists ? sortBy : [...sortBy, {field, asc: true}];
        },
        removeSortBy(state, action: PayloadAction<string>) {
            const field = action.payload;
            const sortBy = state.sort.filter((item) => 
                item.field !== field 
            );
            state.sort = sortBy;
        },
        resetSearchParams(state) {
            state.departureAirport = null,
            state.arrivalAirport = null,
            state.departureDate = null,
            state.adults = 1,
            state.currency = 'USD',
            state.nonStop = false,
            state.page = 1,
            state.sort = []
        }
    }
});

export const {setSearchParams, setPage, addSortBy, removeSortBy, resetSearchParams} = searchParamsSlice.actions;
export default searchParamsSlice.reducer;