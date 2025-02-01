// OneWayFlightOffer Component
import FlightSchedule from './FlightSchedule'

export default function OneWayFlightOffer() {
  return (
    <div className='flex flex-row w-full max-w-screen-md justify-between mx-auto border rounded-md'>
        <div className='flex flex-col w-3/4'>
            <FlightSchedule />
        </div>
        <div className='flex flex-col justify-center p-8 text-end w-1/4'>
            <div>
                <p>$1,500.00 MXN</p>
                <p className='text-sm'>total</p>
            </div>
            <div>
                <p>$500.00 MXN</p>
                <p className='text-sm'>per Traveler</p>
            </div>
        </div>
    </div>
  )
}
