import { Amenity } from "../types/flightTypes"

type TravelersFareDetailsProps = {
    cabin: string,
    className: string,
    amenities: Amenity[]
}



export default function TravelersFareDetails({cabin, className , amenities} : TravelersFareDetailsProps) {
    return (
        <div className="flex flex-col w-full border rounded-md bg-gray-500 p-3 text-sm">
            <p>Travelers fare details</p>
            <p>Cabin: {cabin}</p>
            <p>Class: {className}</p>
            <p>Amenities:</p>
            <ul>
                {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <li key={amenity.description} className="text-xs">{`${amenity.description}: ${amenity.isChargeable ? 'chargeable' : 'included'}`}</li>
                    ))
                ) : (
                    <li className="text-xs">No amenities available</li>
                )}
                
            </ul>
        </div>
    )
}
