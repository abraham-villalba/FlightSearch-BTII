
type FlightScheduleProps = {

}

export default function FlightSchedule() {
  return (
    <div className='w-full'>
        <div className='flex flex-col p-8'>
            {/* General Time */}
            <div className='flex flex-row justify-between'>
                <p className='w-3/4'>1:40pm - 10:37pm</p>
                <span className='block'></span>
            </div>
            {/* Main Flight info */}
            <div className='flex flex-row justify-between'>
                {/* From - To */}
                <p className='w-2/3'>San Francisco (SFO) - New York (JFK)</p>
                {/* Duration + number of stops */}
                <p className='w-1/3'>8h 17m (1 stop)</p>
            </div>
            {/* Layovers info */}
            <div className='flex flex-row justify-between'>
                {/* Space to align */}
                <div className='w-2/3'></div>
                {/* Layover info */}
                <div className='w-1/3'>
                    <p>1h 3m in LAX</p>
                </div>
            </div>
            {/* Carrier information */}
            <div className='mt-4'>
                <p>Aeromexico (AM)</p>
            </div>
        </div>
    </div>
  )
}
