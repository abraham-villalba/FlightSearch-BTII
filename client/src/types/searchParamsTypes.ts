export type SearchState = {
    departureCode: string;
    arrivalCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    currency: 'USD' | 'MXN' | 'EUR';
    nonStop: boolean;
    page: number;
}

