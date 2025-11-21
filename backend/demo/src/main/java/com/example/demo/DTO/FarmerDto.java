package com.example.demo.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;



@Data
public class FarmerDto {

    @NotBlank private String name;
    @Email @NotBlank private String email;
    @NotBlank private String password;
    @NotBlank private String location;
    @NotBlank private String joinedDate;
    @NotBlank private String phoneNumber;
    @NotBlank private String farmSize;
}