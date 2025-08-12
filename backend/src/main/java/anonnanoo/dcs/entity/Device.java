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

    @Column
    private LocalDateTime previousCheck;


    public Device() {}

    public Device(UUID id, String ipAddress, String name) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.name = name;
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




    @Override
    public String toString() {
        return "Device{" +
                "id=" + id +
                ", ipAddress='" + ipAddress + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
