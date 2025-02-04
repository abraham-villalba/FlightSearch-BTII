type FlightDetailsButtonProps = {
    flightId: string;
    onClick: (flightId: string) => void;
}

export default function FlightDetailsButton({flightId, onClick} : FlightDetailsButtonProps) {
    return (
        <button 
            onClick={() => onClick(flightId)}
            className='flex flex-row px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed text-sm'
        >
            Details
        </button>
    )
}
