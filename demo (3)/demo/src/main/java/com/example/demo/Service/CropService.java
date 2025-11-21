package com.example.demo.Service;


import com.example.demo.DTO.CropResponse;
import com.example.demo.Entity.CropRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CropService {

    private final RestTemplate restTemplate;
    private final String fastapiUrl;

    public CropService(RestTemplate restTemplate, @Value("${app.fastapi.url}") String fastapiUrl) {
        this.restTemplate = restTemplate;
        this.fastapiUrl = fastapiUrl;
    }

    /**
     * Send validated request to FastAPI and map response to CropResponse.
     */
    public CropResponse getTopCrops(CropRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<CropRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<CropResponse> resp = restTemplate.exchange(
                fastapiUrl,
                HttpMethod.POST,
                entity,
                CropResponse.class
        );

        return resp.getBody();
    }
}
