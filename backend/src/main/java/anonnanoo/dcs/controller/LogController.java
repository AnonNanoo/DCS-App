package anonnanoo.dcs.controller;

import anonnanoo.dcs.entity.StatusLog;
import anonnanoo.dcs.repository.StatusLogRepository;
import anonnanoo.dcs.entity.DeviceStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/status_logs")
public class LogController {
    private final StatusLogRepository statusLogRepository;

    @Autowired
    public LogController(StatusLogRepository statusLogRepository) {
        this.statusLogRepository = statusLogRepository;
    }

    // Retrieve all status logs --> /api/status_logs
    @GetMapping
    public List<StatusLog> getAllLogs() {
        return statusLogRepository.findAll();
    }


    // Retrieve logs by device ID --> /api/status_logs/device/{deviceId}
    @GetMapping("/{deviceId}")
    public ResponseEntity<List<StatusLog>> getLogsByDeviceId(@PathVariable UUID deviceId) {
        List<StatusLog> logs = statusLogRepository.findByDeviceId(deviceId);
        if (logs.isEmpty()) {
            return ResponseEntity.ok(logs);
        }
        return ResponseEntity.ok(logs);
    }


    // Retrieve latest log by device ID --> /api/status_logs/latest/{deviceId}
    @GetMapping("/latest/{deviceId}")
    public ResponseEntity<StatusLog> getLatestLogByDeviceId(@PathVariable UUID deviceId) {
        StatusLog latestLog = statusLogRepository.findFirstByDeviceIdOrderByTimestampDesc(deviceId);
        if (latestLog == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(latestLog);
    }


    // Create a new status log --> /api/status_logs
    @PostMapping
    public ResponseEntity<?> createLog(@RequestBody StatusLog log) {
        if (log.getDeviceId() == null) {
            return ResponseEntity.badRequest().body("deviceId is required");
        }
        if (log.getTimestamp() == null) {
            log.setTimestamp(LocalDateTime.now());
        }
        if (log.getMessage() == null || log.getMessage().isBlank()) {
            log.setMessage("-");
        }
        if (log.getIpAddress() == null || log.getIpAddress().isBlank()) {
            return ResponseEntity.badRequest().body("ipAddress is required");
        }
        StatusLog saved = statusLogRepository.save(log);
        return ResponseEntity.ok(saved);
    }


    // Delete an existing log by ID --> /api/status_logs/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLog(@PathVariable UUID id) {
        return statusLogRepository.findById(id)
                .map(log -> {
                    statusLogRepository.delete(log);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
