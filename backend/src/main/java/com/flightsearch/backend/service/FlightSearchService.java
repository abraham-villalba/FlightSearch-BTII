package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;

import reactor.core.publisher.Mono;

/**
 * Service class for managing Flight Offers information
 */
public interface FlightSearchService {
    /**
     * Searches for flight offers given the request.
     *
     * @param request FlightSearchRequestDTO object with request information.
     * @return a Mono of FlightSearchResponseDTO containing the list of flight offers and more info.
     */
    public Mono<FlightSearchResponseDTO> searchFlights(FlightSearchRequestDTO request);
}
