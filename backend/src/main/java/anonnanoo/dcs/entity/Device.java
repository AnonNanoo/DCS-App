package anonnanoo.dcs.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public Device(Long id, String ipAddress, String name, DeviceStatus status, LocalDateTime previousCheck) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.name = name;
        this.status = status;
        this.previousCheck = previousCheck;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
