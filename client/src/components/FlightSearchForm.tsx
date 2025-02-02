import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchFlightsRequest, SearchState } from "../types/searchParamsTypes";
import { setSearchParams } from "../store/slices/searchParamsSlice";
import { useNavigate } from "react-router-dom";
import { getToday, stringToDate } from "../utils/dateUtils";
import AirportSearch from "./AirportSearch";
import { Airport } from "../types/airportTypes";
import { fetchFlightOffers } from "../store/slices/flightsSlice";
import LoadingSpinner from "./LoadingSpinner";

type FlightSearchFields = Omit<SearchState, 'departureDate' | 'returnDate' | 'page' | 'sort'> & {
    departureDate: string;
    returnDate: string | null;
}

export default function FlightSearchForm() {
    
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSelector((state: RootState) => state.searchParams);
    const { meta, loading, error } = useSelector((state: RootState) => state.flights);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FlightSearchFields>({
        departureAirport: null,
        arrivalAirport: null,
        departureDate: '',
        returnDate: null,
        adults: 1,
        currency: 'USD',
        nonStop: false
    });

    const validate = (): string | null => {
        const { departureAirport, arrivalAirport, departureDate, returnDate, adults } = formData;
    
        // Validate Airport Codes
        if (departureAirport === null || arrivalAirport ===  null || departureAirport.iataCode.length !== 3 || departureAirport.iataCode.length !== 3) {
            return "Invalid Airport Code...";
        }
        if (departureAirport.iataCode === arrivalAirport.iataCode) {
            return "Arrival Code and Departure Code must be different";
        }
    
        // Validate Departure Date
        if (!departureDate) return "Departure date is required...";
        
        const departure = stringToDate(departureDate);
        if (departure < getToday()) return "Departure date cannot be in the past...";
    
        // Validate Return Date
        if (returnDate) {
            const returnD = stringToDate(returnDate);
            if (returnD <= departure) return "Invalid return date...";
        }
    
        // Validate Number of Adults
        if (adults < 1 || adults > 9) {
            return "The number of adults must be between 1 and 9";
        }
    
        return null;
    };

    const handleSubmit = () => {
        const error = validate();
        if (error) {
            alert(error);
            return;
        }
        console.log("Data was submitted");
        // Set the state of the search
        dispatch(setSearchParams(formData));
        // Fetch the values
        dispatch(fetchFlightOffers());
        
    }

    useEffect(() => {
        if(meta !== null) {
            if(meta.currentPayloadCount > 0) {
                navigate("/results");
                return;
            } else {
                // Open modal or notify the user...
            }
            // Navigate to the results page...
            
        }
    },[meta])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, type, value, checked} = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name] : type === "checkbox" ? checked : value
        }));
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-300 w-full p-12 space-y-4 max-w-screen-sm">
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="max-w-lg mx-auto mt-10"
            >
                <div className="flex flex-col space-y-2">
                    {/* It should be <AirportSearch /> for Departure Code */}
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Departure Code</label>
                        <div className="w-2/3">
                            <AirportSearch
                                value={formData.departureAirport}
                                onChange={(airport:  Airport | null) => setFormData((prev) => ({ ...prev, departureAirport: airport }))}
                                placeholder="Search departure airport..."
                            />
                        </div>
                    </div>
                    
                    {/* It should be <AirportSearch /> for Arrival Code */}
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Arrival Code</label>
                        <div className="w-2/3">
                            <AirportSearch
                                value={formData.arrivalAirport}
                                onChange={(airport:  Airport | null) => setFormData((prev) => ({ ...prev, arrivalAirport: airport }))}
                                placeholder="Search arrival airport..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Departure Date</label>
                        <input
                            name="departureDate"
                            type="date"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            className="w-2/3 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Return Date</label>
                        <input
                            name="returnDate"
                            type="date"
                            value={formData.returnDate != null ? formData.returnDate : ''}
                            onChange={handleInputChange}
                            className="w-2/3 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-2/3 p-2 border border-gray-300 rounded"
                        >
                            <option value="USD">USD</option>
                            <option value="MXN">MXN</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <label className="text-right w-1/3">Number of Adults</label>
                        <input
                            name="adults"
                            type="number"
                            value={formData.adults}
                            onChange={handleInputChange}
                            max={9}
                            min={1}
                            className="w-2/3 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-1/3"></div> {/* Empty div to align checkbox with other inputs */}
                        <div className="w-2/3 flex items-center space-x-2">
                            <input
                                name="nonStop"
                                type="checkbox"
                                checked={formData.nonStop}
                                onChange={(e) => handleInputChange(e)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <label className="ml-2">Non-stop</label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="flex flex-row px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:bg-gray-600"
                            disabled={loading}
                        >
                            Search
                        </button>
                    </div>
                    {
                        loading ? (
                            <div className="flex justify-end">
                                <LoadingSpinner size={16} className="mx-2"/> Fetching data...
                            </div>
                        ) : (<></>)
                    }
                </div>
            </form>
        </div>
    )
}
