import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../store/store";
import SegmentDetails from "../components/SegmentDetails";
import PriceBreakdownDetails from "../components/PriceBreakdownDetails";
import { Dictionary } from "../types/flightTypes";


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
        <div>
            <h1 className="text-3xl font-bold text-center p-10">Flight Details</h1>
            <div className="max-w-screen-lg mx-auto py-3">
                <button className="bg-red-300 px-3 py-2 rounded-md"
                    onClick={onReturn}
                >
                    {'<'} Return to Offers
                </button>
            </div>
            <div className='flex flex-row w-full max-w-screen-lg justify-between mx-auto rounded-md gap-x-4'>
                {/* Segments data */}
                <div className="flex flex-col w-2/3 gap-y-4">
                    {flight.itineraries.map((itinerary, itineraryIndex) =>
                        itinerary.segments.map((segment, segmentIndex) => (
                            <SegmentDetails 
                                key={`${itineraryIndex}-${segmentIndex}`} 
                                id={segmentIndex + 1}
                                segment={segment}
                                glossary={referenceData}
                                returnFlight={itineraryIndex === 1} // If itineraryIndex is 1, it's a return flight
                                fareDetails={flight.travelerPricings[0].fareDetailsBySegment[segmentIndex]}
                            />
                        ))
                    )}
                </div>

                {/* Price Breakdown */}
                <div className="w-1/3">
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
