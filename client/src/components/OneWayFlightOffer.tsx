// OneWayFlightOffer Component
import { Airport } from '../types/airportTypes';
import { Dictionary, FlightData } from '../types/flightTypes'
import FlightDetailsButton from './FlightDetailsButton';
import FlightSchedule from './FlightSchedule'

type OneWayFlightOfferProps = {
    flightOffer: FlightData,
    referenceData: Dictionary | null,
    departureAirport: Airport | null,
    arrivalAirport: Airport | null,
    onDetailsClick: (flightId: string) => void
}

export default function OneWayFlightOffer({flightOffer, referenceData, departureAirport, arrivalAirport, onDetailsClick} : OneWayFlightOfferProps) {
    const totalPrice = flightOffer.price.total;
    const currency = flightOffer.price.currency;
    const travelerPrice = flightOffer.travelerPricings[0].price.total;
  
    return (
        <div className="flex flex-row w-full max-w-screen-md justify-between mx-auto border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <div className='flex flex-col w-3/4'>
                <FlightSchedule 
                    itinerary={flightOffer.itineraries[0]} 
                    referenceData={referenceData} 
                    searchParams={{departureAirport, arrivalAirport}}
                />
                <div className='w-full'>
                    <div className='flex flex-col px-8 py-2'>
                        <div className='flex flex-row justify-between'>
                            <FlightDetailsButton 
                                onClick={onDetailsClick}
                                flightId={flightOffer.id}
                            />
                            <span className='block'></span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='flex flex-col justify-center p-8 text-end w-1/4 border-l bg-gray-50 rounded-r-lg'>
                <div>
                    <p className='text-xl font-bold text-gray-800'>{`${currency === 'EUR' ? '€' : '$'}${totalPrice} ${currency}`}</p>
                    <p className='text-sm text-gray-500'>Total</p>
                </div>
                <div className='mt-2'>
                    <p className='text-lg font-semibold text-gray-700'>{`${currency === 'EUR' ? '€' : '$'}${travelerPrice} ${currency}`}</p>
                    <p className='text-sm text-gray-500'>Per Traveler</p>
                </div>
            </div>
        </div>
  )
}
