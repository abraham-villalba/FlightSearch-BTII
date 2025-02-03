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
        <div className="flex flex-col w-full border rounded-md p-5 space-y-2">
            <div className="w-full space-y-2">
                <p>Price Breakdown</p>
                <br />
                <p>{`Base: ${formatPrice(generalPrice.base, generalPrice.currency)}`}</p>
                <p>{`Fees: ${formatPrice(fees.totalAmount, generalPrice.currency)}`} <span className="text-xs">{fees.description}</span></p>
                <p>{`Total: ${formatPrice(generalPrice.total, generalPrice.currency)}`}</p>
            </div>
            <div className="w-full p-4 border rounded">
                <p>Per traveler:</p>
                <p>{`Travelers: ${numTravelers}`}</p>
                <p>{`Base: ${formatPrice(travelerPrice.base, travelerPrice.currency)}`}</p>
                <p>{`Total: ${formatPrice(travelerPrice.total, travelerPrice.currency)}`}</p>
            </div>
        </div>
    )
}
