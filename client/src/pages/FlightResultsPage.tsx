import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import OneWayFlightOffer from "../components/OneWayFlightOffer";
import TwoWayFlightOffer from "../components/TwoWayFlightOffer";
import { getToday, stringToDate } from "../utils/dateUtils";

export default function FlightResultsPage() {
    const dispatch = useDispatch();
    const searchParams = useSelector((state: RootState) => state.searchParams);

    const navigate = useNavigate();

    const validateResults = () : boolean => {
        const { departureAirport, arrivalAirport, departureDate, returnDate, adults } = searchParams;
    
        // Validate Airport Codes
        if (departureAirport === null || arrivalAirport ===  null || departureAirport.iataCode.length !== 3 || departureAirport.iataCode.length !== 3) {
            return false;
        }
        if (departureAirport.iataCode === arrivalAirport.iataCode) {
            return false;
        }
    
        // Validate Departure Date
        if (!departureDate) return false;
        
        if (departureDate < getToday()) return false;
    
        // Validate Return Date
        if (returnDate) {
            const returnD = returnDate;
            if (returnD <= departureDate) return false;
        }
    
        // Validate Number of Adults
        if (adults < 1 || adults > 9) {
            return false;
        }
    
        return true;
    } 

    return (
        <div>
            <h3 className="text-3xl text-center">Flight results</h3>
            
            <OneWayFlightOffer />
            <p>s</p>
            <TwoWayFlightOffer />
            {/* <AirportSearch /> */}
            <button onClick={() => {navigate("/")}} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded">Go Back to search</button>
        </div>
    )
}
