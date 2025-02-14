import axios from 'axios';

const API_URL = "http://localhost:9090/api";

export const searchAirports = async (query: string) => {
    if (query === "") {
        throw new Error("Invalid query...")
    }
    try {
        const response = await axios.get(`${API_URL}/airports/search?query=${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};