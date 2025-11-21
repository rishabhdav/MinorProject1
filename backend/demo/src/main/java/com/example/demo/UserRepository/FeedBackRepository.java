package com.example.demo.UserRepository;

import com.example.demo.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedBackRepository  extends JpaRepository<Feedback, String> {
    List<Feedback> findTop5ByOrderByCreatedAtDesc(); // latest 5 feedbacks

    List<Feedback> findAll();
}

