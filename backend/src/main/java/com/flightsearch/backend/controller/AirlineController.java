package com.flightsearch.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.backend.model.DTO.AirlineResponseDTO;
import com.flightsearch.backend.service.AirlineService;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * REST controller for handling Airline details requests.
 */
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/airlines")
public class AirlineController {

    @Autowired
    private AirlineService airlineService;

    /**
     * Endpoint to get Airline details by their codes
     * 
     * @param aitaCodes The codes of the Airlines in format "C1,C2,...,CN"
     * @return A ResponseEntity of Mono<AirlineResponseDTO>. (List of Airline details)
     */
    @GetMapping("/details")
    public ResponseEntity<Mono<AirlineResponseDTO>> getAirlineInformation(@RequestParam String aitaCodes) {
        return new ResponseEntity<Mono<AirlineResponseDTO>>(airlineService.getAirlineInformation(aitaCodes), HttpStatus.OK);
    }
    
}
