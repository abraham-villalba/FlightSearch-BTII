import FlightSearchForm from "../components/FlightSearchForm";

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Flight Search</h1>
        <FlightSearchForm />
    </div>
  )
}
