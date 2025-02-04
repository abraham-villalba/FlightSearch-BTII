import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../store/store";
import SegmentDetails from "../components/SegmentDetails";
import PriceBreakdownDetails from "../components/PriceBreakdownDetails";
import { Dictionary } from "../types/flightTypes";
import { parseISODuration } from "../utils/dateUtils";


export default function FlightDetailsPage() {
    const {flightId} = useParams();
    const flight = useSelector((state: RootState) => 
        state.flights.offers.find(f => f.id === flightId)
    );

    const navigate = useNavigate();
    const defaultDictionary: Dictionary ={
        carriers: {},
        aircraft: {},
        locations: {}
    }
    const referenceData = useSelector((state: RootState) => state.flights.dictionaries) || defaultDictionary;
    const {departureAirport, arrivalAirport} = useSelector((state: RootState) => state.searchParams);

    if (!flight) {
        return <div>Flight offer not found...</div>
    }

    const feesAmount = flight.price.fees 
        ? flight.price.fees.reduce((sum, fee) => sum + fee.amount, 0) 
        : 0;

    let feesDescription = flight.price.fees 
        ? flight.price.fees.map(fee => fee.type).join(", ") 
        : "No additional fees";

    feesDescription = feesAmount > 0 ? feesDescription : "No additional fees";

    const onReturn = () => {
        navigate("/results")
    }

    return (
        <div className="bg-gray-50">
            <h3 className="text-4xl font-extrabold text-center py-10 bg-blue-500 text-white">
                Flight Details
            </h3>
            <div className="max-w-screen-lg mx-auto py-3">
                <button className="bg-amber-400 hover:bg-amber-300 text-sm text-white px-4 py-2 rounded-md shadow-md"
                    onClick={onReturn}
                >
                    {'<'} Return to Offers
                </button>
            </div>
            <div className='flex flex-col md:flex-row w-full max-w-screen-lg justify-between mx-auto rounded-md gap-x-4'>
                {/* Segments data */}
                <div className="flex flex-col w-full md:w-2/3 gap-y-4">
                    {flight.itineraries.map((itinerary, itineraryIndex) => 
                        itinerary.segments.map((segment, segmentIndex) => {
                            return (
                                <div key={`${itineraryIndex}-${segmentIndex}`} >
                                    <SegmentDetails 
                                        id={segmentIndex + 1}
                                        segment={segment}
                                        glossary={referenceData}
                                        returnFlight={itineraryIndex === 1} // If itineraryIndex is 1, it's a return flight
                                        fareDetails={flight.travelerPricings[0].fareDetailsBySegment[segmentIndex]}
                                        airports={{departure: departureAirport, arrival: arrivalAirport}}
                                    />
                                    {/* Render Layover Information */}
                                    {itinerary.layovers.filter(layover => layover.iataCode === segment.arrival.iataCode).map((filteredLayover) => (
                                        <div key={filteredLayover.iataCode} className="layover-info">
                                            <p className="ml-3">{`Layover: ${parseISODuration(filteredLayover.duration)} in ${filteredLayover.iataCode}`}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                            
                            
                    }))}
                </div>

                {/* Price Breakdown */}
                <div className="w-full md:w-1/3 mt-4 md:mt-0">
                    <PriceBreakdownDetails 
                        generalPrice={flight.price}
                        travelerPrice={flight.travelerPricings[0].price}
                        fees={{totalAmount: feesAmount, description: feesDescription}}
                        numTravelers={flight.travelerPricings.length}
                    />
                </div>
            </div>
        </div>
    )
}
