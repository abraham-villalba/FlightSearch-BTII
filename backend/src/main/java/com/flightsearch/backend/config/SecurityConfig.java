package com.flightsearch.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(org.springframework.security.config.Customizer.withDefaults())  // Use default CSRF configuration
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/**").permitAll()  // Allow all requests to any endpoint
            )
            .formLogin(formLogin -> formLogin.disable());  // Disable form login

        return http.build();
    }
}
