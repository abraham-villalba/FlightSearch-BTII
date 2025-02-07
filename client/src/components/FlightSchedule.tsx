import { Airport } from "../types/airportTypes";
import { Dictionary, Itinerary } from "../types/flightTypes"
import { getMonthAndDayFromDate, getTimeFromDate, parseISODuration } from "../utils/dateUtils";

type FlightScheduleProps = {
    itinerary: Itinerary,
    referenceData: Dictionary | null,
    searchParams: { departureAirport: Airport | null; arrivalAirport: Airport | null };
}

export default function FlightSchedule({itinerary, referenceData, searchParams} : FlightScheduleProps) {
    
    const departureTime = getTimeFromDate(itinerary.departureTime);
    const departureDay = getMonthAndDayFromDate(itinerary.departureTime);
    const arrivalTime = getTimeFromDate(itinerary.arrivalTime);
    const arrivalDay = getMonthAndDayFromDate(itinerary.arrivalTime);
    const duration = parseISODuration(itinerary.duration);
    const layovers = itinerary.layovers;

    const carrier = itinerary.segments[0]?.carrierCode;
    const carrierName = referenceData?.carriers?.[carrier] || "Unknown Carrier";

    const depIataCode = itinerary.segments[0]?.departure?.iataCode;
    const arrIataCode = itinerary.segments[itinerary.segments.length - 1]?.arrival?.iataCode;
    const depName = searchParams.departureAirport?.iataCode === depIataCode 
        ? searchParams.departureAirport.name 
        : referenceData?.locations[depIataCode].name !== "Unknown" ? referenceData?.locations[depIataCode].name 
        : searchParams.departureAirport?.address.cityName || "";
    const arrName = searchParams.arrivalAirport?.iataCode === arrIataCode 
        ? searchParams.arrivalAirport.name 
        : referenceData?.locations[arrIataCode].name !== "Unknown" ? referenceData?.locations[arrIataCode].name 
        : searchParams.arrivalAirport?.address.cityName || "";

    //const operatingCode = itinerary.segments.length > 0 && ? itinerary.segments[0].operating?.carrierCode : null;
    const operatingCarriers = [
        ...new Set(itinerary.segments.map((segment) => segment.operating?.carrierCode || segment.carrierCode).filter(Boolean)),
    ];

    return (
        <div className='w-full'>
            <div className='flex flex-col px-8 pt-4'>
                {/* General Time */}
                <div className="flex flex-row justify-between text-lg font-semibold text-gray-700">
                    <p>{departureDay} <span className="font-bold">{departureTime}</span> - {arrivalDay} <span className="font-bold">{arrivalTime}</span></p>
                </div>
                {/* Main Flight info */}
                <div className="flex flex-row justify-between text-gray-600">
                    <p className="w-2/3">{`${depName} (${depIataCode}) - ${arrName} (${arrIataCode})`}</p>
                    <p className="w-1/3 pl-3 text-sm">{`${duration} (${layovers.length} stop${layovers.length === 1 ? "" : "s"})`}</p>
                </div>
                {/* Layovers info */}
                { layovers.length > 0 && (
                    layovers.map((layover) => (
                        <div key={layover.iataCode} className='flex flex-row justify-between'>
                            {/* Space to align */}
                            <div className='w-2/3'></div>
                            {/* Layover info */}
                            <div className='w-1/3 pl-3 text-sm text-gray-600'>
                                <p>{`${parseISODuration(layover.duration)} in ${layover.iataCode}`}</p>
                            </div>
                        </div>
                    ))
                )}
                {/* Carrier information */}
                <div className='mt-4 text-gray-600'>
                    <p>{`${carrierName} (${carrier})`}</p>
                </div>

                {/* Operating Carrier Information */}
                {operatingCarriers.length > 0 && (
                    <div className="mt-4 text-gray-600">
                        {operatingCarriers.map((opCode) =>
                        opCode !== carrier ? (
                            <p key={opCode}>{`${referenceData?.carriers?.[opCode] || ""} (${opCode})`} <span className="text-xs">Operating carrier</span></p>
                        ) : null
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
