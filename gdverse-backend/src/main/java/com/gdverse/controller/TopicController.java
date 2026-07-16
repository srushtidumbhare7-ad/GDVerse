package com.gdverse.controller;

import com.gdverse.model.Topic;
import com.gdverse.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*")
public class TopicController {

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(topicRepository.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Topic>> searchTopics(@RequestParam String q) {
        return ResponseEntity.ok(topicRepository.findByNameContainingIgnoreCase(q));
    }

    @GetMapping("/category/{cat}")
    public ResponseEntity<List<Topic>> filterByCategory(@PathVariable String cat) {
        return ResponseEntity.ok(topicRepository.findByCategoryIgnoreCase(cat));
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic saved = topicRepository.save(topic);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/generate-ai")
    public ResponseEntity<?> generateAiTopic(@RequestBody Map<String, String> request) {
        String keyword = request.get("keyword");
        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.badRequest().body("Keyword is required!");
        }

        // Mocking Gemini generative structure
        Topic mockAiTopic = new Topic(
                "Socio-Economic Impacts of " + keyword + " on Emerging Economies",
                "Artificial Intelligence",
                "Hard",
                "20 mins"
        );
        
        return ResponseEntity.ok(Map.of(
                "topic", mockAiTopic,
                "summary", "Evaluates how " + keyword + " changes workforces, trade balances, and educational criteria in modern hubs."
        ));
    }
}
