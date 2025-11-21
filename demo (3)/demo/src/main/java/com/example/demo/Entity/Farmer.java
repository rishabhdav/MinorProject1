package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
public class Farmer {

    @Id
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Joined date is required")
    private String joinedDate;

    @Pattern(
            regexp = "^(\\+91)?[0-9]{10}$",
            message = "Invalid Indian phone number"
    )

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Farm size is required")
    private String farmSize;
}
