import { Airport } from "./airportTypes";

export type SearchState = {
    departureAirport: Airport | null;
    arrivalAirport: Airport | null;
    departureDate: Date | null;
    returnDate?: Date;
    adults: number;
    currency: 'USD' | 'MXN' | 'EUR';
    nonStop: boolean;
    page: number;
}

export type SearchFlightsRequest = Omit<SearchState, 'departureDate' | 'returnDate' | 'departureAirport' | 'arrivalAirport'> & {
    departureAirport: string;
    arrivalAirport: string;
    departureDate: string;
    returnDate: string | null;
}

