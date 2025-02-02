import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import FlightSearchPage from "./pages/FlightSearchPage"
import FlightResultsPage from "./pages/FlightResultsPage"
import FlightDetailsPage from "./pages/FlightDetailsPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearchPage />}></Route>
        <Route path="/results" element={<FlightResultsPage />}></Route>
        {/* Should path include something about the offer? Id? */}
        <Route path="/results/details" element={<FlightDetailsPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
