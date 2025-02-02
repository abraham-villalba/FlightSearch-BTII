import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setPage } from "../store/slices/searchParamsSlice";
import { fetchFlightOffers } from "../store/slices/flightsSlice";



export default function PaginationBar() {
    const dispatch = useDispatch<AppDispatch>();
    const meta = useSelector((state: RootState) => state.flights.meta)
    const currentPage = meta ? meta.currentPage : 0;
    const totalPages = meta ? meta.totalPages : 0;

    const isPreviousDisabled = () => currentPage <= 1;

    const handlePageClick = (page : number) => {
        if (page !== currentPage) {
            dispatch(setPage(page))
            dispatch(fetchFlightOffers())
        }
    }

    const handlePreviousClick = () => {
        if(!isPreviousDisabled()) {
            dispatch(setPage(currentPage - 1))
            dispatch(fetchFlightOffers())
        }
    }

    const handleNextClick = () => {
        if(!(currentPage === totalPages)) {
            dispatch(setPage(currentPage + 1))
            dispatch(fetchFlightOffers())
        }
    }

    const handleFirstClick = () => {
        dispatch(setPage(1))
        dispatch(fetchFlightOffers())
    }

    const handleLastClick = () => {
        dispatch(setPage(totalPages))
        dispatch(fetchFlightOffers())
    }

    const getPageRange = (current: number, totalPages: number): number[] => {
        // Ensure the totalPages is at least the current page (edge case prevention)
        if (totalPages < current) return [];
      
        const start = Math.max(1, current - 1); // Start range: one before current, but not below 1
        const end = Math.min(totalPages, current + 1); // End range: one after current, but not above totalPages

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pages = getPageRange(currentPage, totalPages)

    
      
    
    return (
        <div className="mt-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
                {/* First Button */}
                
                <button
                    onClick={handleFirstClick}
                    disabled={totalPages === 0 || isPreviousDisabled()}
                    className={`px-2 py-1 text-sm ${
                    totalPages === 0 || isPreviousDisabled()
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-sky-500 hover:text-sky-700"
                    }`}
                >
                    {'<<'}
                </button>
                <button
                    onClick={handlePreviousClick}
                    disabled={isPreviousDisabled()}
                    className={`px-2 py-1 text-sm ${
                    isPreviousDisabled()
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-sky-500 hover:text-sky-700"
                    }`}
                >
                    {'<'}
                </button>
                {/* Page Numbers */}
                {pages.map((page) => (
                    <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={page === currentPage}
                    className={`px-2 py-1 text-sm rounded ${
                        page === currentPage
                        ? "bg-sky-500 text-white cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    >
                    {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 text-sm ${
                        currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-sky-500 hover:text-sky-700"
                    }`}
                >
                    {'>'}
                </button>
                {/* Last Button */}
                <button
                    onClick={handleLastClick}
                    disabled={totalPages === 0 || currentPage === totalPages}
                    className={`px-2 py-1 text-sm ${
                    totalPages === 0 || currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-sky-500 hover:text-sky-700"
                    }`}
                >
                    {'>>'}
                </button>
            </div>
        </div>
        
    )
}
