import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import OneWayFlightOffer from "../components/OneWayFlightOffer";
import TwoWayFlightOffer from "../components/TwoWayFlightOffer";
import { clearFlights } from "../store/slices/flightsSlice";
import PaginationBar from "../components/PaginationBar";
import SortToggle from "../components/SortToggle";
import FeedbackModal from "../components/FeedbackModal";
import { resetSearchParams } from "../store/slices/searchParamsSlice";

export default function FlightResultsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSelector((state: RootState) => state.searchParams);
    const { meta, offers, dictionaries } = useSelector((state: RootState) => state.flights);

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
        dispatch(clearFlights());
        dispatch(resetSearchParams());
    }

    const navigateToDetails = (flightId: string) => {
        navigate(`/results/${flightId}`);
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Fixed Header */}
            <h3 className="text-4xl font-extrabold text-center py-8 bg-blue-500 text-white">
                Flight results
            </h3>

            {/* Sort + Button */}
            <div className="my-5 flex flex-row w-full max-w-screen-md justify-between mx-auto">
                <div className="w-2/3">
                    <button 
                        onClick={goBack} 
                        className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-300 text-sm"
                    >
                        {'<'} Return to Search
                    </button>
                </div>
                <div className="flex flex-row w-1/3 justify-evenly text-xs">
                    <div className="inline-flex items-center"><span>Sort by:</span> </div>
                    <SortToggle field="duration" disabled={meta === null || meta.count === 0} />
                    <SortToggle field="price" disabled={meta === null || meta.count === 0} />
                </div>
            </div>

            {/* Scrollable Flight Offers */}
            <div className="flex-1 overflow-y-auto px-4">
                {meta !== null && meta.currentPayloadCount > 0 ? (
                    offers.map((offer) => (
                        <div className="my-2" key={offer.id}>
                            {offer.itineraries.length > 1 ? (
                                <TwoWayFlightOffer
                                    flightOffer={offer} 
                                    referenceData={dictionaries} 
                                    arrivalAirport={searchParams.arrivalAirport} 
                                    departureAirport={searchParams.departureAirport}
                                    onDetailsClick={navigateToDetails}
                                />
                            ) : (
                                <OneWayFlightOffer 
                                    flightOffer={offer} 
                                    referenceData={dictionaries} 
                                    arrivalAirport={searchParams.arrivalAirport} 
                                    departureAirport={searchParams.departureAirport}
                                    onDetailsClick={navigateToDetails}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="p-2 text-gray-500">No results were found...</p>
                )}
            </div>

            {/* Sticky Pagination */}
            <div className="sticky bottom-0 bg-white shadow-md py-4">
                <PaginationBar />
            </div>

            <FeedbackModal />
        </div>
    );
}