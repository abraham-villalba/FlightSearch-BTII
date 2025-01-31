import FlightSearchForm from "../components/FlightSearchForm";

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-3xl text-center w-full my-10">Flight Search</h1>
        <FlightSearchForm />
    </div>
  )
}
