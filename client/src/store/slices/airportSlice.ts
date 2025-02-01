import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AirportState } from "../../types/airportTypes";
import { searchAirports } from "../../api/airportApi";


const initialState: AirportState = {
    airports: [],
    loading: false,
    error: null
}

// Thunks
export const fetchAirports = createAsyncThunk(
    "airports/fetchAirports",
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await searchAirports(query);
            console.log(response);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.log("Error fetching in thunk detected..")
            return rejectWithValue({message: "Error fetching airports"});
        }
    }
);


// Slice
const airportSlice = createSlice({
    name: "airports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirports.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAirports.fulfilled, (state, action) => {
                state.loading = false;
                state.airports = action.payload;
            })
            .addCase(fetchAirports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default airportSlice.reducer;