package com.example.demo.Service;

import com.example.demo.DTO.FeedbackDto;
import com.example.demo.Entity.Feedback;

import java.util.Map;

public interface FeedbackService {
    Feedback saveFeedback(FeedbackDto dto);

    Map<String, Object> getFeedbackStats();
}