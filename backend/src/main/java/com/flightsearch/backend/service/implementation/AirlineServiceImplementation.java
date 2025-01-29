package com.flightsearch.backend.service.implementation;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.DTO.AirlineResponseDTO;
import com.flightsearch.backend.service.AirlineService;

import reactor.core.publisher.Mono;

@Service
public class AirlineServiceImplementation implements AirlineService {
    
    private WebClient webClient;

    public AirlineServiceImplementation(WebClient webClient){
        this.webClient = webClient;
    }

    @Override
    public Mono<AirlineResponseDTO> getAirlineInformation(String iataCodes) {
        if (iataCodes.length() < 2) {
            throw new IllegalArgumentException("The airline codes should follow IATA's standards...");
        }
        
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v1/reference-data/airlines")
                .queryParam("airlineCodes", iataCodes)
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
            .bodyToMono(AirlineResponseDTO.class);
    }
}
