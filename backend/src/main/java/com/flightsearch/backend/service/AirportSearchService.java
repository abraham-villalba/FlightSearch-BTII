package com.flightsearch.backend.service;

import com.flightsearch.backend.model.AirportSearch.Airport;
import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;
import com.flightsearch.backend.model.FlightSearch.Location;

import reactor.core.publisher.Mono;

/**
 * Service class for managing Airport information
 */
public interface AirportSearchService {
    /**
     * Searches for airports matching the given query string.
     *
     * @param query the search term used to find airports.
     * @return a Mono of AirportSearchResponseDTO containing the search results.
     */
    public Mono<AirportSearchResponseDTO> searchAirport(String query);

    /**
     * Retrieves airport details by IATA code and location.
     * If the airport is already cached, it returns the cached data. Otherwise, it makes 
     * a request to the external API and caches the result.
     *
     * @param iataCode the IATA code of the airport.
     * @param location the location details (city and country) to assist in filtering results.
     * @return a Mono of Airport object associated with the IATA code.
     */
    public Mono<Airport> getAirport(String iataCode, Location location);
}
