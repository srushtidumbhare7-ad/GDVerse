package com.gdverse.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "performance_history")
public class PerformanceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    @Column(name = "duration_spent")
    private String durationSpent;

    @Column(name = "speakers_count")
    private Integer speakersCount;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "badge_awarded")
    private String badgeAwarded;

    private String feedback;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public PerformanceHistory() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getTopicName() { return topicName; }
    public void setTopicName(String topicName) { this.topicName = topicName; }

    public String getDurationSpent() { return durationSpent; }
    public void setDurationSpent(String durationSpent) { this.durationSpent = durationSpent; }

    public Integer getSpeakersCount() { return speakersCount; }
    public void setSpeakersCount(Integer speakersCount) { this.speakersCount = speakersCount; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public String getBadgeAwarded() { return badgeAwarded; }
    public void setBadgeAwarded(String badgeAwarded) { this.badgeAwarded = badgeAwarded; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
