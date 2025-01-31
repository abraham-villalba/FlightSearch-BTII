import axios from 'axios';
import { SearchState } from '../types/searchParamsTypes';

//http://localhost:9090/api/flights/search
// ?departureDate=2025-02-16&departureCode=MEX&destinationCode=JFK&nonStop=false&numAdults=1&returnDate=2025-03-15&currency=MXN&sortBy=duration:desc&page=7
const API_URL = "http://localhost:9090/api";

const buildSearchQuery = (params: SearchState): string => {
    let query = "?";
    query += `page=${params.page}`;
    query += `&departureDate=${params.departureDate}&${params.returnDate ? 'returnDate=' + params.returnDate : ''}
        &departureCode=${params.departureCode}&destinationCode=${params.arrivalCode}
        &nonStop=${params.nonStop}&numAdults=${params.adults}&currency=${params.currency}`
        //&sortBy=${params.sortBy ? 'returnDate=' + params.returnDate : ''}`
    
    return query;
}  

// export const searchFlights = async (params: SearchState) => {
//     console.log(`Calling GET ${API_URL}/flights/search${buildSearchQuery(params)}`);
//     const response = await axios.get(`${API_URL}/flights/search${buildSearchQuery(params)}`);
//     return response.data;
// };

export const searchFlights = (params: SearchState) => {
    console.log(`${API_URL}/flights/search${buildSearchQuery(params)}`);
    //const response = await axios.get(`${API_URL}/flights/search`, { params });
    //return response.data;
};