package com.flightsearch.backend.service.implementation;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.flightsearch.backend.exceptions.ClientErrorException;
import com.flightsearch.backend.exceptions.ServerErrorException;
import com.flightsearch.backend.model.AirportSearch.Address;
import com.flightsearch.backend.model.AirportSearch.Airport;
import com.flightsearch.backend.model.DTO.AirportSearchResponseDTO;
import com.flightsearch.backend.model.FlightSearch.Location;
import com.flightsearch.backend.service.AirportSearchService;

import reactor.core.publisher.Mono;
/**
 * Implementation of AirportSearchService that interacts with Amadeus API 
 * to fetch airport-related information. This service uses WebClient to perform 
 * non-blocking HTTP requests and maintains a local cache for optimized performance.
 */
@Service
public class AirportSearchServiceImplementation implements AirportSearchService {

    private WebClient webClient;
    private Map<String, Airport> airportCache = new ConcurrentHashMap<>();

    /**
     * Constructs an instance of AirportSearchServiceImplementation.
     *
     * @param webClient the WebClient instance used for making API requests to Amadeus.
     */
    public AirportSearchServiceImplementation(WebClient webClient) {
        this.webClient = webClient;
    }

    /**
     * Searches for airports matching the given query string.
     *
     * @param query the search term used to find airports.
     * @return a Mono of AirportSearchResponseDTO containing the search results.
     * @throws IllegalArgumentException if the query string is empty.
     * @throws ClientErrorException if a 4xx error occurs during the API request.
     * @throws ServerErrorException if a 5xx error occurs during the API request.
     */
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

    /**
     * Retrieves airport details by IATA code and location.
     * If the airport is already cached, it returns the cached data. Otherwise, it makes 
     * a request to the external API and caches the result.
     *
     * @param iataCode the IATA code of the airport.
     * @param location the location details (city and country) to assist in filtering results.
     * @return a Mono of Airport object associated with the IATA code.
     * @throws IllegalArgumentException if the IATA code is null or empty.
     * @throws ClientErrorException if a 4xx error occurs during the API request.
     * @throws ServerErrorException if a 5xx error occurs during the API request.
     */
    @Override
    public Mono<Airport> getAirport(String iataCode, Location location) {
        if (iataCode == null || iataCode.length() < 1) {
            return Mono.error(new IllegalArgumentException("The search query must be longer..."));
        }

        // Check the cache first.
        if (airportCache.containsKey(iataCode)) {
            return Mono.just(airportCache.get(iataCode));
        }

        // Call the API
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v1/reference-data/locations")
                // Request both AIRPORT and CITY/LOCATION results.
                .queryParam("subType", "AIRPORT,CITY")
                .queryParam("keyword", iataCode)
                .build())
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(new ClientErrorException("Client error: " + body)))
            )
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(new ServerErrorException("Server error: " + body)))
            )
            .bodyToMono(AirportSearchResponseDTO.class)
            // Delay the API call result to help avoid rate limits.
            .delayElement(Duration.ofMillis(1500))
            .map(candidates -> {
                // Create a placeholder with basic information.
                Airport placeholder = new Airport();
                Address address = new Address();
                address.setCityCode(location.getCityCode());
                address.setCityName("");
                address.setCountryCode(location.getCountryCode());
                address.setCountryName("");
                placeholder.setIataCode(iataCode);
                placeholder.setAddress(address);

                // Iterate over the candidates.
                for (Airport candidate : candidates.getData()) {
                    if (candidate.getIataCode().equalsIgnoreCase(iataCode)) {
                        // Found an exact match.
                        airportCache.put(iataCode, candidate);
                        return candidate;
                    }
                    // If the candidate’s address matches the location’s city and country.
                    if (candidate.getAddress().getCityCode().equalsIgnoreCase(address.getCityCode()) &&
                        candidate.getAddress().getCountryCode().equalsIgnoreCase(address.getCountryCode())) {
                        placeholder.setAddress(candidate.getAddress());
                    }
                }
                // If no match is found, assign default values.
                placeholder.setName("Unknown");
                placeholder.setDetailedName("Unknown");
                // Since we probably won't find a match with the same search query, add it to the cache.
                airportCache.put(iataCode, placeholder);
                return placeholder;
            });
    }
}
