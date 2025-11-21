package com.example.demo.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FarmerLoginDto {

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password required")
    private String password;
}
