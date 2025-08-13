package anonnanoo.dcs.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "status_logs")
public class StatusLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column (nullable = false)
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceStatus status;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String message = "-";

    @Column(name = "device_id", nullable = false)
    private UUID deviceId;


    public StatusLog() {}

    public StatusLog(UUID id, String ipAddress, DeviceStatus status, LocalDateTime timestamp, String message, UUID deviceId) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.status = status;
        this.timestamp = timestamp;
        this.message = (message.isBlank() || message == null) ? "-" : message;
        this.deviceId = deviceId;
    }

    @PrePersist
    protected void onCreate() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = (message.isBlank() || message == null) ? "-" : message;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(UUID deviceId) {
        this.deviceId = deviceId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Override
    public String toString() {
        return "StatusLog{" +
                "id=" + id +
                ", ipAddress='" + ipAddress + '\'' +
                ", status=" + status +
                ", timestamp=" + timestamp +
                ", message='" + message + '\'' +
                ", deviceId=" + deviceId +
                '}';
    }

}
