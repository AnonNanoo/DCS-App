package anonnanoo.dcs.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String ipAddress;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeviceStatus status = DeviceStatus.OFFLINE;

    @Column
    private LocalDateTime previousCheck;

    public Device() {}

    public Device(UUID id, String ipAddress, String name, DeviceStatus status, LocalDateTime previousCheck) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.name = name;
        this.status = status;
        this.previousCheck = previousCheck;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
        this.status = status;
    }

    public LocalDateTime getPreviousCheck() {
        return previousCheck;
    }

    public void setPreviousCheck(LocalDateTime previousCheck) {
        this.previousCheck = previousCheck;
    }

    @Override
    public String toString() {
        return "Device{" +
                "id=" + id +
                ", ipAddress='" + ipAddress + '\'' +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", previouslyChecked=" + previousCheck +
                '}';
    }
}
