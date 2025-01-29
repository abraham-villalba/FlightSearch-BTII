package com.flightsearch.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.InMemoryReactiveOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    ReactiveClientRegistrationRepository clientRegistrations(
        @Value("${spring.security.oauth2.client.provider.amadeus.token-uri}") String token_uri,
        @Value("${spring.security.oauth2.client.registration.amadeus.client-id}") String client_id,
        @Value("${spring.security.oauth2.client.registration.amadeus.client-secret}") String client_secret
    ){
        System.out.println("The token uri that i'm using is:" + token_uri);
        ClientRegistration registration = ClientRegistration
            .withRegistrationId("amadeus")
            .tokenUri(token_uri)
            .clientId(client_id)
            .clientSecret(client_secret)
            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
            .build();
        return new InMemoryReactiveClientRegistrationRepository(registration);
    }

    @Bean
    WebClient webClient(ReactiveClientRegistrationRepository clientRegistrations) {
        InMemoryReactiveOAuth2AuthorizedClientService clientService = new InMemoryReactiveOAuth2AuthorizedClientService(clientRegistrations);
        AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager authorizedClientManager = new AuthorizedClientServiceReactiveOAuth2AuthorizedClientManager(clientRegistrations, clientService);
        ServerOAuth2AuthorizedClientExchangeFilterFunction oauth = new ServerOAuth2AuthorizedClientExchangeFilterFunction(authorizedClientManager);
        oauth.setDefaultClientRegistrationId("amadeus");

        // Increase the buffer size to 1MB
        ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(clientCodecConfigurer -> 
                clientCodecConfigurer.defaultCodecs().maxInMemorySize(1 * 1024 * 1024) // 1MB
            )
            .build();
        
        return WebClient
            .builder()
            .baseUrl("https://test.api.amadeus.com")
            .filter(oauth)
            .exchangeStrategies(strategies)
            .build();
    }
    
}
