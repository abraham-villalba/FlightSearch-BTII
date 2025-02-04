import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirports } from "../store/slices/airportSlice";
import { AppDispatch, RootState } from "../store/store";
import { Airport } from "../types/airportTypes";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
    value: Airport | null;
    onChange: (airport: Airport | null) => void;
    placeholder: string;
};

export default function AirportSearch({ value, onChange, placeholder }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { airports, loading, error } = useSelector((state: RootState) => state.airports);
    const [query, setQuery] = useState("");
    const [displayedValue, setDisplayedValued] = useState("");

    useEffect(() => {
        // Set a delay before making the API call
        const delay = setTimeout(() => {
            if (query.trim()) {
                dispatch(fetchAirports(query));
            }
        }, 700); // 700ms delay

        // Clear timeout if the user types again
        return () => clearTimeout(delay);
    }, [query, dispatch]);

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={displayedValue}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    // Tries to search after selecting a value
                    if(value !== null){ 
                        onChange(null); // Remove selection
                        // Set the query to the last character
                        const lastChar = e.target.value[e.target.value.length - 1];
                        setDisplayedValued(lastChar);
                        setQuery(lastChar);
                        return;
                    }
                    setDisplayedValued(inputValue);
                    setQuery(inputValue);
                }}
                className="w-full p-2 border border-gray-300 rounded"
            />
            {query && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto shadow-lg max-w-lg">
                    {loading ? (
                        <li className="flex flex-row p-2 text-gray-500">
                            <LoadingSpinner size={20} className="mx-2"/> Loading...
                        </li>
                    ) : error !== null ? (
                        <li className="p-2 text-gray-500">Unable to fetch airport information, try again later...</li>
                    ) : airports.length !== 0 && query !== "" ? (
                        airports.map((airport) => (
                            <li
                                key={airport.iataCode}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    onChange(airport);
                                    setQuery("");
                                    setDisplayedValued(`${airport.iataCode}`);
                                }}
                            >
                                {airport.iataCode}: {airport.name}, {airport.address.cityName}, {airport.address.countryName}
                            </li>
                        ) )
                    ) : (
                        <li className="p-2 text-gray-500">No results were found...</li>
                    )}
                </ul>
            )}
        </div>
    );
}