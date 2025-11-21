package com.example.demo.Controller;



import com.example.demo.DTO.CropResponse;
import com.example.demo.Entity.CropRequest;
import com.example.demo.Service.CropService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Validated
public class CropController {

    private final CropService cropService;


    @PostMapping("/recommend-crop")
    public ResponseEntity<CropResponse> recommendCrop(@Valid @RequestBody CropRequest request) {
        CropResponse response = cropService.getTopCrops(request);
        return ResponseEntity.ok(response);
    }
}
