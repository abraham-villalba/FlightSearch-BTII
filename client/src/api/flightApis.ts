import axios from 'axios';
import { SearchFlightsRequest } from '../types/searchParamsTypes';

const API_URL = "http://localhost:9090/api";

const buildSearchQuery = (params: SearchFlightsRequest): string => {
    let query = "?";
    query += `page=${params.page}`;
    query += `&departureDate=${params.departureDate}${params.returnDate ? '&returnDate=' + params.returnDate : ''}`;
    query += `&departureCode=${params.departureAirport}&destinationCode=${params.arrivalAirport}`;
    query += `&nonStop=${params.nonStop}&numAdults=${params.adults}&currency=${params.currency}`;
    query += `${params.sort.length > 0 ? '&sortBy=' + params.sort : ''}`
    
    return query;
}  

export const searchFlights = async (params: SearchFlightsRequest) => {
    try {
        const response = await axios.get(`${API_URL}/flights/search${buildSearchQuery(params)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};