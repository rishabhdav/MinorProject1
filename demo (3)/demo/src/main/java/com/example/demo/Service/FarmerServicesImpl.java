package com.example.demo.Service;


import com.example.demo.DTO.FarmerDashboardDto;
import com.example.demo.DTO.FarmerDto;
import com.example.demo.DTO.FarmerLoginDto;
import com.example.demo.Entity.Farmer;
import com.example.demo.Exception.AuthException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FarmerServicesImpl implements FarmerServices {

    private final com.example.demo.UserRepository.FarmerRepository farmerRepository;

    @Override
    public Farmer saveFarmer(Farmer farmer) {
        // Check if email is already registered
        Optional<Farmer> existingFarmer = farmerRepository.findByEmail(farmer.getEmail());
        if (existingFarmer.isPresent()) {
            throw new AuthException("Email already registered");
        }

        return farmerRepository.save(farmer);
    }


    @Override
    public FarmerDto login(FarmerLoginDto loginDto) {
        // Find farmer by email
        Farmer farmer = farmerRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        // Check password
        if (!farmer.getPassword().equals(loginDto.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        // Return DTO without password
        FarmerDto dto = new FarmerDto();
        dto.setName(farmer.getName());
        dto.setEmail(farmer.getEmail());

        return dto;
    }


    @Override
    public FarmerDashboardDto getDashboard(String email) {

        Optional<Farmer> farmer = farmerRepository.findByEmail(email);

        if (farmer.isEmpty()) {
            throw new AuthException("Farmer not found");
        }

        FarmerDashboardDto dto = new FarmerDashboardDto();
        dto.setName(farmer.get().getName());
        dto.setEmail(farmer.get().getEmail());
        dto.setLocation(farmer.get().getLocation());
        dto.setJoinedDate(farmer.get().getJoinedDate());
        dto.setPhoneNumber(farmer.get().getPhoneNumber());
        dto.setFarmSize(farmer.get().getFarmSize());

        return dto;
    }
}