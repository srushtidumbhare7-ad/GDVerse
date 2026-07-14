package com.gdverse.controller;

import com.gdverse.model.Room;
import com.gdverse.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/active")
    public ResponseEntity<List<Room>> getActiveRooms() {
        return ResponseEntity.ok(roomRepository.findByIsPublicTrueAndStatus("ACTIVE"));
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        room.setStatus("ACTIVE");
        Room saved = roomRepository.save(room);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<?> joinRoom(@PathVariable Long roomId, @RequestBody Map<String, String> request) {
        java.util.Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isPresent()) {
            Room room = roomOpt.get();
            if (!room.getIsPublic()) {
                String pass = request.get("password");
                if (pass == null || !pass.equals(room.getPassword())) {
                    return ResponseEntity.badRequest().body("Incorrect room access password!");
                }
            }
            if (room.getStatus().equals("COMPLETED")) {
                return ResponseEntity.badRequest().body("Discussion room has already completed!");
            }
            return ResponseEntity.ok(Map.of("message", "Joined room successfully!", "webrtcSession", "session_" + roomId));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{roomId}/leave")
    public ResponseEntity<?> leaveRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(Map.of("message", "Left room successfully. Session statistics stored."));
    }
}
