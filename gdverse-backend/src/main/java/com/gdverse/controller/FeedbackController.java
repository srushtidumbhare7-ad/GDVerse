package com.gdverse.controller;

import com.gdverse.model.Feedback;
import com.gdverse.model.PerformanceHistory;
import com.gdverse.repository.FeedbackRepository;
import com.gdverse.repository.PerformanceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Value("${gdverse.ai.gemini.key}")
    private String geminiApiKey;

    @Value("${gdverse.ai.gemini.url}")
    private String geminiApiUrl;

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
    public ResponseEntity<?> evaluateSpeech(@RequestBody Map<String, Object> request) {
        String transcript = (String) request.get("speechText");
        String topic = (String) request.get("topic");
        String history = (String) request.get("chatHistory");

        if (transcript == null || transcript.isBlank()) {
            return ResponseEntity.badRequest().body("Speech transcription text is required!");
        }
        if (topic == null || topic.isBlank()) {
            topic = "Impact of AI & Tech Automation on General Labor Roles";
        }
        if (history == null) {
            history = "";
        }

        // 1. Try calling the Gemini API if configured
        String geminiRawResponse = callGemini(topic, transcript, history);
        if (geminiRawResponse != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode rootNode = mapper.readTree(geminiRawResponse);
                String resultText = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

                // Clean markdown code blocks if returned
                if (resultText.contains("```json")) {
                    resultText = resultText.substring(resultText.indexOf("```json") + 7);
                    resultText = resultText.substring(0, resultText.lastIndexOf("```"));
                } else if (resultText.contains("```")) {
                    resultText = resultText.substring(resultText.indexOf("```") + 3);
                    resultText = resultText.substring(0, resultText.lastIndexOf("```"));
                }
                resultText = resultText.trim();

                Map<String, Object> parsedResult = mapper.readValue(resultText, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});

                int grammar = ((Number) parsedResult.getOrDefault("grammar", 80)).intValue();
                int vocabulary = ((Number) parsedResult.getOrDefault("vocabulary", 80)).intValue();
                int relevance = ((Number) parsedResult.getOrDefault("relevance", 80)).intValue();
                int overall = (grammar + vocabulary + relevance + 85) / 4;

                return ResponseEntity.ok(Map.of(
                        "text", parsedResult.getOrDefault("text", "Interesting argument. Let's build further on this."),
                        "overallScore", overall,
                        "metrics", Map.of(
                                "grammar", grammar,
                                "fluency", 85,
                                "vocabulary", vocabulary,
                                "relevance", relevance
                        ),
                        "strengths", "Maintained structured analysis of key debate constructs.",
                        "weaknesses", "Could benefit from adding comparative historical data.",
                        "corrections", parsedResult.getOrDefault("correction", "No major errors found.")
                ));
            } catch (Exception e) {
                e.printStackTrace(); // Log error and fall back to local rule-based response
            }
        }

        // 2. Fall back to offline rule-based response
        return ResponseEntity.ok(generateFallbackResponse(topic, transcript));
    }

    private String callGemini(String topic, String speechText, String history) {
        if (geminiApiKey == null || geminiApiKey.equals("mock_key") || geminiApiKey.isBlank()) {
            return null;
        }

        try {
            HttpClient client = HttpClient.newHttpClient();

            String systemInstruction = "You are an expert AI Evaluator and Moderator in a practice sandbox for group discussions. "
                    + "The active topic is: \"" + topic + "\". "
                    + "The candidate is talking to you. You must evaluate their last response, answer their questions contextually, and ask a follow-up question to keep the conversation going.\n"
                    + "History of conversation:\n" + history + "\n"
                    + "Candidate's response: \"" + speechText + "\"\n"
                    + "Provide your response ONLY as a JSON object with this exact structure:\n"
                    + "{\n"
                    + "  \"text\": \"Your contextual reply to the candidate (answering their question/points and asking the next question)\",\n"
                    + "  \"grammar\": 85, \n"
                    + "  \"vocabulary\": 80, \n"
                    + "  \"relevance\": 90, \n"
                    + "  \"correction\": \"A brief grammar or phrasing correction (e.g. 'Use X instead of Y' or 'No major errors found')\"\n"
                    + "}\n"
                    + "Do not include any markdown formatting or extra text outside the JSON object.";

            String jsonPayload = "{\"contents\": [{\"parts\": [{\"text\": \""
                    + systemInstruction.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r")
                    + "\"}]}]}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(geminiApiUrl + "?key=" + geminiApiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                return response.body();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Map<String, Object> generateFallbackResponse(String topic, String speechText) {
        String cleanedInput = speechText.trim().toLowerCase();

        int length = cleanedInput.length();
        int grammar = 90;
        String correction = "No major spelling or grammatical errors flagged.";

        boolean hasFillers = cleanedInput.contains("basically") || cleanedInput.contains("actually")
                || cleanedInput.contains("like") || cleanedInput.contains("uh") || cleanedInput.contains("um");
        if (hasFillers) {
            grammar = 78;
            correction = "Grammar focus: Minimize usage of filler phrases ('basically', 'actually', 'like'). Try inserting short pauses instead.";
        }

        int vocabulary = Math.min(95, Math.max(65, 70 + (length / 20)));
        if (cleanedInput.contains("pivotal") || cleanedInput.contains("paradigm") || cleanedInput.contains("fundamental") || cleanedInput.contains("infrastructure")) {
            vocabulary = Math.min(98, vocabulary + 5);
        }

        int relevance = 85;
        String[] keywords = topic.toLowerCase().split("\\s+");
        int matches = 0;
        for (String word : keywords) {
            if (word.length() > 3 && cleanedInput.contains(word)) {
                matches++;
            }
        }
        relevance = Math.min(100, Math.max(70, 75 + (matches * 6)));

        int overall = (grammar + vocabulary + relevance + 85) / 4;

        String replyText;
        if (cleanedInput.contains("?") || cleanedInput.contains("how") || cleanedInput.contains("why") || cleanedInput.contains("what is")) {
            replyText = "That's a very perceptive question regarding the details of '" + topic + "'. "
                    + "From an analytical perspective, addressing this requires structured framework planning. "
                    + "For instance, we must consider the trade-offs between speed of implementation and safety guidelines. "
                    + "To keep our discussion progressing, how do you think we can incentivize institutions to manage these risks?";
        } else {
            String keyPhrase = "your point";
            if (matches > 0) {
                for (String word : keywords) {
                    if (word.length() > 4 && cleanedInput.contains(word)) {
                        keyPhrase = "your focus on '" + word + "'";
                        break;
                    }
                }
            }
            replyText = "Excellent input regarding " + keyPhrase + ". "
                    + "It highlights the necessity of balancing innovation against the socio-economic impacts. "
                    + "Building on this perspective, how should educational hubs and corporate developers prepare for this paradigm shift?";
        }

        return Map.of(
            "text", replyText,
            "overallScore", overall,
            "metrics", Map.of(
                "grammar", grammar,
                "fluency", 85,
                "vocabulary", vocabulary,
                "relevance", relevance
            ),
            "strengths", "Structured arguments using contextual definitions.",
            "weaknesses", hasFillers ? "Occasional usage of filler particles." : "Can improve engagement with statistics.",
            "corrections", correction
        );
    }
}
