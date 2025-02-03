import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../store/store";

export default function FlightDetailsPage() {
    const {flightId} = useParams();
    const flight = useSelector((state: RootState) => 
        state.flights.offers.find(f => f.id === flightId)
    );
    const referenceData = useSelector((state: RootState) => state.flights.dictionaries);

    if (!flight) {
        return <div>Flight offer not found...</div>
    }

    return (
        <div>
            <h1>Flight Details</h1>
            <ul>
                <li>Flight ID: {flight.id}</li>
                <li>Departure: {flight.itineraries[0].departureTime}</li>
                <li>Arrival: {flight.itineraries[0].arrivalTime}</li>
            </ul>
        </div>
    )
}
