package anonnanoo.dcs.controller;

import anonnanoo.dcs.DTO.DeviceDTO;
import anonnanoo.dcs.entity.Device;
import anonnanoo.dcs.repository.DeviceRepository;
import anonnanoo.dcs.repository.StatusLogRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable UUID id) {
        return deviceRepository.findById(id)
                .map(device -> {
                    deviceRepository.delete(device);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get the Status of a Device by ID  --> /api/devices/{id}/status
    @GetMapping("/{id}/status")
    public ResponseEntity<String> getDeviceStatus(@PathVariable UUID id) {
        return deviceRepository.findById(id)
                .map(device -> ResponseEntity.ok(device.getStatus().name()))
                .orElse(ResponseEntity.notFound().build());
    }





}
