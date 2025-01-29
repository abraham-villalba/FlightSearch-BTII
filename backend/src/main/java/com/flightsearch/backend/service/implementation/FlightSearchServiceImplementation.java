package com.flightsearch.backend.service.implementation;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;
import com.flightsearch.backend.service.FlightSearchService;

import reactor.core.publisher.Mono;

@Service
public class FlightSearchServiceImplementation implements FlightSearchService{

    private final WebClient webClient;

    public FlightSearchServiceImplementation(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public Mono<FlightSearchResponseDTO> searchFlights(FlightSearchRequestDTO request){
        System.out.println("I call searchFlights " + request.getDepartureCode());
        
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v2/shopping/flight-offers")
                .queryParam("originLocationCode", request.getDepartureCode())
                .queryParam("destinationLocationCode", request.getDestinationCode())
                .queryParam("departureDate", request.getDepartureDate())
                .queryParam("returnDate", request.getReturnDate() != null ? request.getReturnDate() : null)
                .queryParam("adults", request.getNumAdults())
                .queryParam("nonStop", request.getNonStop())
                .queryParam("max", 3)
                .queryParam("currencyCode", request.getCurrency().toString())
                .build())
            .retrieve()
            .bodyToMono(FlightSearchResponseDTO.class)
            .doOnTerminate(() -> System.out.println("Response received"));
    }
}
