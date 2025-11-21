package com.example.demo.Entity;



import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropRequest {

    @JsonProperty("N")
    @NotNull(message = "N is required")
    @Min(value = 0, message = "N must be >= 0")
    private Double N;

    @JsonProperty("P")
    @NotNull(message = "P is required")
    @Min(value = 0, message = "P must be >= 0")
    private Double P;

    @JsonProperty("K")
    @NotNull(message = "K is required")
    @Min(value = 0, message = "K must be >= 0")
    private Double K;

    @JsonProperty("temperature")
    @NotNull(message = "temperature is required")
    private Double temperature;

    @JsonProperty("humidity")
    @NotNull(message = "humidity is required")
    private Double humidity;

    @JsonProperty("ph")
    @NotNull(message = "ph is required")
    private Double ph;

    @JsonProperty("rainfall")
    @NotNull(message = "rainfall is required")
    private Double rainfall;
}
