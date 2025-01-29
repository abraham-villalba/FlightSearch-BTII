package com.flightsearch.backend.service.implementation;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;
import com.flightsearch.backend.service.AirportSearchService;

import reactor.core.publisher.Mono;

@Service
public class AirportSearchServiceImplementation implements AirportSearchService {

    private WebClient webClient;

    public AirportSearchServiceImplementation(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public Mono<AirportSearchResponseDTO> searchAirport(String query) {
        if (query.length() < 1) {
            throw new IllegalArgumentException("The search query must be longer...");
        }
        
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v1/reference-data/locations")
                .queryParam("subType", "AIRPORT")
                .queryParam("keyword", query)
                .build())
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response -> 
                response.bodyToMono(String.class) // Capture the response body (error message)
                .flatMap(body -> {
                    System.out.println("I received a bad error 4xx");
                    // Handle client error and return Mono.error with custom exception
                    return Mono.error(new ClientErrorException("Client error: " + body));
                })
            )
            .onStatus(HttpStatusCode::is5xxServerError, response -> {
                System.out.println("I received a bad error 5xx");
                return Mono.error(new ServerErrorException("An error has occurred on the remote server..."));
            })
            .bodyToMono(AirportSearchResponseDTO.class);
    }
}
