package anonnanoo.dcs.controller;

import anonnanoo.dcs.DTO.DeviceDTO;
import anonnanoo.dcs.DTO.DeviceScanDTO;
import anonnanoo.dcs.entity.Device;
import anonnanoo.dcs.entity.DeviceStatus;
import anonnanoo.dcs.repository.DeviceRepository;
import anonnanoo.dcs.repository.StatusLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final DeviceRepository deviceRepository;
    private final StatusLogRepository statusLogRepository;

    public DeviceController(DeviceRepository deviceRepository, StatusLogRepository statusLogRepository) {
        this.deviceRepository = deviceRepository;
        this.statusLogRepository = statusLogRepository;
    }

    private DeviceDTO toDto(Device device) {
        return new DeviceDTO(device.getIpAddress(), device.getName());
    }

    private Device toEntity(DeviceDTO dto) {
        Device device = new Device();
        device.setIpAddress(dto.getIpAddress());
        device.setName(dto.getName());
        return device;
    }





    // Get all Devices --> /api/devices
    @GetMapping
    public List<Device> getAll() {
        List<Device> devices = deviceRepository.findAll();
        return devices;
    }

    // Create a new Device --> /api/devices
    @PostMapping
    public ResponseEntity<DeviceDTO> createDevice(@RequestBody DeviceDTO deviceDTO) {
        Device device = toEntity(deviceDTO);
        Device savedDevice = deviceRepository.save(device);
        return ResponseEntity.ok(toDto(savedDevice));
    }


    // Get the Device by ID  --> /api/devices/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Device> getById(@PathVariable UUID id) {
        return deviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a Device by ID  --> /api/devices/{id}
    @PutMapping("/{id}")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable UUID id, @RequestBody DeviceDTO deviceDTO) {
        return deviceRepository.findById(id)
                .map(device -> {
                    device.setIpAddress(deviceDTO.getIpAddress());
                    device.setName(deviceDTO.getName());
                    Device updated = deviceRepository.save(device);
                    return ResponseEntity.ok(toDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Delete a Device by ID  --> /api/devices/{id}
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable UUID id) {
        return deviceRepository.findById(id)
                .map(device -> {
                    // Due to relations, we MUST delete the status logs first
                    statusLogRepository.deleteByDeviceId(device.getId());

                    // And then the device itself
                    deviceRepository.delete(device);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Scan a Device (using nmap) by ID  --> /api/devices/scan/{id}
    @GetMapping("/scan/{id}")
    public ResponseEntity<?> scanDevice(@PathVariable UUID id) {
        return deviceRepository.findById(id)
                .map(device -> {
                    String ip = device.getIpAddress();
                    DeviceScanDTO scanResult = new DeviceScanDTO();
                    scanResult.setIpAddress(ip);

                    try {
                        ProcessBuilder builder = new ProcessBuilder("nmap", "-sn", ip);
                        Process process = builder.start();

                        Scanner scanner = new Scanner(process.getInputStream());

                        // Java lessons paid off :)
                        while (scanner.hasNextLine()) {
                            String line = scanner.nextLine();

                            if (line.contains("Host is up")) {
                                scanResult.setStatus(DeviceStatus.ONLINE);

                                int start = line.indexOf('(');
                                int end = line.indexOf('s');
                                if (start != -1 && end != -1 && end > start) {
                                    String latencyStr = line.substring(start + 1, end).trim();
                                    try {
                                        scanResult.setLatency(Double.parseDouble(latencyStr)); // Just the Latency part
                                    } catch (NumberFormatException e) {
                                        scanResult.setLatency(0.0);
                                    }
                                }

                            } else if (line.contains("MAC Address:")) {
                                String[] parts = line.split("MAC Address: ");
                                if (parts.length > 1) {
                                    String[] macParts = parts[1].split(" ");
                                    scanResult.setMacAddress(macParts[0]); // just the MAC address part
                                }
                            } else if (line.startsWith("Nmap scan report for")) {
                                String hostName = line.substring("Nmap scan report for".length()).trim();
                                scanResult.setHostName(hostName); // WILL most likely just be the IP address... Ill leave it in here :)
                            }
                        }

                        scanner.close();

                        // Basically the opposite of the above, if no status was set, then set it to OFFLINE
                        if (scanResult.getStatus() == null) {
                            scanResult.setStatus(DeviceStatus.OFFLINE);
                        }

                        return ResponseEntity.ok(scanResult);

                    } catch (Exception e) {
                        return ResponseEntity.internalServerError().body("Error scanning device: " + e.getMessage());
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }



}
