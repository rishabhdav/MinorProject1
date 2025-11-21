package com.example.demo.Service;

import com.example.demo.DTO.FarmerDashboardDto;
import com.example.demo.DTO.FarmerDto;
import com.example.demo.DTO.FarmerLoginDto;
import com.example.demo.Entity.Farmer;

public interface FarmerServices {

    Farmer saveFarmer(Farmer farmer);
    FarmerDashboardDto getDashboard(String email);
    FarmerDto login(FarmerLoginDto loginDto);
}
