import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import OneWayFlightOffer from "../components/OneWayFlightOffer";
import TwoWayFlightOffer from "../components/TwoWayFlightOffer";
import { clearFlights } from "../store/slices/flightsSlice";
import PaginationBar from "../components/PaginationBar";

export default function FlightResultsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSelector((state: RootState) => state.searchParams);
    const { meta, offers, loading, dictionaries, error } = useSelector((state: RootState) => state.flights);

    const navigate = useNavigate();

    const goBack = () => {
        console.log("Go back?")
        dispatch(clearFlights());
        navigate("/");
    }

    const navigateToDetails = (flightId: string) => {
        navigate(`/results/${flightId}`);
    }

    return (
        <div>
            <h3 className="text-3xl text-center">Flight results</h3>
            { meta !== null && meta.currentPayloadCount > 0 ? (
                offers.map((offer) => (
                    offer.itineraries.length > 1 ? (
                        <div className="my-2" key={offer.id} >
                            <TwoWayFlightOffer
                                flightOffer={offer} 
                                referenceData={dictionaries} 
                                arrivalAirport={searchParams.arrivalAirport} 
                                departureAirport={searchParams.departureAirport}
                                onDetailsClick={navigateToDetails}
                            />
                        </div>
                        
                    ) : (
                        <div className="my-2" key={offer.id} >
                            <OneWayFlightOffer 
                                flightOffer={offer} 
                                referenceData={dictionaries} 
                                arrivalAirport={searchParams.arrivalAirport} 
                                departureAirport={searchParams.departureAirport}
                                onDetailsClick={navigateToDetails}
                            />
                        </div>
                    )
                ))
            ) : (
                <p className="p-2 text-gray-500">No results were found...</p>
            )}
            <button onClick={goBack} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded">Go Back to search</button>
            <PaginationBar />
        </div>
    )
}