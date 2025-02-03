import { Price } from "../types/flightTypes"

type PriceBreakdownDetailsProps = {
    generalPrice: Price
    fees: {
        totalAmount: number,
        description: string
    }
    travelerPrice: Price,
    numTravelers: number
}

const formatPrice = (price: number, currency: string) : string => currency === 'EUR' ? '€' : '$' + `${price} ${currency}`;

export default function PriceBreakdownDetails({generalPrice, fees, travelerPrice, numTravelers} : PriceBreakdownDetailsProps) {
    return (
        <div className="flex flex-col w-full border rounded-md p-5 space-y-3 bg-white shadow-md">
            <div className="w-full space-y-3">
                <p className="text-xl font-semibold">Price Breakdown</p>
                <p>{`Base: ${formatPrice(generalPrice.base, generalPrice.currency)}`}</p>
                <p>{`Fees: ${formatPrice(fees.totalAmount, generalPrice.currency)}`} 
                   <span className="text-xs text-gray-500">{fees.description}</span>
                </p>
                <p>{`Total: ${formatPrice(generalPrice.total, generalPrice.currency)}`}</p>
            </div>
            <div className="w-full p-4 border-t-2 border-gray-300 mt-3">
                <p className="font-semibold">Per traveler:</p>
                <p>{`Travelers: ${numTravelers}`}</p>
                <p>{`Base: ${formatPrice(travelerPrice.base, travelerPrice.currency)}`}</p>
                <p>{`Total: ${formatPrice(travelerPrice.total, travelerPrice.currency)}`}</p>
            </div>
        </div>
    )
}
