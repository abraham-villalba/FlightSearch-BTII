export type Address = {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
}

export type Airport = {
    name: string;
    detailedName: string;
    iataCode: string;
    address: Address;
}

export type AirportSearchResults = {
    data: Airport[];
}

export type AirportState = {
    airports: Airport[],
    loading: boolean;
    error: string | null;
}