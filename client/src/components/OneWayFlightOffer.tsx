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
        <div className='flex flex-row w-full max-w-screen-md justify-between mx-auto border rounded-md'>
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
            <div className='flex flex-col justify-center p-8 text-end w-1/4'>
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
