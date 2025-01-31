import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { localDateToString } from "../utils/dateUtils";

export default function FlightResultsPage() {
    const dispatch = useDispatch();
    const searchParams = useSelector((state: RootState) => state.searchParams);

    const navigate = useNavigate();
    return (
        <div>
            <h3 className="text-3xl">Flight results</h3>
            <ul>
                <li>Departure date: {localDateToString(searchParams.departureDate)}</li>
                <li>Return date: {searchParams.returnDate ? localDateToString(searchParams.returnDate) : ""}</li>
                <li>Departure code: {searchParams.departureCode}</li>
                <li>Destination code: {searchParams.arrivalCode}</li>
                <li>Number of adults: {searchParams.adults}</li>
                <li>Currency: {searchParams.currency}</li>
                <li>Non-stop?: {searchParams.nonStop ? "true" : "false"}</li>
            </ul>
            <button onClick={() => {navigate("/")}} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded">Go Back to search</button>
        </div>
    )
}
