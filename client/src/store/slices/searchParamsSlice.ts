import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../../types/searchParamsTypes";


const initialState : SearchState = {
    departureCode: '',
    arrivalCode: '',
    departureDate: '',
    adults: 1,
    currency: 'USD',
    nonStop: false,
    page: 1
}

const searchParamsSlice = createSlice({
    name: "seachParams",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            return {...state, ...action.payload}
        }
    }
});

export const {setSearchParams} = searchParamsSlice.actions;
export default searchParamsSlice.reducer;