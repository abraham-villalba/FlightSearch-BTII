import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addSortBy, removeSortBy, setPage } from "../store/slices/searchParamsSlice";
import { fetchFlightOffers } from "../store/slices/flightsSlice";

type SortToggleProps = {
    field: string;
    disabled: boolean;
}

export default function SortToggle({field, disabled} : SortToggleProps) {
    const dispatch = useDispatch<AppDispatch>();
    const sortState = useSelector((state : RootState) => state.searchParams.sort);
    const isChecked = sortState.some((item) => item.field === field);

    const handleToggle = () => {
        if (disabled) return;
        if (!isChecked) {
            dispatch(addSortBy(field));
        } else {
            dispatch(removeSortBy(field));
        }
        dispatch(setPage(1));
        dispatch(fetchFlightOffers())
        window.scrollTo({top:0, behavior: "smooth"})
    }

    return (
        <label className="inline-flex items-center cursor-pointer disabled:cursor-not-allowed">
            <span className="ms-3 text-xs">
                {field}
            </span>
            <input 
                type="checkbox" 
                className="sr-only peer" 
                onChange={handleToggle}
                disabled={disabled}
                checked={isChecked}
            />
            <div className="relative w-11 h-6 ml-2 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    )
}
