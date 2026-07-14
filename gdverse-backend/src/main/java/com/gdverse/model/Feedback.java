package com.gdverse.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "history_id", nullable = false)
    private PerformanceHistory performanceHistory;

    @Column(name = "grammar_score")
    private Integer grammarScore;

    @Column(name = "fluency_score")
    private Integer fluencyScore;

    @Column(name = "relevance_score")
    private Integer relevanceScore;

    @Column(name = "vocabulary_score")
    private Integer vocabularyScore;

    private String strengths;
    private String weaknesses;
    private String corrections;

    @Column(name = "improvement_tips")
    private String improvementTips;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public Feedback() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PerformanceHistory getPerformanceHistory() { return performanceHistory; }
    public void setPerformanceHistory(PerformanceHistory performanceHistory) { this.performanceHistory = performanceHistory; }

    public Integer getGrammarScore() { return grammarScore; }
    public void setGrammarScore(Integer grammarScore) { this.grammarScore = grammarScore; }

    public Integer getFluencyScore() { return fluencyScore; }
    public void setFluencyScore(Integer fluencyScore) { this.fluencyScore = fluencyScore; }

    public Integer getRelevanceScore() { return relevanceScore; }
    public void setRelevanceScore(Integer relevanceScore) { this.relevanceScore = relevanceScore; }

    public Integer getVocabularyScore() { return vocabularyScore; }
    public void setVocabularyScore(Integer vocabularyScore) { this.vocabularyScore = vocabularyScore; }

    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }

    public String getWeaknesses() { return weaknesses; }
    public void setWeaknesses(String weaknesses) { this.weaknesses = weaknesses; }

    public String getCorrections() { return corrections; }
    public void setCorrections(String corrections) { this.corrections = corrections; }

    public String getImprovementTips() { return improvementTips; }
    public void setImprovementTips(String improvementTips) { this.improvementTips = improvementTips; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
