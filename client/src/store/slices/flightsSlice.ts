import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FlightsState } from "../../types/flightTypes";
import { SearchFlightsRequest } from "../../types/searchParamsTypes";
import { searchFlights } from "../../api/flightApis";

const initialState: FlightsState = {
    offers: [],
    meta: null,
    dictionaries: null,
    loading: false,
    error: null
}

export const fetchFlightOffers = createAsyncThunk(
    "flights/fetchFlightOffers",
    async (searchParams: SearchFlightsRequest, { rejectWithValue }) => {
        try {
            const response = await searchFlights(searchParams);
            console.log(response);
            //console.log(response.data);
            return response;
        } catch (error: any) {
            console.log(error);
            console.log("Error fetching in thunk detected..")
            return rejectWithValue({message: "Error fetching airports"});
        }
    }
);

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {},
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

export default flightSlice.reducer;