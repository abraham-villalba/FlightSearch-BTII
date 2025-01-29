package com.flightsearch.backend.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // TODO: ADD TIMEOUT EXCEPTIONS FOR API CALLS
    // TODO: VALIDATE POSSIBLE EXCEPTIONS FROM AMADEUS API
    @ExceptionHandler(Exception.class)
    @ResponseStatus()
    public Map<String,Object> handleGeneralException(Exception e) {
        Map<String,Object> errors = new HashMap<>();
        errors.put("error", "Internal Server Error: Something went wrong...\n" + e.getMessage());
        return errors;
    }

}
