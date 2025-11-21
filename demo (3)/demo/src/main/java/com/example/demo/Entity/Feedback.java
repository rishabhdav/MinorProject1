package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {

    @Id
    private String id;  // manually assigned

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
