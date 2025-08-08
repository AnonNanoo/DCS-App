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

    // Retrieve a specific log by ID --> /api/status_logs/{id}
    // Note: This is practially useless, it's just for demonstration
    @GetMapping("/{id}")
    public ResponseEntity<StatusLog> getLogById(@PathVariable UUID id) {
        Optional<StatusLog> log = statusLogRepository.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
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
