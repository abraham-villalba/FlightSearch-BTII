import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store";
import { ChangeEvent, useState } from "react";
import { SearchState } from "../types/searchParamsTypes";
import { setSearchParams } from "../store/slices/searchParamsSlice";
import { useNavigate } from "react-router-dom";


export default function FlightSearchForm() {
    
    const dispatch = useDispatch();
    const searchParams = useSelector((state: RootState) => state.searchParams);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<SearchState>({
        departureCode: '',
        arrivalCode: '',
        departureDate: '',
        adults: 1,
        currency: 'USD',
        nonStop: false,
        page: 1
    });

    const handleSubmit = () => {
        console.log("Data was submitted");
        // Validate fields of the form
        // Set the state of the search
        dispatch(setSearchParams(formData));
        // Fetch the values
        // Navigate to the results page...
        navigate("/results");
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }));
    }

    return (
        <div>
            <h3>Flight Search Form</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Departure Code</label>
                    <input
                    name="departureCode"
                    type="text"
                    value={formData.departureCode ? formData.departureCode : ""}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="flex">
                    <label>Destination Code</label>
                    <input
                    name="arrivalCode"
                    type="text"
                    value={formData.arrivalCode ? formData.arrivalCode : ""}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="flex">
                    <label>Departure Date</label>
                    <input
                    name="departureDate"
                    type="text"
                    value={formData.departureDate ? formData.departureDate : ""}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="flex">
                    <label>Return Date</label>
                    <input
                    name="returnDate"
                    type="text"
                    value={formData.returnDate ? formData.returnDate : ""}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <div>
                        <div>
                            <label>Currency</label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                >
                                <option value="USD">USD</option>
                                <option value="MXN">MXN</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-green-900 hover:bg-green-700 text-white rounded">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
