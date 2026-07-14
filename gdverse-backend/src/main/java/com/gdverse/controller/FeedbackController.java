package com.gdverse.controller;

import com.gdverse.model.Feedback;
import com.gdverse.model.PerformanceHistory;
import com.gdverse.repository.FeedbackRepository;
import com.gdverse.repository.PerformanceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private PerformanceHistoryRepository historyRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<PerformanceHistory>> getUserHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(historyRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }

    @GetMapping("/report/{historyId}")
    public ResponseEntity<Feedback> getDetailedReport(@PathVariable Long historyId) {
        return feedbackRepository.findByPerformanceHistoryId(historyId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/report/{historyId}/download")
    public ResponseEntity<byte[]> downloadReportPdf(@PathVariable Long historyId) {
        // Generating a mock PDF report content byte array
        String mockPdfContent = "%PDF-1.4\n1 0 obj\n<< /Title (GDVerse AI Performance Report) >>\nendobj\n%%EOF";
        byte[] pdfBytes = mockPdfContent.getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "GDVerse_Report_" + historyId + ".pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @PostMapping("/evaluate-speech")
    public ResponseEntity<?> evaluateSpeech(@RequestBody Map<String, String> request) {
        String transcript = request.get("speechText");
        if (transcript == null || transcript.isBlank()) {
            return ResponseEntity.badRequest().body("Speech transcription text is required!");
        }

        // Mock evaluation metrics
        int grammar = Math.max(70, (int)(Math.random() * 30) + 70);
        int fluency = Math.max(70, (int)(Math.random() * 30) + 70);
        int vocab = Math.max(65, (int)(Math.random() * 35) + 65);
        int relevance = Math.max(80, (int)(Math.random() * 20) + 80);
        int overall = (grammar + fluency + vocab + relevance) / 4;

        return ResponseEntity.ok(Map.of(
                "overallScore", overall,
                "metrics", Map.of(
                        "grammar", grammar,
                        "fluency", fluency,
                        "vocabulary", vocab,
                        "relevance", relevance
                ),
                "strengths", "Maintained logical frameworks throughout arguments.",
                "weaknesses", "Mild pauses and dependency on standard vocabulary verbs.",
                "corrections", "Substitute basic filler terms with strategic synonyms."
        ));
    }
}
