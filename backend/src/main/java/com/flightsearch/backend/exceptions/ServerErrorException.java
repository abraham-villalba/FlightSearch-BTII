package com.flightsearch.backend.exceptions;

public class ServerErrorException extends RuntimeException{
    public ServerErrorException(String message){
        super(message);
    }
}
