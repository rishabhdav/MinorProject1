package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CropResponse {
    private String status;
    private List<TopCrop> top_3_crops;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopCrop {
        private String crop;
        private Double confidence;
    }
}
