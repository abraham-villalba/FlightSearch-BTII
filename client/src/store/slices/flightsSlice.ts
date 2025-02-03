import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FlightsState } from "../../types/flightTypes";
import { SearchFlightsRequest, Sort } from "../../types/searchParamsTypes";
import { searchFlights } from "../../api/flightApis";
import { RootState } from "../store";
import { localDateToString } from "../../utils/dateUtils";

const initialState: FlightsState = {
    offers: [],
    meta: null,
    dictionaries: null,
    loading: false,
    error: null
}

export const fetchFlightOffers = createAsyncThunk(
    "flights/fetchFlightOffers",
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState;
            const searchParamsState = state.searchParams;
            const sort = searchParamsState.sort.map((item: Sort) => `${item.field}:${"asc"},`).join("").slice(0,-1);
            const searchParams : SearchFlightsRequest = {
                departureAirport: searchParamsState.departureAirport ? searchParamsState.departureAirport.iataCode : "",
                arrivalAirport: searchParamsState.arrivalAirport ? searchParamsState.arrivalAirport.iataCode : "",
                departureDate: searchParamsState.departureDate ? localDateToString(searchParamsState.departureDate) : "",
                returnDate: searchParamsState.returnDate ? localDateToString(searchParamsState.returnDate) : "",
                nonStop: searchParamsState.nonStop,
                adults: searchParamsState.adults,
                currency: searchParamsState.currency,
                page: searchParamsState.page,
                sort: sort
            }
            const response = await searchFlights(searchParams);
            console.log(response);
            //console.log(response.data);
            return response;
        } catch (error: any) {
            console.log(error);
            console.log("Error fetching in thunk detected..")
            return thunkApi.rejectWithValue({message: "Error fetching airports"});
        }
    }
);

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        clearFlights(state) {
            state.offers = [];
            state.meta = null;
            state.dictionaries = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlightOffers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlightOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.meta = action.payload.meta;
                state.dictionaries = action.payload.dictionaries;
                state.offers = action.payload.data;
            })
            .addCase(fetchFlightOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state = initialState;
            })
    }
});

export const { clearFlights } = flightSlice.actions;
export default flightSlice.reducer;