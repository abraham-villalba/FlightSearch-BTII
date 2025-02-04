import { Airport } from "../types/airportTypes";
import { Dictionary, FareDetails, Segment } from "../types/flightTypes";
import { parseISODuration } from "../utils/dateUtils";
import TravelersFareDetails from "./TravelersFareDetails";

type SegmentDetailsProps = {
    segment: Segment,
    glossary: Dictionary,
    returnFlight: boolean,
    fareDetails: FareDetails,
    id: number,
    airports: {
        departure: Airport | null,
        arrival: Airport | null
    }
}

export default function SegmentDetails({id, segment, glossary, returnFlight, fareDetails, airports} : SegmentDetailsProps) {

    const getAirportName = (iataCode: string, cityCode: string, countryCode: string) => {
        const findAirport = (airport: Airport | null) => {
            if (!airport) return null;
            if (airport.iataCode === iataCode) return airport.name;
            if (airport.address?.cityCode === cityCode) return airport.address.cityName;
            return null;
        };
    
        return findAirport(airports.departure) || findAirport(airports.arrival) || `${cityCode}, ${countryCode}`;
    }

    return (
        <div className="flex flex-row border p-6 mb-4 rounded-md bg-white shadow-sm">
            <div className="flex flex-col w-2/3 space-y-3">
                <p className="text-lg font-semibold">{`Segment ${id} (${returnFlight ? 'Return Flight' : 'Outbound Flight'})`}</p>
                <p>{segment.departure.at.replace("T", " ")} - {segment.arrival.at.replace("T", " ")}</p>
                <p>{`Duration: ${parseISODuration(segment.duration)}`}</p>
                <p>{`${getAirportName(segment.departure.iataCode, glossary.locations[segment.departure.iataCode].cityCode, glossary.locations[segment.departure.iataCode].countryCode)}`} ({segment.departure.iataCode}) - {getAirportName(segment.arrival.iataCode, glossary.locations[segment.arrival.iataCode].cityCode, glossary.locations[segment.arrival.iataCode].countryCode)} ({segment.arrival.iataCode})</p>
                <p>{`${glossary.carriers[segment.carrierCode]} (${segment.carrierCode})`}</p>
                <p>{`Flight number: ${segment.number}`}</p>
                <p>{`Aircraft ${glossary.aircraft[segment.aircraft.code]} (${segment.aircraft.code})`}</p>
            </div>
            <div className="w-1/3 p-4 bg-gray-100 rounded-md shadow-sm">
                <TravelersFareDetails 
                    cabin={fareDetails.cabin}
                    className={fareDetails.class}
                    amenities={fareDetails.amenities}
                />
            </div>
        </div>
    )
}
