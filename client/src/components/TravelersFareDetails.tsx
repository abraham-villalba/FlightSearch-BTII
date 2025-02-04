import { Amenity } from "../types/flightTypes"

type TravelersFareDetailsProps = {
    cabin: string,
    className: string,
    amenities: Amenity[]
}



export default function TravelersFareDetails({cabin, className , amenities} : TravelersFareDetailsProps) {
    return (
        <div className="flex flex-col w-full p-4 text-sm">
            <p className="font-semibold">Travelers Fare Details</p>
            <p><strong>Cabin:</strong> {cabin}</p>
            <p><strong>Class:</strong> {className}</p>
            <p><strong>Amenities:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
                {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <li key={amenity.description} className="text-xs">
                            <strong>{amenity.description}:</strong> 
                            {amenity.isChargeable ? ' Chargeable' : ' Included'}
                        </li>
                    ))
                ) : (
                    <li className="text-xs">No amenities available</li>
                )}
            </ul>
        </div>
    )
}
