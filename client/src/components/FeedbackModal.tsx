import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";

export default function FeedbackModal() {
    const {loading, error} = useSelector((state: RootState) => state.flights);
    const [isOpen, setIsOpen] = useState(!!(loading || error));

    useEffect(() => {
        setIsOpen(loading || !!error);
    }, [loading, error]);

    if (!isOpen) return null;

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-xl font-medium text-gray-900">
                            {loading ? "Loading" : "Error"}
                        </h3>
                        <button
                            disabled={loading}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center disabled:cursor-not-allowed"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    {/* Modal Body */}
                    <div className="p-4">
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <LoadingSpinner size={40} className="mb-2" />
                                <p className="text-center">Loading flight results...</p>
                            </div>
                        ) : (
                            <p className="text-center">{error}</p>
                        )}
                    </div>
    
                    {/* Modal Footer */}
                    <div className="flex justify-end p-4 border-t border-gray-200 space-x-3">
                        <button
                            disabled={loading}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 disabled:cursor-not-allowed"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
    )
}
