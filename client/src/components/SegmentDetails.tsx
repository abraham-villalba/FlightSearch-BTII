import { Dictionary, FareDetails, Segment } from "../types/flightTypes";
import TravelersFareDetails from "./TravelersFareDetails";

type SegmentDetailsProps = {
    segment: Segment,
    glossary: Dictionary,
    returnFlight: boolean,
    fareDetails: FareDetails,
    id: number
}

export default function SegmentDetails({id, segment, glossary, returnFlight, fareDetails} : SegmentDetailsProps) {
    return (
        <div className="flex flex-row border p-6 mb-4 rounded-md bg-white shadow-sm">
            <div className="flex flex-col w-2/3 space-y-3">
                <p className="text-lg font-semibold">{`Segment ${id} (${returnFlight ? 'Return Flight' : 'Outbound Flight'})`}</p>
                <p>{segment.departure.at} - {segment.arrival.at}</p>
                <p>Airport name ({segment.departure.iataCode}) - Airport name ({segment.arrival.iataCode})</p>
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
