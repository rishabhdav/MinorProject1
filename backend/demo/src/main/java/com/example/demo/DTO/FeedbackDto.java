package com.example.demo.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class FeedbackDto {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private int rating;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Message is required")
    private String message;
}
