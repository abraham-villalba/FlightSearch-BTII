export type Meta = {
    count: number;
    totalPages: number;
    currentPage: number;
    currentPayloadCount: number;
};

export type AirportInfo = {
    iataCode: string;
    terminal: string | null;
    at: string;
};

export type Aircraft = {
    code: string;
};

export type Segment = {
    id: string;
    departure: AirportInfo;
    arrival: AirportInfo;
    carrierCode: string;
    duration: string;
    operating: string | null;
    aircraft: Aircraft;
    numberOfStops: number;
    number: string;
};

export type Layover = {
    iataCode: string;
    duration: string;
};

export type Itinerary = {
    duration: string;
    segments: Segment[];
    departureTime: string;
    arrivalTime: string;
    totalLayoverDuration: string;
    layovers: Layover[];
};

export type Fee = {
    amount: number;
    type: string;
};

export type Price = {
    total: number;
    base: number;
    currency: string;
    fees?: Fee[];
};

export type Amenity = {
    description: string;
    isChargeable: boolean;
};

export type FareDetails = {
    segmentId: string;
    cabin: string;
    amenities: Amenity[];
    class: string;
};

export type TravelerPricing = {
    travelerId: string;
    fareOption: string;
    price: Price;
    fareDetailsBySegment: FareDetails[];
};

export type FlightData = {
    id: string;
    itineraries: Itinerary[];
    price: Price;
    travelerPricings: TravelerPricing[];
};

export type Dictionary = {
    aircraft: Record<string, string>;
    carriers: Record<string, string>;
    locations: Record<string, { cityCode: string; countryCode: string }>;
};

export type SearchFlightsApiResponse = {
    meta: Meta;
    data: FlightData[];
    dictionaries: Dictionary;
};

export type FlightsState = {
    offers: FlightData[];
    meta: Meta | null;
    dictionaries: Dictionary | null;
    loading: boolean;
    error: string | null;
}
