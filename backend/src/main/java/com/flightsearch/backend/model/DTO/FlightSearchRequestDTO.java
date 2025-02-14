package com.flightsearch.backend.model.DTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.flightsearch.backend.model.enums.Currency;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for flight offers search endpoint request data.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightSearchRequestDTO {

    @NotNull(message = "Departure Code must not be null")
    @Size(min = 3, max = 3, message = "Departure code must be exactly 3 characters long. Eg: LAX")
    private String departureCode;

    @NotNull(message = "Destination Code must not be null")
    @Size(min = 3, max = 3, message = "Destination code must be exactly 3 characters long. Eg: LAX")
    private String destinationCode;

    @NotNull(message = "Departure date must not be null")
    @FutureOrPresent(message = "Departure date must not be in the past")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate departureDate;
    
    @Nullable
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate returnDate;

    @NotNull(message = "numAdults can't be null")
    @Max(value=9, message = "Maximum number of adults is 9")
    private Integer numAdults;

    @NotNull(message = "nonStop can't be null")
    private Boolean nonStop;

    @NotNull(message = "currency can't be null")
    private Currency currency;

    @Nullable
    private String sortBy;

    @Min(value=1, message = "Page number must be greater or equal than 1")
    private Integer page;
}
