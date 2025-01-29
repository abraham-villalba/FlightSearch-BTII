package com.flightsearch.backend.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,Object>>  handleGeneralException(Exception e) {
        Map<String,Object> errors = new HashMap<>();
        errors.put("error", "Internal Server Error: Something went wrong...\n" + e.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ClientErrorException.class)
    public ResponseEntity<Map<String,Object>> handleClientError(ClientErrorException ex) {
        Map<String,Object> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ServerErrorException.class)
    public ResponseEntity<Map<String,Object>> handleServerError(ServerErrorException ex) {
        Map<String,Object> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        StringBuilder errors = new StringBuilder();
        Map<String,Object> errorsRes = new HashMap<>();

        bindingResult.getAllErrors().forEach(error -> {
            errors.append(error.getDefaultMessage()).append("\n");
        });
        
        errorsRes.put("error", errors.toString());
        return new ResponseEntity<>(errorsRes, HttpStatus.BAD_REQUEST);
    }

}
