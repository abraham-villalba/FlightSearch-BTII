export type SearchState = {
    departureCode: string;
    arrivalCode: string;
    departureDate: Date;
    returnDate?: Date;
    adults: number;
    currency: 'USD' | 'MXN' | 'EUR';
    nonStop: boolean;
    page: number;
}

