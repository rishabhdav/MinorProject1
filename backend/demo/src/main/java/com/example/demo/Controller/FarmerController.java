package com.example.demo.Controller;

import com.example.demo.DTO.FarmerDashboardDto;
import com.example.demo.DTO.FarmerDto;
import com.example.demo.DTO.FarmerLoginDto;
import com.example.demo.Entity.Farmer;
import com.example.demo.Service.FarmerServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/farmer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerController {

    private final FarmerServices farmerServices;
    @PostMapping("/signup")
    public ResponseEntity<?> saveFarmer(@Valid @RequestBody FarmerDto farmerDto) {
        Farmer farmer = new Farmer();
        farmer.setId(UUID.randomUUID().toString());
        farmer.setName(farmerDto.getName());
        farmer.setEmail(farmerDto.getEmail());
        farmer.setPassword(farmerDto.getPassword());
        farmer.setLocation(farmerDto.getLocation());
        farmer.setJoinedDate(farmerDto.getJoinedDate());
        farmer.setPhoneNumber(farmerDto.getPhoneNumber());
        farmer.setFarmSize(farmerDto.getFarmSize());

        Farmer saved = farmerServices.saveFarmer(farmer);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody FarmerLoginDto loginDto) {
        FarmerDto farmer = farmerServices.login(loginDto);
        return ResponseEntity.ok(farmer);
    }
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@RequestParam @Valid String email) {
        FarmerDashboardDto dto = farmerServices.getDashboard(email);
        System.out.println(dto);
        return ResponseEntity.ok(dto);
    }
}