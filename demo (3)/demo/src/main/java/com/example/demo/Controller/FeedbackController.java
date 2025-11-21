package com.example.demo.Controller;

import com.example.demo.DTO.FeedbackDto;
import com.example.demo.Entity.Feedback;
import com.example.demo.Service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> submitFeedback(@Valid @RequestBody FeedbackDto feedbackDto) {
        Feedback feedback = feedbackService.saveFeedback(feedbackDto);
        return ResponseEntity.ok(feedback);
    }
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getFeedbackStats() {
        Map<String, Object> stats = feedbackService.getFeedbackStats();
        return ResponseEntity.ok(stats);
    }
}