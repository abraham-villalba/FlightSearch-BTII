package com.flightsearch.backend.service;

import com.flightsearch.backend.model.DTO.AirlineResponseDTO;

import reactor.core.publisher.Mono;

/**
 * Service class for managing Airport information
 */
public interface AirlineService {
    /**
     * Searches for airlines included in the iataCodes string
     *
     * @param iataCodes string including one or more Airline codes
     * @return a Mono of AirlineResponseDTO containing the details of the airlines.
     */
    public Mono<AirlineResponseDTO> getAirlineInformation(String iataCodes);
}
