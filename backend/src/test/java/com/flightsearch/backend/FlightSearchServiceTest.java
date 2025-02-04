package com.flightsearch.backend;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.time.LocalDate;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.DTO.FlightSearchRequestDTO;
import com.flightsearch.backend.model.DTO.FlightSearchResponseDTO;
import com.flightsearch.backend.model.enums.Currency;
import com.flightsearch.backend.service.FlightSearchService;
import com.flightsearch.backend.service.implementation.FlightSearchServiceImplementation;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import reactor.core.publisher.Mono;

public class FlightSearchServiceTest {
    
    private MockWebServer mockWebServer;
    private FlightSearchService flightSearchService;

    @BeforeEach
    void setUpMockServer() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
        String baseUrl = mockWebServer.url("/").toString();
        WebClient webClient = WebClient.create(baseUrl);
        flightSearchService = new FlightSearchServiceImplementation(webClient);
    }

    @AfterEach
    void shutDown() throws IOException {
        mockWebServer.shutdown();
    }

    @Test
    void shouldThrowExceptionForInvalidDates() {
        assertThrows(IllegalArgumentException.class, () -> {
            FlightSearchRequestDTO request = new FlightSearchRequestDTO("BOS","JFK",LocalDate.now().minusDays(1),null,2,false,Currency.USD,null,1);
            flightSearchService.searchFlights(request); 
        });
        assertThrows(IllegalArgumentException.class, () -> {
            FlightSearchRequestDTO request = new FlightSearchRequestDTO("BOS","JFK",LocalDate.now(),LocalDate.now().minusDays(1),2,false,Currency.USD,null,1);
            flightSearchService.searchFlights(request); 
        });
    }

    @Test
    void shouldThrowClientErrorFor4xxResponse() throws IOException {
        // Simulate a 4xx error response
        mockWebServer.enqueue(new MockResponse()
            .setResponseCode(400)
            .setHeader("Content-Type", "application/json")
            .setBody("{\"error\": \"Bad request\"}")
        );

        FlightSearchRequestDTO request = new FlightSearchRequestDTO("BOS","JFK",LocalDate.now(),null,2,false,Currency.USD,null,1);

        Mono<FlightSearchResponseDTO> response = flightSearchService.searchFlights(request);

        assertThrows(ClientErrorException.class, () -> {
            response.block(); 
        });
    }

    @Test
    void shouldThrowServerErrorFor5xxResponse() throws IOException {
        // Simulate a 5xx error response
        mockWebServer.enqueue(new MockResponse()
            .setResponseCode(500)
            .setHeader("Content-Type", "application/json")
            .setBody("{\"error\": \"Something happened\"}")
        );

        FlightSearchRequestDTO request = new FlightSearchRequestDTO("BOS","JFK",LocalDate.now(),null,2,false,Currency.USD,null,1);

        Mono<FlightSearchResponseDTO> response = flightSearchService.searchFlights(request);

        assertThrows(ServerErrorException.class, () -> {
            response.block(); 
        });
    }
}
