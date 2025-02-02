// TwoWayFlightOffer Component
import { Airport } from '../types/airportTypes'
import { Dictionary, FlightData } from '../types/flightTypes'
import FlightSchedule from './FlightSchedule'

type TwoWayFlightOfferProps = {
    flightOffer: FlightData,
    referenceData: Dictionary | null,
    departureAirport: Airport | null,
    arrivalAirport: Airport | null
}

export default function TwoWayFlightOffer({flightOffer, referenceData, departureAirport, arrivalAirport} : TwoWayFlightOfferProps) {
    const totalPrice = flightOffer.price.total;
    const currency = flightOffer.price.currency;
    const travelerPrice = flightOffer.travelerPricings[0].price.total;

    const getSearchParams = (itineraryIndex: number) => {
        const isDeparture = itineraryIndex === 0;
        return {
            departureAirport: isDeparture ? departureAirport : arrivalAirport,
            arrivalAirport: isDeparture ? arrivalAirport : departureAirport
        };
    };

    return (
        <div className='flex flex-row w-full max-w-screen-md justify-between mx-auto border rounded-md'>
            
            <div className='flex flex-col w-3/4'>
                { flightOffer.itineraries.length === 2 && (
                    flightOffer.itineraries.map((itinerary, index) => (
                        <div key={itinerary.segments[0].number}>  {/* Use a unique key */}
                            <FlightSchedule 
                                itinerary={itinerary} 
                                referenceData={referenceData} 
                                searchParams={getSearchParams(index)}
                            />
                            {index < flightOffer.itineraries.length - 1 && <div className='border-b w-full mt-2'></div>}
                        </div>
                )))}
            </div>
            <div className='flex flex-col justify-center p-8 text-end w-1/4 border-l'>
                <div>
                    <p>{`${currency === 'EUR' ? '€' : '$'}${totalPrice} ${currency}`}</p>
                    <p className='text-sm'>total</p>
                </div>
                <div>
                    <p>{`${currency === 'EUR' ? '€' : '$'}${travelerPrice} ${currency}`}</p>
                    <p className='text-sm'>per Traveler</p>
                </div>
            </div>
        </div>
    )
}
