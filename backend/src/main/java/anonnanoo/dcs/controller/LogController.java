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
    @GetMapping("/{id}")
    public ResponseEntity<StatusLog> getLogById(@PathVariable UUID id) {
        Optional<StatusLog> log = statusLogRepository.findById(id);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new status log --> /api/status_logs
    @PostMapping
    public ResponseEntity<StatusLog> createLog(@RequestBody StatusLog log) {
        if (log.getTimestamp() == null) {
            log.setTimestamp(LocalDateTime.now());
        }
        if (log.getMessage() == null || log.getMessage().isBlank()) {
            log.setMessage("-");
        }
        StatusLog saved = statusLogRepository.save(log);
        return ResponseEntity.ok(saved);
    }

    // Update an existing log by ID --> /api/status_logs/{id}
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
