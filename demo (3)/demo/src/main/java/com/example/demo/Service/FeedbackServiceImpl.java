package com.example.demo.Service;
import com.example.demo.DTO.FeedbackDto;
import com.example.demo.Entity.Feedback;

import com.example.demo.Service.FeedbackService;

import com.example.demo.UserRepository.FarmerRepository;
import com.example.demo.UserRepository.FeedBackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedBackRepository feedbackRepository;

    private final FarmerRepository farmerRepository;



    @Override
    public Feedback saveFeedback(FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setId(UUID.randomUUID().toString());
        feedback.setName(dto.getName());
        feedback.setEmail(dto.getEmail());
        feedback.setRating(dto.getRating());
        feedback.setCategory(dto.getCategory());
        feedback.setMessage(dto.getMessage());
        feedback.setCreatedAt(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    @Override
    public Map<String, Object> getFeedbackStats() {
        List<Feedback> all = feedbackRepository.findAll();

        double avgRating = all.stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0);

        Map<Integer, Long> ratingDistribution = all.stream()
                .collect(Collectors.groupingBy(Feedback::getRating, Collectors.counting()));

        List<Map<String, Object>> latestFeedback = feedbackRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(f -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", f.getName());
                    map.put("rating", f.getRating());
                    map.put("message", f.getMessage());
                    map.put("time", f.getCreatedAt().toString());
                    return map;
                })
                .collect(Collectors.toList());


        // For simplicity, trendData by day of week
        Map<String, Long> trendMap = all.stream()
                .collect(Collectors.groupingBy(
                        f -> f.getCreatedAt().getDayOfWeek().toString().substring(0,3),
                        Collectors.counting()
                ));

        List<Map<String, Object>> trendData = trendMap.entrySet()
                .stream()
                .map(e -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", e.getKey());
                    map.put("feedback", e.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        long totalUsers =  farmerRepository.count();

        Map<String, Object> response = new HashMap<>();
        response.put("totalFeedback", all.size());
        response.put("avgRating", avgRating);
        response.put("usersCount", totalUsers);
        response.put("ratingDistribution", ratingDistribution);
        response.put("latestFeedback", latestFeedback);
        response.put("trendData", trendData);

        return response;
    }
}