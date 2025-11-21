package com.example.demo.UserRepository;

import com.example.demo.Entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmerRepository extends JpaRepository<Farmer, String> {
    Optional<Farmer> findByEmail(String email);
}
