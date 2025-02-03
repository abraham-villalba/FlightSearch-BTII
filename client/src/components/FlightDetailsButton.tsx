type FlightDetailsButtonProps = {
    flightId: string;
    onClick: (flightId: string) => void;
}

export default function FlightDetailsButton({flightId, onClick} : FlightDetailsButtonProps) {
    return (
        <button 
            onClick={() => onClick(flightId)}
            className='flex flex-row px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:bg-gray-600'
        >
                Details
        </button>
    )
}
